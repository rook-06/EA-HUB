import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const dir = './temporary screenshots';

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(dir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) n++;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const filepath = path.join(dir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

// Scroll through the page so IntersectionObserver fires for all reveal elements
await page.evaluate(async () => {
  await new Promise(resolve => {
    let y = 0;
    const step = 400;
    const delay = 80;
    const timer = setInterval(() => {
      window.scrollBy(0, step);
      y += step;
      if (y >= document.body.scrollHeight) {
        window.scrollTo(0, 0);
        clearInterval(timer);
        setTimeout(resolve, 400);
      }
    }, delay);
  });
});

await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: filepath, fullPage: true });
await browser.close();

console.log(`Saved: ${filepath}`);
