'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const busboyBodyParser = require('busboy-body-parser');

const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;
settings.start = false;

const app = hof(settings);

if (config.useMocks) {
  app.use(mockAPIs);
}

// limits the size of a file that can be uploaded
// sets the file truncated value to true
app.use(busboyBodyParser({ limit: config.upload.maxFileSize }));

module.exports = app;
