# 📄 Word Template to PDF Generator

Convert Word templates (.docx) to dynamic PDF files with variable replacement.

## 📦 Facility

```bash
npm install word-to-pdf-generator
```
## 🛠️ Prerequisites

LibreOffice installed on the system and in Windows operating system configure its environment variables

Node.js v16 o superior

## 💡 Note for Linux:
```bash
sudo apt-get install libreoffice
```
## 🚀 Basic Use
1. Generate and save PDF locally
```bash
const PdfGenerator = require('word-to-pdf-generator');
const path = require('path');

async function createPdf() {
  const template = path.resolve('templates/contract.docx');
  const output = path.resolve('output/contract.pdf');

  const variables = {
    clientName: "Juan Pérez",
    date: new Date().toLocaleDateString(),
    amount: "$1,500.00"
  };

  try {
    const pdf = await PdfGenerator.generatePdfFromTemplate(template, variables);
    await PdfGenerator.savePdfToFile(pdf, output);
    console.log('PDF generated successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createPdf();
```

2. Express Server for on-demand generation
```bash
const express = require('express');
const PdfGenerator = require('word-to-pdf-generator');
const app = express();

app.post('/generate-pdf', async (req, res) => {
  try {
    const pdf = await PdfGenerator.generatePdfFromTemplate(
      './templates/report.docx',
      req.body.variables
    );
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=document.pdf'
    });
    
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
```

## 🔧 Advanced Settings

Customize Delimiters
```bash
const options = {
  cmdDelimiter: ['[[', ']]'],  //Use [[variable]] instead of {{variable}}
  processLineBreaks: true
};

const pdf = await PdfGenerator.generatePdfFromTemplate(
  'template.docx',
  { name: "Example" },
  options
);
```

## 📝 Template Syntax

| Type | Example in Word | JavaScript Variables |
|---|---|---|
| Plain text | Hello {{name}} | {name: "Ana"} 

## 🚨 Error Handling
Recommended code:
```bash
try {
  // ... PDF generation
} catch (err) {
  if (err.name === 'TemplateError') {
    console.error('Template error:', err.details);
  } else {
    console.error('Unexpected error:', err);
  }
}
```
## 📂 Recommended Directory Structure

my-project/
├── templates/
│   ├── contract.docx
│   └── invoice.docx
├── output/
├── node_modules/
└── app.js

## ⚠️ Limitations
Maximum size: 10MB per template

Format: .docx only (no .doc)

## 🔄 Typical Workflow
Design a template in Word with {{variables}}

Define data in JavaScript code

Generate a PDF in memory or on a file

Distribute via API, email, or storage