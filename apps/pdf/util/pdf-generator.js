'use strict';
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

module.exports = {
  generate: (html, destination, tempName) => {
    // eslint-disable-next-line no-console
    console.log('attempting to generate pdf');
    wkhtmltopdf(fs.createReadStream(html, 'utf8'), {
      output: `${destination}/${tempName}`
    });
  }
};
