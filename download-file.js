'use strict';

let fs = require('fs');
let path = require('path');
const download = exports;

download.responseFile = async(basePath, fileName, res) => {
    let fullFileName = path.join(basePath, fileName);
    let directory = `${__dirname}${fullFileName}`;

    await fs.exists(directory, async(exist) => {
        if (exist) {
            var filename = path.basename(fullFileName);

            await res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
            await res.setHeader('Content-Transfer-Encoding', 'binary');
            await res.setHeader('Content-Type', 'application/octet-stream');

            await res.sendFile(directory);
        } else {
            await res.sendStatus(404);
        }
    });
};
