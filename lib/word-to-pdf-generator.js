const fs = require('fs');
const path = require('path');
const { createReport } = require('docx-templates');
const libre = require('libreoffice-convert');
const util = require('util');

// Convert the callback function to a promise
const libreConvert = util.promisify(libre.convert);

class WordToPdfGenerator {
    /**
    * Generates a PDF from a Word template and variables
    * @param {string} templatePath - Path to the Word template file (.docx)
    * @param {object} variables - Object with the variables to replace in the template
    * @param {object} options - Additional options
    * @param {string[]} options.cmdDelimiter - Delimiters for variables (default ['{{', '}}'])
    * @returns {Promise<Buffer>} - Buffer of the generated PDF
    */
    static async generatePdfFromTemplate(templatePath, variables, options = {}) {
        try {
            // Validate that the template exists
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template file not found at path: ${templatePath}`);
            }

            // Read the template
            const templateBuffer = fs.readFileSync(templatePath);

            // Process the Word template with the variables
            const processedDocx = await createReport({
                template: templateBuffer,
                data: variables,
                cmdDelimiter: options.cmdDelimiter || ['{{', '}}'],
                ...options
            });

            // Convert DOCX to PDF
            const pdfBuffer = await libreConvert(processedDocx, '.pdf', undefined);

            return pdfBuffer;
        } catch (error) {
            throw new Error(`Failed to generate PDF: ${error.message}`);
        }
    }

    /**
    * Saves the generated PDF to the file system
    * @param {Buffer} pdfBuffer - PDF buffer
    * @param {string} outputPath - Path to save the PDF to
    */
    static async savePdfToFile(pdfBuffer, outputPath) {
        try {
            // Create directory if it doesn't exist
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Save the file
            fs.writeFileSync(outputPath, pdfBuffer);
            return outputPath;
        } catch (error) {
            throw new Error(`Failed to save PDF: ${error.message}`);
        }
    }
}

module.exports = WordToPdfGenerator;