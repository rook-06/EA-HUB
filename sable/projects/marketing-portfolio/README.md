# Marketing Portfolio Build

**Description:** Build a unique, standout portfolio for Dametime Marketing to attract and close clients.

**Status:** Active — portfolio site built, live-review-ready

**Key dates:** No hard deadline. Treat as high priority given current financial urgency.

## Portfolio site

`site/` — the actual portfolio website, showcasing both websites Damien has built (KMM as the
flagship case study, Above the Norm as a secondary "range" piece). Creative visual treatment: tilted
browser-window mockups with hover glow, a drag-to-compare before/after slider on real KMM job
photos, a scrolling capability marquee, cursor-glow hero, and scroll-reveal animations. Built plain
HTML/CSS/JS, no framework.

- Run locally: `node serve.mjs` (serves at `http://localhost:3010`)
- QA screenshots: `node screenshot.mjs` (requires `npm install` first — puppeteer)
- Not yet deployed to a domain. `hello@dametimemarketing.com` in the closing CTA is a placeholder —
  swap for a real inbox before sending this to anyone.
- KMM is labeled "Spec Build" and Above the Norm is labeled "Practice Build" on the site itself, per
  the honesty notes in the KMM case study below — neither is presented as a closed client contract.
  Above the Norm's site never went live; it's framed as a portfolio practice piece exploring a
  different visual direction, not as the business's actual working site.
