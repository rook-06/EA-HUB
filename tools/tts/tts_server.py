"""
Local Kokoro TTS HTTP server.
Runs on localhost:5050. Accepts POST /speak {voice, text} -> writes MP3, returns {"path": "..."}
"""
import sys
import os
import json
import time
import re
import tempfile
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

HERE = Path(__file__).parent

VOICES = {
    "sable": "bf_emma",   # British female — closest to Sonia
    "atlas": "am_adam",   # American male — closest to Guy
}

# Lazy-load Kokoro on first request
_kokoro = None
def get_kokoro():
    global _kokoro
    if _kokoro is None:
        from kokoro_onnx import Kokoro
        onnx = str(HERE / "kokoro-v1.0.onnx")
        voices = str(HERE / "voices-v1.0.bin")
        _kokoro = Kokoro(onnx, voices)
    return _kokoro

def strip_markdown(text):
    text = re.sub(r'```[\s\S]*?```', '', text)
    text = re.sub(r'`[^`]+`', '', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'^[-*]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\d+\.\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'\n', ' ', text)
    return text.strip()

def split_phrases(text):
    """Split on sentence ends and strong pauses; merge short chunks."""
    import re
    parts = re.split(r'(?<=[.!?])\s+|(?<=[,;:—])\s+(?=\w{4,})', text)
    parts = [p.strip() for p in parts if p.strip()]
    merged = []
    for chunk in parts:
        if merged and len(chunk) < 20:
            merged[-1] += ' ' + chunk
        else:
            merged.append(chunk)
    return merged or [text]

def synthesize(text, voice):
    import soundfile as sf
    import numpy as np

    voice_name = VOICES.get(voice)
    if not voice_name:
        raise ValueError(f"Unknown voice: {voice}")

    clean = strip_markdown(text)
    if not clean:
        raise ValueError("No speakable text")

    phrases = split_phrases(clean)
    kokoro = get_kokoro()

    def gen(text):
        # Clean the phrase — remove any chars that trip up the phonemizer
        t = text.replace('\n', ' ').replace('\r', ' ').strip()
        t = re.sub(r'[—–]', '-', t)  # normalize dashes
        t = re.sub(r'\s+', ' ', t)
        samples, sr = kokoro.create(t, voice=voice_name, speed=1.0, lang="en-us")
        return np.ravel(samples), sr

    # Sequential — Kokoro/phonemizer is not thread-safe
    chunks = []
    sample_rate = None
    for phrase in phrases:
        try:
            samples, sr = gen(phrase)
        except Exception:
            # Fallback: try the whole clean text as one chunk
            try:
                samples, sr = gen(clean)
                chunks = [samples]
                sample_rate = sr
                break
            except Exception:
                continue
        chunks.append(samples)
        if sample_rate is None:
            sample_rate = sr

    if not chunks:
        raise ValueError("TTS synthesis failed for all phrases")

    all_samples = np.concatenate(chunks)

    out_path = HERE / f"_tts_{voice}_{int(time.time()*1000)}.wav"
    sf.write(str(out_path), all_samples, sample_rate)
    return str(out_path).replace("\\", "/")

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # suppress access logs

    def do_POST(self):
        if self.path != "/speak":
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length))

        try:
            path = synthesize(body["text"], body["voice"])
            resp = json.dumps({"path": path}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        except Exception as e:
            err = json.dumps({"error": str(e)}).encode()
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(err)))
            self.end_headers()
            self.wfile.write(err)

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok")
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    port = int(os.environ.get("TTS_PORT", 5050))
    print(f"Kokoro TTS server starting on port {port}...", flush=True)

    # Pre-warm Kokoro so first request isn't slow
    try:
        get_kokoro()
        print("Kokoro loaded.", flush=True)
    except Exception as e:
        print(f"Warning: Kokoro preload failed: {e}", flush=True)

    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"Ready.", flush=True)
    server.serve_forever()
