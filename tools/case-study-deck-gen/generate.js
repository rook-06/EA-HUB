const pptxgen = require('pptxgenjs');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Output lands directly in the case-studies folder, next to the source markdown.
// Not in this tool's own directory, which is easy to lose track of.
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'sable', 'projects', 'marketing-portfolio', 'case-studies');

// One entry per file in sable/projects/marketing-portfolio/case-studies/. Add a new
// entry here when a new case study markdown file is added. Kept hand-written rather
// than parsed from markdown since the deck needs curated slide-length bullets, not
// the full write-up.
const caseStudies = [
  {
    client: 'KMM Property Maintenance',
    subtitle: 'Website Rebuild',
    tags: ['Web Design', 'Marketing Tooling', 'Brand Identity'],
    status: 'Spec build, not yet a closed paid contract',
    problem: [
      'Existing site ran on a locked-down builder that didn’t allow any custom code',
      'That meant the marketing team couldn’t install tracking or analytics tools',
      'No way to measure what marketing spend was actually working',
    ],
    solution: [
      'A full rebuild using simple, standard web code, nothing that requires special software to edit later',
      'One single file now controls tracking and analytics for the entire site',
      'Real brand colors and logo pulled directly from the client’s own business card',
      'Added a before/after project gallery and a customer review system, neither existed before',
    ],
    shipped: [
      '5 pages: home, services, portfolio, reviews, contact',
      'All 3 forms (estimate, contact, reviews) fully working and ready for real submissions',
      'A distinctive seasonal decorative touch that changes with a single setting',
      'Content updated and cleaned up based on real feedback after the first review',
    ],
    whyItWorks: [
      'Solves one specific, provable problem, not a vague “make it look nicer” request',
      'Shows real range beyond a template: an identity built from the client’s own branding',
      'Proves fast, thorough follow-through on feedback, reassuring for a client sizing up the process',
    ],
    // Paths relative to OUTPUT_DIR (sable/projects/marketing-portfolio/case-studies/).
    screenshots: [
      { file: 'screenshots/kmm-home.png', caption: 'Homepage' },
      { file: 'screenshots/kmm-portfolio.png', caption: 'Portfolio: before/after toggle' },
    ],
    slug: 'kmm-property-maintenance',
    // Deep-dive content. Feeds both the deck's breakdown slides and the long-form
    // in-depth PDF document. Each entry: a design/feature area with the reasoning
    // behind it, not just what was built.
    breakdown: [
      {
        title: 'Simple, Standard Web Code: Nothing Exotic',
        body: 'The old site’s builder had no way to add custom code at all. That was the whole problem. The fix was to stop using a locked-down platform and build the site from the same basic building blocks every website is ultimately made of, instead of a more complex system that would need specialized software just to make a change. That choice means anyone on KMM’s team, no coding background required, can open the site’s files, read them like a document, and understand what’s there.',
        points: [
          'No complicated tools or setup required to make changes later',
          'Chosen specifically so a non-technical team can edit it safely',
          'Directly solves the one problem this project exists to fix',
        ],
      },
      {
        title: 'Tracking Setup: The Actual Fix',
        body: 'Every page on the site pulls its tracking and analytics setup from one single file. Right now that file is empty, with plain-English instructions written directly inside it. To add Google Analytics or a Meta (Facebook) ad pixel, someone edits that one file, once, and it takes effect across the entire site immediately. This one decision is the whole rebuild in miniature.',
        points: [
          'One file controls tracking for the whole site, no page-by-page setup',
          'Comes with plain-English instructions already written in',
          'The direct answer to “our old site wouldn’t let us track anything”',
        ],
      },
      {
        title: 'Real Brand Identity, Not a Stock Look',
        body: 'Instead of picking a pre-made color scheme, the logo and colors were pulled directly from a photo of KMM’s own business card. The navy, blue, and gold used throughout the site all trace back to that real, physical item, not a generic template. That’s the difference between a site that could belong to any lawn care company and one that’s unmistakably KMM’s.',
        points: [
          'Logo and colors traced back to the client’s own business card, not a stock look',
          'Documented clearly so it stays consistent if someone else edits it later',
          'The difference between “a site that happens to be for KMM” and “KMM’s site”',
        ],
      },
      {
        title: 'Portfolio and Reviews: Two New Features',
        body: 'Neither of these existed on the original site. The portfolio section lets a visitor click a “before” photo to reveal the “after,” a simple, visual way to show real completed work. The reviews section lets customers submit a review directly on the site, but nothing goes live automatically. Someone at KMM reads it first and approves it before it’s shown publicly, keeping the door open for real testimonials without the risk of a fake one slipping through.',
        points: [
          'Before/after photo gallery: 2 real completed jobs shown so far',
          'Customer reviews go through a simple approval step before they’re posted',
          'Both are brand-new features, neither existed on the old site',
        ],
      },
      {
        title: 'Contact Forms: Already Working, Not Just a Mockup',
        body: 'All 3 forms on the site (the free-estimate request, the contact form, and the review form) are already fully set up to work the moment the site goes live, with no extra setup step needed afterward. Each one also has a simple, invisible safeguard that automatically filters out spam bots before a submission ever reaches an inbox. Because of that, filling out any form on the site already feels complete when testing it, not like a placeholder waiting to be finished later.',
        points: [
          'All 3 forms are ready to receive real submissions the moment the site is live',
          'A hidden spam filter blocks bots automatically, invisible to real visitors',
          'Forms already feel finished when tested, not like a placeholder',
        ],
      },
      {
        title: 'A Distinctive Seasonal Touch, With a Real Design Process Behind It',
        body: 'A small visual detail that sets the site apart: gentle, drifting decorations near the edges of the screen (leaves, snow, flower petals, or dandelion fluff, depending on the season) that never cover the content and never get in the way of clicking anything. It automatically turns off for visitors whose devices are set to reduce on-screen motion, and it’s disabled entirely on phones so it never feels cluttered on a small screen. It’s also a good example of real revision, not a first attempt shipped as final. The winter snow effect was made heavier twice after feedback that it looked too light, an early version of the spring petals looked flat and was rebuilt with real shading and depth, and the summer dandelion fluff was originally drawn from the wrong angle and corrected after comparing it to an actual photo of a real dandelion seed.',
        points: [
          'One single setting switches which season is showing, across the whole site',
          'Automatically turns off on phones and for visitors who prefer less motion',
          'Refined through several real rounds of feedback, not a first draft left as-is',
        ],
      },
      {
        title: 'Content Improvements Based on Real Feedback',
        body: 'After an early review, feedback came back that the site’s “Property Maintenance” service felt redundant next to the other three. It was removed completely, not just from the main list, but from every dropdown menu, every footer, and every page description that mentioned it, so nothing was left half-updated. Gutter cleaning, which had been oddly listed under snow removal, was moved to lawn and garden care where it actually belongs, and the snow removal description was rewritten to specifically mention walkways, driveways, and parking lots. The whole change, from feedback to a fully updated site, happened in one sitting.',
        points: [
          'A redundant service was removed everywhere it appeared, not just the one spot flagged',
          'A misplaced service (gutter cleaning) was moved to where it actually belongs',
          'Feedback to a fully updated, verified site: the same sitting',
        ],
      },
    ],
  },
];

