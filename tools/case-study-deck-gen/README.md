# Case Study Deck Generator

Generates a PowerPoint deck and a one-page PDF leave-behind from Dametime Marketing's
case studies (`sable/projects/marketing-portfolio/case-studies/`).

## Usage

```
npm install   # first time only
node generate.js
```

Outputs directly to `sable/projects/marketing-portfolio/case-studies/dametime-marketing-case-studies.pptx`
and `.pdf`, next to the source markdown — not into a folder inside this tool.

## Adding a new case study

The `caseStudies` array at the top of `generate.js` is hand-written, not parsed from
markdown — the deck needs curated slide-length bullets, not the full write-up. When a
new case study file is added to `sable/projects/marketing-portfolio/case-studies/`,
add a matching entry to that array (same shape: `client`, `subtitle`, `tags`, `status`,
`problem`, `solution`, `shipped`, `whyItWorks`, `screenshots`, `slug`, `breakdown`) and
re-run `node generate.js` — every case study in the array gets its own section in all
three outputs automatically.

`screenshots` is an array of `{ file, caption }`, paths relative to the case-studies
folder (e.g. `screenshots/kmm-home.png`). Take them at a 1440x900 viewport (not full
page) so the aspect ratio matches what the layout math assumes — see how the KMM
screenshots were captured via `node screenshot.mjs`-style puppeteer calls in the
website's own project folder. The PPTX gets a full "The Result" slide with every
screenshot side by side; the quick PDF only embeds the first one as a compact
thumbnail since it's meant to stay one page.

`breakdown` is an array of `{ title, body, points }` — one entry per design decision
or feature worth explaining, not just what shipped but why. It drives three things:
a "Design & Feature Breakdown" section of slides in the PPTX (one per entry, bulleted
from `points`), and the full prose (`body`) in the long-form in-depth PDF
(`{slug}-case-study.pdf`, one per case study, unlike the other two outputs which stay
single combined files across all case studies).

## Outputs

- `dametime-marketing-case-studies.pptx` — quick-pitch deck, all case studies
- `dametime-marketing-case-studies.pdf` — one-page leave-behind, all case studies
- `{slug}-case-study.pdf` — long-form in-depth document, one per case study, full
  design/feature breakdown in prose with embedded screenshots

## A pdfkit footer gotcha worth knowing before touching this again

pdfkit auto-appends a blank page if a `.text()` call's y falls below
`page.height - margins.bottom` — true even with explicit x/y coordinates, and true in
both directions: y placed too close to the bottom edge (the one-pager bug) or dense
content that already fills the page right up to the margin (the in-depth doc bug).
Zeroing `margins.bottom` before drawing disables the check, but each buffered page
carries its *own* independent margins object — after `doc.switchToPage(i)`, you must
zero that page's margins again, not just once before the loop. See `buildInDepthDoc`'s
footer loop for the working pattern.
