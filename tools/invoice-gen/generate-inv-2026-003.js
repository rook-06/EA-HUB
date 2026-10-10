const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const invoiceNumber = 'INV-2026-003';
const invoiceDate = 'August 16, 2026';
const dueDate = 'August 31, 2026';

const client = {
  name: 'KMM Property Maintenance',
  phone: '(431) 777-4871',
  email: 'Dylanklassen2005@gmail.com'
};

const role = 'General Labour';
const period = 'August 10 – August 16, 2026';
const hours = 35;
const rate = 20;
const subtotal = hours * rate;
const gst = 0;
const total = subtotal + gst;

const outPath = path.join(__dirname, 'output', `${invoiceNumber}.pdf`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });

const doc = new PDFDocument({ margin: 50, size: 'LETTER' });
doc.pipe(fs.createWriteStream(outPath));

const GRAY = '#555555';
const DARK = '#1a1a1a';
const ACCENT = '#1a3a5c';
const LINE_COLOR = '#dddddd';

doc.rect(0, 0, doc.page.width, 80).fill(ACCENT);

doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
  .text('Damien Dalupang', 50, 25);
doc.fillColor('#aaccee').fontSize(9).font('Helvetica')
  .text(role, 50, 52);

doc.fillColor('#ffffff').fontSize(28).font('Helvetica-Bold')
  .text('INVOICE', 0, 25, { align: 'right', width: doc.page.width - 50 });

doc.moveDown(3);

const metaTop = 100;
doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
  .text('Invoice Number:', 350, metaTop)
  .text('Invoice Date:', 350, metaTop + 16)
  .text('Due Date:', 350, metaTop + 32);

doc.fillColor(GRAY).font('Helvetica')
  .text(invoiceNumber, 450, metaTop)
  .text(invoiceDate, 450, metaTop + 16)
  .text(dueDate, 450, metaTop + 32);

doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('FROM', 50, metaTop);
doc.fillColor(GRAY).font('Helvetica')
  .text('Damien Dalupang', 50, metaTop + 14)
  .text(role, 50, metaTop + 26)
  .text('damiendalupang@gmail.com', 50, metaTop + 38);

doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('BILL TO', 200, metaTop);
doc.fillColor(GRAY).font('Helvetica')
  .text(client.name, 200, metaTop + 14)
  .text(client.phone, 200, metaTop + 26)
  .text(client.email, 200, metaTop + 38);

doc.moveTo(50, 178).lineTo(doc.page.width - 50, 178).strokeColor(LINE_COLOR).lineWidth(1).stroke();

doc.fillColor(DARK).fontSize(10).font('Helvetica-Bold').text('JOB DETAILS', 50, 193);
doc.fillColor(GRAY).fontSize(9).font('Helvetica')
  .text(`Description: ${role}`, 50, 209)
  .text(`Period: ${period}`, 50, 223)
  .text(`Invoice Reference: ${invoiceNumber}`, 50, 237);

const tableTop = 275;
doc.rect(50, tableTop, doc.page.width - 100, 22).fill(ACCENT);
doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold')
  .text('DATE', 60, tableTop + 6)
  .text('DESCRIPTION', 180, tableTop + 6)
  .text('HRS', 360, tableTop + 6, { width: 50, align: 'right' })
  .text('RATE', 420, tableTop + 6, { width: 60, align: 'right' })
  .text('AMOUNT', 490, tableTop + 6, { width: 65, align: 'right' });

let rowY = tableTop + 22;
doc.rect(50, rowY, doc.page.width - 100, 20).fill('#ffffff');
doc.fillColor(GRAY).fontSize(9).font('Helvetica')
  .text('Aug 10–16', 60, rowY + 5)
  .text('General labour', 180, rowY + 5)
  .text(hours.toString(), 360, rowY + 5, { width: 50, align: 'right' })
  .text(`$${rate.toFixed(2)}`, 420, rowY + 5, { width: 60, align: 'right' })
  .text(`$${subtotal.toFixed(2)}`, 490, rowY + 5, { width: 65, align: 'right' });
rowY += 20;

const totalsY = rowY + 15;
doc.moveTo(50, totalsY - 5).lineTo(doc.page.width - 50, totalsY - 5).strokeColor(LINE_COLOR).stroke();

doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold')
  .text('SUBTOTAL', 400, totalsY, { width: 90, align: 'right' });
doc.fillColor(GRAY).font('Helvetica')
  .text(`$${subtotal.toFixed(2)}`, 490, totalsY, { width: 65, align: 'right' });

const totalBoxY = totalsY + 22;
doc.rect(390, totalBoxY, doc.page.width - 440, 28).fill(ACCENT);
doc.fillColor('#ffffff').fontSize(11).font('Helvetica-Bold')
  .text('TOTAL DUE', 400, totalBoxY + 7, { width: 90, align: 'right' })
  .text(`$${total.toFixed(2)}`, 490, totalBoxY + 7, { width: 65, align: 'right' });

doc.fillColor(GRAY).fontSize(8).font('Helvetica')
  .text('Payment accepted via cash or e-transfer.  Please reference invoice number when paying.', 50, totalBoxY + 45);

const footerY = totalBoxY + 80;
doc.rect(50, footerY, doc.page.width - 100, 1).fillColor(LINE_COLOR).fill();
doc.fillColor(GRAY).fontSize(8).font('Helvetica')
  .text('Damien Dalupang  |  damiendalupang@gmail.com  |  Thank you for your business.', 50, footerY + 8, { align: 'center', width: doc.page.width - 100 });

doc.end();
console.log('Generated:', outPath, '| subtotal', subtotal, '| gst', gst, '| total', total);
