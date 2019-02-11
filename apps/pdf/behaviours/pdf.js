'use strict';
const config = require('../../../config');
const htmlTemplate = config.pdf.template;
const tempLocation = config.pdf.tempLocation;
const uuid = require('uuid');
const PDFgenerator = require('../util/pdf-generator');

const createTemporaryFileName = () => {
  return (`${uuid.v1()}.pdf`);
};

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    const tempName = createTemporaryFileName();
    PDFgenerator.generate(htmlTemplate, tempLocation, tempName);

    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
