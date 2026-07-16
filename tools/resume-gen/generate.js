const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const DARK = '#1a1a1a';
const GRAY = '#444444';
const ACCENT = '#1a3a5c';
const LINE_COLOR = '#dddddd';
const PLACEHOLDER = '#b5651d';

const outPath = path.join(__dirname, 'output', 'Resume-Final.pdf');
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
doc.pipe(fs.createWriteStream(outPath));

const PAGE_WIDTH = doc.page.width - 100;
const BULLET_WIDTH = PAGE_WIDTH - 12;

function heading(text, y) {
  doc.fillColor(ACCENT).fontSize(11).font('Helvetica-Bold').text(text, 50, y, { width: PAGE_WIDTH });
  const lineY = y + 15;
  doc.moveTo(50, lineY).lineTo(doc.page.width - 50, lineY).strokeColor(LINE_COLOR).lineWidth(1).stroke();
  return lineY + 9;
}

function bullet(text, y) {
  const isPlaceholder = text.includes('[');
  doc.fillColor(isPlaceholder ? PLACEHOLDER : GRAY)
    .font(isPlaceholder ? 'Helvetica-Oblique' : 'Helvetica')
    .fontSize(9.5);
  const h = doc.heightOfString(text, { width: BULLET_WIDTH });
  doc.text('•', 50, y, { width: 12, continued: false });
  doc.text(text, 62, y, { width: BULLET_WIDTH });
  return y + h + 4;
}

function jobHeader(title, dates, y) {
  doc.fillColor(DARK).fontSize(10).font('Helvetica-Bold').text(title, 50, y, { width: PAGE_WIDTH - 140 });
  doc.fillColor(GRAY).fontSize(9).font('Helvetica-Oblique').text(dates, 50, y, { width: PAGE_WIDTH, align: 'right' });
  return y + 15;
}

// Header
doc.fillColor(DARK).fontSize(22).font('Helvetica-Bold').text('Damien Dalupang', 50, 45);
doc.fillColor(ACCENT).fontSize(10).font('Helvetica-Bold')
  .text('Marketing Graduate — Sales, Client Acquisition & Campaign Development', 50, 71);
doc.fillColor(GRAY).fontSize(9).font('Helvetica')
  .text('Winnipeg, MB  |  204-599-7293  |  damiendalupang@gmail.com', 50, 87);

let y = 115;

// Profile
y = heading('PROFILE', y);
[
  'Bilingual in French and English',
  'Business Administration diploma, Red River College — Marketing major (graduated November 2025)',
  'Client-facing sales background — direct outreach, in-person and by phone'
].forEach((line) => { y = bullet(line, y); });
y += 8;

// Skills
y = heading('CORE SKILLS', y);
[
  'Client acquisition & outreach (cold calling, in-person, public events)',
  'Marketing strategy & content development',
  'Graphic design in Canva (print and digital materials)',
  'Bilingual communication (French/English)',
  'Organized under pressure, deadline-driven'
].forEach((line) => { y = bullet(line, y); });
y += 8;

// Academic Project
y = heading('MARKETING PROJECT', y);
y = jobHeader('Hidden Treasures Studio (Gimli, MB) — Marketing Campaign', 'Red River College capstone', y);
y = bullet('Developed a full marketing campaign for a local retail business as a college capstone project, delivering a ready-to-deploy strategy for the client to implement', y);
y += 6;

// Experience
y = heading('EXPERIENCE', y);

y = jobHeader('KMM Property Maintenance — Sales & Marketing', 'Summer 2025 – Present', y);
y = bullet('Conduct cold-call and door-to-door sales to generate new client leads', y);
y = bullet('Design marketing materials in Canva, including business cards, flyers, brochures, and door hangers', y);
y = bullet('Manage client follow-ups across seasons, property quoting, and invoicing', y);
y += 6;

y = jobHeader('The Canadian Brewhouse — Expeditor', 'June 2023 – Present', y);
y = bullet('Coordinate order accuracy and timing between kitchen and front-of-house during service', y);
y = bullet('Train new hires in expediting procedures — a required step for all non-management positions', y);
y += 6;

y = jobHeader('Sewell Finance Group — Sales Representative', 'Summer 2023', y);
y = bullet('Generated and qualified leads through cold calls and in-person outreach', y);
y = bullet('Represented the company at public/community events', y);
y += 6;

y = jobHeader("Hespler's Tavern — Line Cook", 'March 2022 – January 2023', y);
y = bullet('Prepared and plated food to order in a fast-paced kitchen environment', y);

doc.end();
console.log('Generated:', outPath);
