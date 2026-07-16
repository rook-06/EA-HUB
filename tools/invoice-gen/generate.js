const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const job = {
  id: 'JOB-2026-002',
  business: 'Independent',
  client: {
    name: 'George Howell',
    address: '79 Geoffrey Bay, Arnes, MB'
  },
  description: 'Cottage renovation',
  location: 'Gimli, MB',
  start_date: 'June 16, 2026',
  end_date: 'June 19, 2026',
  hourly_rate: 25,
  daily_hours: [
    { date: 'June 16, 2026', hours: 8 },
    { date: 'June 17, 2026', hours: 8.5 },
    { date: 'June 18, 2026', hours: 8.5 },
    { date: 'June 19, 2026', hours: 8 }
  ]
};

const totalHours = job.daily_hours.reduce((s, d) => s + d.hours, 0);
const subtotal = totalHours * job.hourly_rate;
const gst = subtotal * 0.05;
const total = subtotal + gst;

const invoiceNumber = 'INV-2026-001';
const invoiceDate = 'June 20, 2026';
const dueDate = 'July 5, 2026';

const outPath = path.join(__dirname, 'output', `${invoiceNumber}.pdf`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
doc.pipe(fs.createWriteStream(outPath));

const GRAY = '#555555';
const DARK = '#1a1a1a';
const ACCENT = '#1a3a5c';
const LIGHT_GRAY = '#f5f5f5';
const LINE_COLOR = '#dddddd';

// Header bar
doc.rect(0, 0, doc.page.width, 80).fill(ACCENT);

// Name
doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
  .text('Damien Dalupang', 50, 25);
doc.fillColor('#aaccee').fontSize(9).font('Helvetica')
  .text('Independent Contractor', 50, 52);

// INVOICE label
doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold')
  .text('INVOICE', 0, 25, { align: 'right', width: doc.page.width - 50 });

doc.moveDown(3);

// Invoice meta block (right side)
const metaTop = 100;
doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
  .text('Invoice Number:', 350, metaTop)
  .text('Invoice Date:', 350, metaTop + 16)
  .text('Due Date:', 350, metaTop + 32);

doc.fillColor(GRAY).font('Helvetica')
  .text(invoiceNumber, 450, metaTop)
  .text(invoiceDate, 450, metaTop + 16)
  .text(dueDate, 450, metaTop + 32);

// From block
doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('FROM', 50, metaTop);
doc.fillColor(GRAY).font('Helvetica')
  .text('Damien Dalupang', 50, metaTop + 14)
  .text('Independent Contractor', 50, metaTop + 26)
  .text('damiendalupang@gmail.com', 50, metaTop + 38);

// Bill To block
doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('BILL TO', 200, metaTop);
doc.fillColor(GRAY).font('Helvetica')
  .text(job.client.name, 200, metaTop + 14)
  .text(job.client.address, 200, metaTop + 26);

// Divider
doc.moveTo(50, 178).lineTo(doc.page.width - 50, 178).strokeColor(LINE_COLOR).lineWidth(1).stroke();

// Job summary
doc.fillColor(DARK).fontSize(10).font('Helvetica-Bold').text('JOB DETAILS', 50, 193);
doc.fillColor(GRAY).fontSize(9).font('Helvetica')
  .text(`Description: ${job.description}`, 50, 209)
  .text(`Location: ${job.location}`, 50, 223)
  .text(`Period: ${job.start_date} – ${job.end_date}`, 50, 237)
  .text(`Job Reference: ${job.id}`, 50, 251);

// Table header
const tableTop = 280;
doc.rect(50, tableTop, doc.page.width - 100, 22).fill(ACCENT);
doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold')
  .text('DATE', 60, tableTop + 6)
  .text('DESCRIPTION', 180, tableTop + 6)
  .text('HRS', 360, tableTop + 6, { width: 50, align: 'right' })
  .text('RATE', 420, tableTop + 6, { width: 60, align: 'right' })
  .text('AMOUNT', 490, tableTop + 6, { width: 65, align: 'right' });

// Table rows — single consolidated line
let rowY = tableTop + 22;
doc.rect(50, rowY, doc.page.width - 100, 20).fill('#ffffff');
doc.fillColor(GRAY).fontSize(9).font('Helvetica')
  .text('—', 60, rowY + 5)
  .text('Labour hours from June 16–19', 180, rowY + 5)
  .text(totalHours.toString(), 360, rowY + 5, { width: 50, align: 'right' })
  .text(`$${job.hourly_rate.toFixed(2)}`, 420, rowY + 5, { width: 60, align: 'right' })
  .text(`$${subtotal.toFixed(2)}`, 490, rowY + 5, { width: 65, align: 'right' });
rowY += 20;

// Totals
const totalsY = rowY + 15;
doc.moveTo(50, totalsY - 5).lineTo(doc.page.width - 50, totalsY - 5).strokeColor(LINE_COLOR).stroke();

doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
  .text('SUBTOTAL', 400, totalsY, { width: 90, align: 'right' });
doc.fillColor(GRAY).font('Helvetica')
  .text(`$${subtotal.toFixed(2)}`, 490, totalsY, { width: 65, align: 'right' });

doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
  .text('GST (5%)', 400, totalsY + 16, { width: 90, align: 'right' });
doc.fillColor(GRAY).font('Helvetica')
  .text(`$${gst.toFixed(2)}`, 490, totalsY + 16, { width: 65, align: 'right' });

// Total box
const totalBoxY = totalsY + 38;
doc.rect(390, totalBoxY, doc.page.width - 440, 28).fill(ACCENT);
doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold')
  .text('TOTAL DUE', 400, totalBoxY + 7, { width: 90, align: 'right' })
  .text(`$${total.toFixed(2)}`, 490, totalBoxY + 7, { width: 65, align: 'right' });

// Payment note
doc.fillColor(GRAY).fontSize(8).font('Helvetica')
  .text('Payment accepted via e-transfer or cash.  Please reference invoice number when paying.', 50, totalBoxY + 45);

// Footer
const footerY = totalBoxY + 80;
doc.rect(50, footerY, doc.page.width - 100, 1).fillColor(LINE_COLOR).fill();
doc.fillColor(GRAY).fontSize(8).font('Helvetica')
  .text('Damien Dalupang  |  damiendalupang@gmail.com  |  Thank you for your business.', 50, footerY + 8, { align: 'center', width: doc.page.width - 100 });

doc.end();
console.log('Generated:', outPath);
