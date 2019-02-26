/* eslint-disable no-console */
'use strict';

const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

module.exports = {
  generate: (html, destination, tempName) => {
    return new Promise((resolve, reject) => {
      console.log('>>>>>>>>>>>>> yoooo in generator')
      const file = `${destination}/${tempName}`;
      // first read the template
      wkhtmltopdf(fs.createReadStream(html), (err, stream) => {
        if (err) {
          console.log(`Pdf generation: Failed, something went wrong
            reading the template ${html}, further details here -> ${err}`);
          reject(err);
        } else {
          // on finish ensures that fs is finished writing the file
          stream.pipe(fs.createWriteStream(file)).on('finish',
            () => resolve(file));
          console.log('pdf generated at', file);
        }
      });
    });
  }
};
