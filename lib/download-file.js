/* eslint-disable node/no-deprecated-api */
'use strict';

const fs = require('fs');
const path = require('path');
const download = exports;

download.responseFile = async (basePath, fileName, res) => {
  const fullFileName = path.join(basePath, fileName);
  const directory = `${__dirname}${fullFileName}`;

  await fs.exists(directory, async exist => {
    if (exist) {
      const filename = path.basename(fullFileName);

      await res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
      await res.setHeader('Content-Transfer-Encoding', 'binary');
      await res.setHeader('Content-Type', 'application/octet-stream');

      await res.sendFile(directory);
    } else {
      await res.sendStatus(404);
    }
  });
};
