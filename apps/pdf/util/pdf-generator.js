'use strict';
/* eslint-disable no-console */
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

module.exports = {
  generate: (html, destination, tempName) => {
    return new Promise((resolve, reject) => {
      const file = `${destination}/${tempName}`;
      // first read the template
      wkhtmltopdf(fs.createReadStream(html), (err, stream) => {
        if (err) {
          console.log(`Pdf generation: Failed, something went wrong
            reading the template ${html}, further details here -> ${err}`);
          reject(err);
        } else {
          // on finish ensures that fs is finished writing the file
          stream.pipe(fs.createWriteStream(file)).on('finish', resolve.bind(null, file));
          // alternative way of writing this
          // stream.pipe(fs.createWriteStream(file)).on('finish', () => resolve(file));
          console.log('pdf generated at', file);
        }
      });
    });
  }
};
