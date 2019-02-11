'use strict';
const wkhtmltopdf = require('wkhtmltopdf');
const config = require('../../../config');
const htmlTemplate = config.pdf.template;
const tempLocation = config.pdf.tempLocation;
const fs = require('fs');
const uuid = require('uuid');

const createTemporaryFileName = () => {
    return (`${uuid.v1()}.pdf`);
};

const generatePDF = (html, destination, tempName) => {
  wkhtmltopdf(fs.createReadStream(html, 'utf8'), {
      output: `${destination}/${tempName}`
    });
};

module.exports = superclass => class extends superclass {
  // attempt to generate a pdf
  saveValues(req, res, next) {
    const tempName = createTemporaryFileName();
    generatePDF(htmlTemplate, tempLocation, tempName);

    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
