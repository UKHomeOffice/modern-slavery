'use strict';
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

module.exports = {
  generate: (html, destination, tempName) => {
    wkhtmltopdf(fs.createReadStream(html, 'utf8'), {
      output: `${destination}/${tempName}`
    });
  }
};
