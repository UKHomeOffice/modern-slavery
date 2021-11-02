/* eslint-disable node/no-deprecated-api */
'use strict';

const { existsSync } = require('fs');
const path = require('path');
const download = exports;

download.responseFile = async (basePath, fileName, res) => {
  const fullFileName = path.join(basePath, fileName);
  const removeLibFromDirectory = __dirname.substring(0, __dirname.lastIndexOf('/'))
  const directory = `${removeLibFromDirectory}${fullFileName}`;

  if (existsSync(directory)) {
    const filename = path.basename(fullFileName);

    await res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    await res.setHeader('Content-Transfer-Encoding', 'binary');
    await res.setHeader('Content-Type', 'application/octet-stream');

    await res.sendFile(directory);
  } else {
    await res.sendStatus(404);
  }
};
