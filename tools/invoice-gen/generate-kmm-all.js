const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const client = {
  name: 'KMM Property Maintenance',
  phone: '(431) 777-4871',
  email: 'Dylanklassen2005@gmail.com'
};

const invoices = [
  {
    invoiceNumber: 'KMM-2026-001',
    invoiceDate: 'August 16, 2026',
    dueDate: 'August 31, 2026',
    client,
    description: 'General Labour',
    period: 'August 10 – August 16, 2026',
    lines: [
      { date: 'Aug 10', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 11', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 12', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 13', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 14', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 15', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 16', description: 'General labour', hours: 5, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-002',
    invoiceDate: 'August 26, 2026',
    dueDate: 'September 10, 2026',
    client,
    description: 'General Labour',
    period: 'August 17 – August 23, 2026',
    lines: [
      { date: 'Aug 17', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 18', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 19', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 20', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 21', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 22', description: 'General labour', hours: 5, rate: 20 },
      { date: 'Aug 23', description: 'General labour', hours: 6, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-003',
    invoiceDate: 'August 30, 2026',
    dueDate: 'September 14, 2026',
    client,
    description: 'General Labour',
    period: 'August 24 – August 30, 2026',
    lines: [
      { date: 'Aug 24', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Aug 25', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Aug 26', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Aug 28', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Aug 29', description: 'General labour', hours: 7, rate: 20 },
      { date: 'Aug 30', description: 'General labour', hours: 7, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-004',
    invoiceDate: 'September 6, 2026',
    dueDate: 'September 21, 2026',
    client,
    description: 'General Labour',
    period: 'August 31 – September 6, 2026',
    lines: [
      { date: 'Aug 31', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Sept 1', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Sept 2', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Sept 3', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Sept 4', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Sept 5', description: 'General labour', hours: 3, rate: 20 },
      { date: 'Sept 6', description: 'General labour', hours: 3, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-005',
    invoiceDate: 'September 13, 2026',
    dueDate: 'September 28, 2026',
    client,
    description: 'General Labour',
    period: 'September 7 – September 13, 2026',
    lines: [
      { date: 'Sept 8', description: 'General labour', hours: 7, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-006',
    invoiceDate: 'September 20, 2026',
    dueDate: 'October 5, 2026',
    client,
    description: 'General Labour',
    period: 'September 14 – September 20, 2026',
    lines: [
      { date: 'Sept 18', description: 'General labour', hours: 6, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-007',
    invoiceDate: 'September 27, 2026',
    dueDate: 'October 12, 2026',
    client,
    description: 'General Labour',
    period: 'September 21 – September 27, 2026',
    lines: [
      { date: 'Sept 21', description: 'General labour', hours: 11, rate: 20 },
      { date: 'Sept 22', description: 'General labour', hours: 6, rate: 20 },
      { date: 'Sept 23', description: 'General labour', hours: 6, rate: 20 },
      { date: 'Sept 25', description: 'General labour', hours: 9, rate: 20 },
      { date: 'Sept 26', description: 'General labour', hours: 7, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-008',
    invoiceDate: 'October 4, 2026',
    dueDate: 'October 19, 2026',
    client,
    description: 'General Labour',
    period: 'September 28 – October 4, 2026',
    lines: [
      { date: 'Sept 28', description: 'General labour', hours: 7, rate: 20 },
      { date: 'Sept 30', description: 'General labour', hours: 8, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-009',
    invoiceDate: 'October 11, 2026',
    dueDate: 'October 26, 2026',
    client,
    description: 'General Labour + Half-Rate Hours',
    period: 'October 5 – October 11, 2026',
    lines: [
      { date: 'Oct 5', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Oct 6', description: 'General labour', hours: 7, rate: 20 },
      { date: 'Oct 7', description: 'General labour', hours: 6, rate: 20 },
      { date: 'Oct 7', description: 'Half-rate hours', hours: 3, rate: 10 },
      { date: 'Oct 8', description: 'General labour', hours: 8, rate: 20 },
      { date: 'Oct 9', description: 'General labour', hours: 6, rate: 20 },
      { date: 'Oct 10', description: 'General labour', hours: 8, rate: 20 }
    ]
  },
  {
    invoiceNumber: 'KMM-2026-010',
    invoiceDate: 'October 18, 2026',
    dueDate: 'November 2, 2026',
    client,
    description: 'General Labour + Half-Rate Hours',
    period: 'October 12 – October 18, 2026',
    lines: [
      { date: 'Oct 12', description: 'General labour', hours: 4, rate: 20 },
      { date: 'Oct 13', description: 'General labour', hours: 7.5, rate: 20 },
      { date: 'Oct 15', description: 'General labour', hours: 9, rate: 20 },
      { date: 'Oct 16', description: 'General labour', hours: 9, rate: 20 },
      { date: 'Oct 18', description: 'General labour', hours: 3, rate: 20 },
      { date: 'Oct 18', description: 'Half-rate hours', hours: 6, rate: 10 }
    ]
  },
  {
    invoiceNumber: 'INV-2026-002',
    invoiceDate: 'August 15, 2026',
    dueDate: 'August 30, 2026',
    client,
    description: 'Website Maintenance (Dametime Marketing)',
    period: 'July 1 – July 31, 2026',
    flatFee: 175.0,
    flatLabel: 'Website maintenance — flat fee'
  }
];

const GRAY = '#555555';
const DARK = '#1a1a1a';
const ACCENT = '#1a3a5c';
const LINE_COLOR = '#dddddd';

for (const inv of invoices) {
  const isFlat = !!inv.flatFee;
  const lines = isFlat ? [{ date: '', description: inv.flatLabel, hours: null, rate: null, amount: inv.flatFee }] : inv.lines;
  const lineAmounts = isFlat ? [inv.flatFee] : inv.lines.map(l => l.hours * l.rate);
  const subtotal = lineAmounts.reduce((s, a) => s + a, 0);
  const totalHours = isFlat ? null : inv.lines.reduce((s, l) => s + l.hours, 0);
  const total = subtotal;

  const outPath = path.join(__dirname, 'output', `${inv.invoiceNumber}.pdf`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
  doc.pipe(fs.createWriteStream(outPath));

  doc.rect(0, 0, doc.page.width, 80).fill(ACCENT);
  doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('Damien Dalupang', 50, 25);
  doc.fillColor('#aaccee').fontSize(9).font('Helvetica').text(inv.description, 50, 52);
  doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold')
    .text('INVOICE', 0, 25, { align: 'right', width: doc.page.width - 50 });

  const metaTop = 100;
  doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
    .text('Invoice Number:', 350, metaTop)
    .text('Invoice Date:', 350, metaTop + 16)
    .text('Due Date:', 350, metaTop + 32);
  doc.fillColor(GRAY).font('Helvetica')
    .text(inv.invoiceNumber, 450, metaTop)
    .text(inv.invoiceDate, 450, metaTop + 16)
    .text(inv.dueDate, 450, metaTop + 32);

  doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('FROM', 50, metaTop);
  doc.fillColor(GRAY).font('Helvetica')
    .text('Damien Dalupang', 50, metaTop + 14)
    .text(inv.description, 50, metaTop + 26)
    .text('damiendalupang@gmail.com', 50, metaTop + 38);

  doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('BILL TO', 200, metaTop);
  doc.fillColor(GRAY).font('Helvetica')
    .text(inv.client.name, 200, metaTop + 14)
    .text(inv.client.phone, 200, metaTop + 26)
    .text(inv.client.email, 200, metaTop + 38);

  doc.moveTo(50, 178).lineTo(doc.page.width - 50, 178).strokeColor(LINE_COLOR).lineWidth(1).stroke();

  doc.fillColor(DARK).fontSize(10).font('Helvetica-Bold').text('JOB DETAILS', 50, 193);
  doc.fillColor(GRAY).fontSize(9).font('Helvetica')
    .text(`Description: ${inv.description}`, 50, 209)
    .text(`Period: ${inv.period}`, 50, 223)
    .text(`Invoice Reference: ${inv.invoiceNumber}`, 50, 237);

  const tableTop = 265;
  doc.rect(50, tableTop, doc.page.width - 100, 22).fill(ACCENT);
  doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold')
    .text('DATE', 60, tableTop + 6)
    .text('DESCRIPTION', 150, tableTop + 6)
    .text('HRS', 360, tableTop + 6, { width: 50, align: 'right' })
    .text('RATE', 420, tableTop + 6, { width: 60, align: 'right' })
    .text('AMOUNT', 490, tableTop + 6, { width: 65, align: 'right' });

  let rowY = tableTop + 22;
  lines.forEach((l, i) => {
    const amount = isFlat ? l.amount : l.hours * l.rate;
    if (i % 2 === 0) doc.rect(50, rowY, doc.page.width - 100, 20).fill('#f7f7f7');
    doc.fillColor(GRAY).fontSize(9).font('Helvetica')
      .text(l.date, 60, rowY + 5)
      .text(l.description, 150, rowY + 5)
      .text(l.hours !== null ? l.hours.toString() : '—', 360, rowY + 5, { width: 50, align: 'right' })
      .text(l.rate !== null ? `$${l.rate.toFixed(2)}` : 'flat', 420, rowY + 5, { width: 60, align: 'right' })
      .text(`$${amount.toFixed(2)}`, 490, rowY + 5, { width: 65, align: 'right' });
    rowY += 20;
  });

  const totalsY = rowY + 15;
  doc.moveTo(50, totalsY - 5).lineTo(doc.page.width - 50, totalsY - 5).strokeColor(LINE_COLOR).stroke();

  let afterTotalsY = totalsY;
  if (!isFlat) {
    doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
      .text('TOTAL HOURS', 400, totalsY, { width: 90, align: 'right' });
    doc.fillColor(GRAY).font('Helvetica')
      .text(totalHours.toString(), 490, totalsY, { width: 65, align: 'right' });
    afterTotalsY = totalsY + 16;
  }

  doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
    .text('SUBTOTAL', 400, afterTotalsY, { width: 90, align: 'right' });
  doc.fillColor(GRAY).font('Helvetica')
    .text(`$${subtotal.toFixed(2)}`, 490, afterTotalsY, { width: 65, align: 'right' });

  const totalBoxY = afterTotalsY + 22;
  doc.rect(390, totalBoxY, doc.page.width - 440, 28).fill(ACCENT);
  doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold')
    .text('TOTAL DUE', 400, totalBoxY + 7, { width: 90, align: 'right' })
    .text(`$${total.toFixed(2)}`, 490, totalBoxY + 7, { width: 65, align: 'right' });

  doc.fillColor(GRAY).fontSize(8).font('Helvetica')
    .text('No GST charged. Payment accepted via cash or e-transfer. Please reference invoice number when paying.', 50, totalBoxY + 45);

  const footerY = totalBoxY + 80;
  doc.rect(50, footerY, doc.page.width - 100, 1).fillColor(LINE_COLOR).fill();
  doc.fillColor(GRAY).fontSize(8).font('Helvetica')
    .text('Damien Dalupang  |  damiendalupang@gmail.com  |  Thank you for your business.', 50, footerY + 8, { align: 'center', width: doc.page.width - 100 });

  doc.end();
  console.log('Generated:', outPath);
}