const COLORS = {
  navy: '12172B',
  navyLight: '1B2140',
  gold: 'D4AF37',
  cream: 'F5F1E8',
  body: 'C9CDDC',
};

// ---------- PowerPoint deck ----------

function buildDeck() {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
  pptx.layout = 'WIDE';

  const bgFill = { color: COLORS.navy };
  const bulletOpts = {
    color: COLORS.body,
    fontFace: 'Calibri',
    fontSize: 18,
    bullet: { code: '2022', indent: 20 },
    paraSpaceAfter: 10,
  };

  // Title slide
  const title = pptx.addSlide();
  title.background = bgFill;
  title.addText('DAMETIME MARKETING', {
    x: 0.7, y: 2.4, w: 11.9, h: 0.5,
    color: COLORS.gold, fontFace: 'Calibri', fontSize: 16, charSpacing: 3, bold: true,
  });
  title.addText('Case Studies', {
    x: 0.7, y: 2.9, w: 11.9, h: 1.2,
    color: COLORS.cream, fontFace: 'Georgia', fontSize: 44, bold: true,
  });
  title.addText('Selected work, updated July 2026', {
    x: 0.7, y: 4.1, w: 11.9, h: 0.5,
    color: COLORS.body, fontFace: 'Calibri', fontSize: 16,
  });

  for (const cs of caseStudies) {
    // Section divider slide
    const section = pptx.addSlide();
    section.background = bgFill;
    section.addText(cs.client, {
      x: 0.7, y: 2.6, w: 11.9, h: 1,
      color: COLORS.cream, fontFace: 'Georgia', fontSize: 40, bold: true,
    });
    section.addText(cs.subtitle, {
      x: 0.7, y: 3.5, w: 11.9, h: 0.6,
      color: COLORS.gold, fontFace: 'Calibri', fontSize: 20,
    });
    section.addText(cs.tags.join('   •   '), {
      x: 0.7, y: 4.2, w: 11.9, h: 0.5,
      color: COLORS.body, fontFace: 'Calibri', fontSize: 14,
    });
    section.addText(cs.status, {
      x: 0.7, y: 6.7, w: 11.9, h: 0.4,
      color: '7C8199', fontFace: 'Calibri', fontSize: 12, italic: true,
    });

    const contentSlide = (heading, bullets) => {
      const s = pptx.addSlide();
      s.background = bgFill;
      s.addText(heading, {
        x: 0.7, y: 0.5, w: 11.9, h: 0.8,
        color: COLORS.gold, fontFace: 'Calibri', fontSize: 26, bold: true,
      });
      s.addShape(pptx.ShapeType.line, {
        x: 0.7, y: 1.35, w: 3, h: 0, line: { color: COLORS.gold, width: 2 },
      });
      s.addText(bullets.map((b) => ({ text: b, options: {} })), {
        x: 0.7, y: 1.7, w: 11.9, h: 5,
        ...bulletOpts,
      });
      return s;
    };

    contentSlide('The Problem', cs.problem);
    contentSlide('The Solution', cs.solution);
    contentSlide('What Shipped', cs.shipped);

    if (cs.breakdown && cs.breakdown.length) {
      const dividerSlide = pptx.addSlide();
      dividerSlide.background = bgFill;
      dividerSlide.addText('Design & Feature Breakdown', {
        x: 0.7, y: 3.2, w: 11.9, h: 1,
        color: COLORS.cream, fontFace: 'Georgia', fontSize: 32, bold: true,
      });
      dividerSlide.addText('The design choices behind the build, and why each one was made', {
        x: 0.7, y: 4.1, w: 11.9, h: 0.5,
        color: COLORS.body, fontFace: 'Calibri', fontSize: 16,
      });

      for (const item of cs.breakdown) {
        contentSlide(item.title, item.points);
      }
    }

    if (cs.screenshots && cs.screenshots.length) {
      const resultSlide = pptx.addSlide();
      resultSlide.background = bgFill;
      resultSlide.addText('The Result', {
        x: 0.7, y: 0.5, w: 11.9, h: 0.8,
        color: COLORS.gold, fontFace: 'Calibri', fontSize: 26, bold: true,
      });
      resultSlide.addShape(pptx.ShapeType.line, {
        x: 0.7, y: 1.35, w: 3, h: 0, line: { color: COLORS.gold, width: 2 },
      });

      const gap = 0.3;
      const usableW = 11.93; // 13.33 - 0.7 (left) - 0.7 (right)
      const imgW = (usableW - gap * (cs.screenshots.length - 1)) / cs.screenshots.length;
      const imgH = imgW * (900 / 1440); // matches the 1440x900 viewport screenshots were taken at
      let x = 0.7;
      const imgY = 1.7;
      for (const shot of cs.screenshots) {
        resultSlide.addImage({
          path: path.join(OUTPUT_DIR, shot.file),
          x, y: imgY, w: imgW, h: imgH,
        });
        resultSlide.addText(shot.caption, {
          x, y: imgY + imgH + 0.15, w: imgW, h: 0.4,
          color: COLORS.body, fontFace: 'Calibri', fontSize: 13, align: 'center',
        });
        x += imgW + gap;
      }
    }

    contentSlide('Why This Works', cs.whyItWorks);
  }

  // Closing slide
  const closing = pptx.addSlide();
  closing.background = bgFill;
  closing.addText('Let’s build yours.', {
    x: 0.7, y: 2.8, w: 11.9, h: 1,
    color: COLORS.cream, fontFace: 'Georgia', fontSize: 36, bold: true,
  });
  closing.addText('Damien Dalupang, Dametime Marketing', {
    x: 0.7, y: 3.9, w: 11.9, h: 0.5,
    color: COLORS.gold, fontFace: 'Calibri', fontSize: 18,
  });
  closing.addText('damiendalupang@gmail.com', {
    x: 0.7, y: 4.4, w: 11.9, h: 0.5,
    color: COLORS.body, fontFace: 'Calibri', fontSize: 16,
  });

  const outPath = path.join(OUTPUT_DIR, 'dametime-marketing-case-studies.pptx');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  return pptx.writeFile({ fileName: outPath }).then(() => outPath);
}