- **Brand direction:** black + dark purple (Damien's actual brand colors) as the base, styled as a
  Cyberpunk Edgerunners-inspired aesthetic — hot pink and electric cyan neon accents, sharp angular
  cut-corner panels (no rounded pill shapes), chromatic-aberration glitch text on the hero headline,
  hazard-stripe dividers, and HUD corner brackets. Keep new components in that visual language
  (angular clip-path, not border-radius) rather than drifting back to generic rounded-card style.
- **Physical HUD system (not just color):** a ~3.5s terminal boot sequence plays on every full page
  load (typing text, a fill progress bar, then a shutter-wipe reveal) — skips automatically for
  `prefers-reduced-motion`. A persistent fixed HUD frame sits on top of the whole page: corner
  brackets at the viewport edges, a bottom-left live readout (real clock + live mouse coordinates),
  and a bottom-right circular radar ring that fills with actual scroll progress. Desktop pointers get
  a custom crosshair cursor (lerped trailing ring, expands on hover over links/buttons) in place of
  the system cursor. Section headings decode in with a scramble-text effect, device screenshot
  frames "assemble" with corner brackets and a scanline sweep when revealed, and the KMM stat
  numbers count up rather than appearing static. All of it is vanilla CSS/JS, no libraries.
  If extending this further, keep new interactive elements gated behind the same
  `prefers-reduced-motion` / `hover:hover and pointer:fine` checks already used in the JS.
- **Game-menu-grade interaction layer** (Genshin/Wuthering Waves UI technique, reinterpreted in the
  cyberpunk palette rather than their fantasy gold): ornamental tech-node dividers (`.orn-divider`)
  under every section heading, a rarity-reveal diagonal shimmer sweep across the work-card device
  frames on scroll-in (`.dev-scan`, reused from the old scanline), diamond corner accents on the
  device HUD brackets, a scroll-spy nav bar with a sliding pink-to-cyan underline that tracks the
  active section, a segmented sliding-highlight tab control for the before/after switch
  (`.ba-switch-highlight`), ambient drifting data particles in the hero, and a parallax scroll effect
  on the hero grid floor. `screenshot.mjs` now waits for `#boot` to be removed before scrolling/
  capturing — the boot sequence runs ~3.5s, and earlier QA passes caught it mid-transition before
  this fix.

- **Cybersigilism ward glyph:** a hand-coded inline SVG sigil (`#sigil-ward` — concentric rings, a
  double diamond core, asymmetric radiating spokes with tick marks and dot terminals) reused via
  `<use>` in two places: a large cyan version fading in behind the hero headline once the boot
  sequence clears, and a smaller pink version tucked into the closing CTA that scales/fades in on
  scroll and rotates continuously and very slowly (both ~0.07-0.13 opacity, so it reads as texture,
  not a logo). Ties the site's occult-tech visual language back to Damien's tattoo background rather
  than being decoration for its own sake. The glyph lives once in a hidden `<symbol>` near the top of
  `<body>` — reuse it via `<use href="#sigil-ward">` rather than duplicating the path data if it needs
  to appear elsewhere.

- **Portfolio hologram viewer:** the Work section no longer shows both case studies inline. It's a
  teaser ("Want to see my work?" + a "View Work" button, `#portTeaser`) that boots into a full
  project viewer (`#portViewer`) in place when clicked. Went through two prior mechanics (a full-grid
  pixel cover, then a simultaneous directional wipe) before landing on the current one, which is
  fully sequential and object-level rather than a single overlay across the whole section:
  - **Disassembly (outgoing content, cycling only)** — `disassembleSlide()` collects each visual
    "object" in the leaving slide individually (kicker, heading, each paragraph, each stat card, each
    device screenshot + its chrome bar, the before/after photo, the switch, the caption) and calls
    `disassembleObject()` on each. That function draws the object to an offscreen `<canvas>`, and for
    anything containing a real `<img>` (device screenshots, the before/after photo) it samples the
    **actual rendered pixels** at a ~4px grid (replicating `object-fit:cover`'s crop/anchor manually —
    see the comment in that function about why it can't just read the `<img>`'s own box) so the
    fragments are colored from the real photo, not a decorative palette. Text blocks fall back to
    their own computed text color. Particles scatter/fade via `requestAnimationFrame` with no
    per-particle `save()`/`rotate()` (rotation is imperceptible at 4px anyway) — with ~13 objects
    disassembling in parallel, some images alone produce several thousand particles, so the draw loop
    had to stay cheap. Each particle's delay is driven by its **absolute position within the whole
    stage** (`disassembleSlide()` measures `fragOverlay`'s rect once and passes it into every
    `disassembleObject()` call, rather than each object computing delay relative to its own local
    width) — that's what makes the whole slide read as one continuous wave sweeping left→right on
    "next" and right→left on "prev", instead of every object shattering independently on its own
    internal gradient with no relation to its neighbors. `cycleTo()` `await`s the full `Promise.all()`
    of every object's disassembly before touching the incoming slide, so the previous project is
    completely gone before the next one
    starts building — no overlap.
  - **Boot-up (incoming content, both the first open and every cycle)** — `bootSlide()` reveals content
    top to bottom: each `.case-grid` column does its own clip-path wipe (`.col-open`, mirroring the
    viewer frame's own power-on animation one level down), the heading and each paragraph type in
    character-by-character (`typewriter()`), stat cards fade in and count up, then each device
    screenshot and the before/after photo unroll from the top via a `scaleY` reveal (`.img-boot` /
    `.img-boot-open` — deliberately `transform`, not `clip-path`, so it doesn't fight the angular
    corner-cut `clip-path` already on `.device` / `.ba-toggle`) before arming their HUD brackets. The
    opening ("View Work" click) just runs the frame's hologram power-on animation and then calls
    `bootSlide('kmm')` directly — no pixel effect on open at all, since there's no previous content to
    clear first.
  - `typewriter()` reads its source text from `el.textContent` at call time — `bootSlide()`'s reset
    phase must *not* clear that text itself (it caught fire once already: clearing it early left
    nothing for typewriter to type back in, and the heading/paragraphs just stayed blank). Text targets
    use a `.type-target` opacity class instead, revealed by `typewriter()` itself right before it
    starts, so the full text doesn't flash visible for a frame before being wiped down to nothing.
  - Side arrows become a row above the content on mobile instead of floating at the sides (the
    case-grid stacks to one column there, so a vertically-centered floating arrow would land mid-text
    — see the comment above that media query).
  - The scroll-triggered observers (`scrambleIo`, `deviceIo`, `countIo`) explicitly skip anything
    inside `.port-slide` (the `.closest('.port-slide')` guards) since those elements start hidden and
    are re-triggered manually instead — otherwise both systems would double-fire once the viewer opens.
  - The KMM slide's before/after used to be a drag-to-compare slider; it's now a single-photo toggle
    button (`.ba-toggle` / `#baToggleBtn`, "Show After" / "Show Before") matching the real KMM site's
    own portfolio-gallery pattern, and the mini-gallery (services/reviews thumbnails) was dropped —
    both were cut for vertical compactness after the slide ran too tall to read on one screen.
  - Falls back to an instant, unanimated swap under `prefers-reduced-motion` throughout.

**Note on iterating this design further:** this site went through several rounds of aesthetic
direction with Damien (purple-gradient SaaS look → Cyberpunk Edgerunners neon → this game-UI pass).
Each round replaced the previous one rather than layering indefinitely. Before adding more visual
systems, check whether it's actually load-bearing for the sales pitch or just density for its own
sake — the copy work earlier in this project (tailoring-over-features) still governs what the site
needs to *say*; this section only covers how it *looks*.

## Case studies

- [KMM Property Maintenance website rebuild](case-studies/kmm-property-maintenance.md) —
  full site rebuild solving a named client pain point (Jobber blocked tracking scripts), real
  brand extraction from a business card photo, iterated on real feedback. Not yet a closed paid
  contract — see the case study's open items before using it externally.
  - Presentation-ready formats generated from this write-up (regenerate via
    `tools/case-study-deck-gen/`, see that tool's README before editing):
    `dametime-marketing-case-studies.pptx` (quick-pitch deck), `dametime-marketing-case-studies.pdf`
    (one-page leave-behind), `kmm-property-maintenance-case-study.pdf` (long-form in-depth
    document with the full design/feature breakdown and screenshots)

## Notes

- Portfolio should differentiate Dametime Marketing from generic agencies
- Needs to work as both a credibility builder and a sales tool
