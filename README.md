# 📄 Word Template to PDF Generator

Convierte plantillas de Word (.docx) en archivos PDF dinámicos con reemplazo de variables.

## 📦 Instalación

```bash
npm install word-template-to-pdf

🛠️ Requisitos Previos

LibreOffice instalado en el sistema

Node.js v16 o superior

💡 Nota para Linux:
sudo apt-get install libreoffice

🚀 Uso Básico
1. Generar y guardar PDF localmente

const PdfGenerator = require('word-template-to-pdf');
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
    const pdf = await PdfGenerator.generateFromTemplate(template, variables);
    await PdfGenerator.saveToFile(pdf, output);
    console.log('PDF generado con éxito!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

createPdf();


2. Servidor Express para generación bajo demanda

const express = require('express');
const PdfGenerator = require('word-template-to-pdf');
const app = express();

app.post('/generate-pdf', async (req, res) => {
  try {
    const pdf = await PdfGenerator.generateFromTemplate(
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


🔧 Configuración Avanzada

Personalizar delimitadores

const options = {
  cmdDelimiter: ['[[', ']]'],  // Usar [[variable]] en lugar de {{variable}}
  processLineBreaks: true
};

const pdf = await PdfGenerator.generateFromTemplate(
  'template.docx',
  { name: "Ejemplo" },
  options
);
```

📝 Sintaxis de Plantillas

| Tipo | Ejemplo en Word | Variables JavaScript |
|---|---|---|
| Texto simple | Hola {{nombre}} | { nombre: "Ana" } |
| Listas | {{#each items}}• {{this}}{{/each}} | { items: ["uno", "dos"] } |
| Condicionales | {{#if activo}}Activo{{/if}} | { activo: true } |

```
🚨 Manejo de Errores
Código recomendado:

try {
  // ... generación de PDF
} catch (err) {
  if (err.name === 'TemplateError') {
    console.error('Error en plantilla:', err.details);
  } else {
    console.error('Error inesperado:', err);
  }
}

📂 Estructura de Directorios Recomendada
text
my-project/
├── templates/
│   ├── contract.docx
│   └── invoice.docx
├── output/
├── node_modules/
└── app.js

⚠️ Limitaciones
Tamaño máximo: 10MB por plantilla

Formato: Solo .docx (no .doc)

Entornos: No compatible con AWS Lambda sin configuración adicional

🔄 Flujo de Trabajo Típico
Diseñar plantilla en Word con {{variables}}

Definir datos en código JavaScript

Generar PDF en memoria o archivo

Distribuir via API, email o almacenamiento

```