// ---------- Long-form in-depth case study document (one per case study) ----------
//
// A real multi-page document, no fixed one-page constraint, that walks through the
// full design/feature breakdown in prose, not just slide-length bullets. Uses
// pdfkit's normal flowing cursor (doc.text without an explicit y) so pages break
// naturally instead of being tracked by hand.

function buildInDepthDoc(cs) {
  const outPath = path.join(OUTPUT_DIR, `${cs.slug}-case-study.pdf`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const doc = new PDFDocument({ margin: 60, size: 'LETTER', bufferPages: true });
  doc.pipe(fs.createWriteStream(outPath));

  const NAVY = '#12172B';
  const GOLD = '#8A6D1D';
  const DARK = '#1a1a1a';
  const GRAY = '#4a4a4a';
  const MUTED = '#8a8a8a';
  const RULE = '#E4E1D8';
  const contentWidth = doc.page.width - 120;

  const heading1 = (text) => {
    doc.moveDown(1);
    doc.fillColor(DARK).fontSize(20).font('Helvetica-Bold').text(text, { width: contentWidth });
    const ruleY = doc.y + 4;
    doc.moveTo(60, ruleY).lineTo(60 + contentWidth, ruleY).strokeColor(RULE).lineWidth(1).stroke();
    doc.y = ruleY + 12;
  };
  const heading2 = (number, text) => {
    doc.moveDown(0.8);
    doc.fillColor(GOLD).fontSize(9).font('Helvetica-Bold').text(number, { width: contentWidth, continued: false });
    doc.fillColor(GOLD).fontSize(13).font('Helvetica-Bold').text(text.toUpperCase(), { width: contentWidth });
    doc.moveDown(0.2);
  };
  const paragraph = (text) => {
    doc.fillColor(GRAY).fontSize(10.5).font('Helvetica').text(text, { width: contentWidth, align: 'justify', lineGap: 3 });
    doc.moveDown(0.5);
  };
  const bulletList = (items) => {
    doc.fillColor(GRAY).fontSize(10).font('Helvetica');
    for (const item of items) {
      doc.text(`•  ${item}`, { width: contentWidth, lineGap: 2 });
    }
    doc.moveDown(0.5);
  };
  const ensureRoom = (neededHeight) => {
    if (doc.y + neededHeight > doc.page.height - 60) doc.addPage();
  };
  const figure = (file, caption, width = 320) => {
    const height = width * (900 / 1440);
    ensureRoom(height + 25);
    doc.image(path.join(OUTPUT_DIR, file), doc.x, doc.y, { width });
    doc.y += height + 4;
    doc.fillColor(MUTED).fontSize(8).font('Helvetica-Oblique').text(caption, { width, align: 'center' });
    doc.moveDown(0.8);
  };

  // Cover block
  doc.rect(0, 0, doc.page.width, 130).fill(NAVY);
  doc.fillColor('#C9AF6B').fontSize(9).font('Helvetica-Bold').text('IN-DEPTH CASE STUDY', 60, 34, { characterSpacing: 1.5 });
  doc.fillColor('#ffffff').fontSize(24).font('Helvetica-Bold').text(cs.client, 60, 50, { width: contentWidth });
  doc.fillColor('#C9AF6B').fontSize(13).font('Helvetica').text(cs.subtitle, 60, 82);
  doc.fillColor('#9AA0BE').fontSize(9).font('Helvetica-Oblique').text(cs.status, 60, 104);
  doc.y = 155;
  doc.x = 60;

  heading1('The Problem');
  paragraph(cs.problem.join('. ') + '.');

  heading1('The Solution');
  paragraph(cs.solution.join('. ') + '.');

  if (cs.screenshots && cs.screenshots[0]) {
    figure(cs.screenshots[0].file, cs.screenshots[0].caption);
  }

  heading1('Design and Feature Breakdown');
  paragraph('The design choices behind the build, and why each one was made. This wasn’t a template with the client’s name swapped in.');

  cs.breakdown.forEach((item, i) => {
    heading2(String(i + 1).padStart(2, '0'), item.title);
    paragraph(item.body);
    bulletList(item.points);

    if (item.title.startsWith('Portfolio') && cs.screenshots && cs.screenshots[1]) {
      figure(cs.screenshots[1].file, cs.screenshots[1].caption);
    }
  });

  heading1('Why This Is a Strong Portfolio Piece');
  bulletList(cs.whyItWorks);

  // Footer on every page: contact info left, page number right. pdfkit checks any
  // .text() call against page.height - margins.bottom and silently appends a blank
  // page if the y given falls below that line, true regardless of explicit
  // coordinates, and true whether that line is "too high" or content has already
  // filled the page right up to the margin. Zeroing the bottom margin disables that
  // check, but each buffered page carries its own independent margins object, so
  // this has to happen per-page inside the loop, after switchToPage(i), not once
  // before it.
  const range = doc.bufferedPageRange();
  const footerY = doc.page.height - 40;
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.page.margins.bottom = 0;
    doc.fillColor(MUTED).fontSize(8).font('Helvetica')
      .text('Damien Dalupang  |  Dametime Marketing  |  damiendalupang@gmail.com', 60, footerY, {
        width: contentWidth * 0.7, align: 'left',
      });
    doc.fillColor(MUTED).fontSize(8).font('Helvetica')
      .text(`Page ${i - range.start + 1} of ${range.count}`, 60, footerY, {
        width: contentWidth, align: 'right',
      });
  }

  doc.end();
  return outPath;
}

Promise.resolve()
  .then(() => buildDeck())
  .then((pptxPath) => console.log('Generated:', pptxPath))
  .then(() => {
    for (const cs of caseStudies) {
      const inDepthPath = buildInDepthDoc(cs);
      console.log('Generated:', inDepthPath);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
