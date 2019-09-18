'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const busboyBodyParser = require('busboy-body-parser');
const download = require('./download-file');
const settings = require('./hof.settings');
const path = require('path');

settings.routes = settings.routes.map(route => require(route));
settings.views = path.resolve(__dirname, './apps/common/views');
settings.root = __dirname;
settings.start = false;

const app = hof(settings);

if (config.useMocks) {
  app.use(mockAPIs);
}

// limits the size of a file that can be uploaded
// sets the file truncated value to true
app.use(busboyBodyParser({ limit: config.upload.maxFileSize }));

// Downloads the offline form to client side
app.use('/prompt-sheet-for-working-offline', (req, res) => {
  download.responseFile('/assets/documents', 'nrm-form-offline.pdf', res);
});

app.use((req, res, next) => {
  // Overrides the Gov UK template to add alt tags to images
  res.locals.partials['govuk-template'] = path.resolve(__dirname, './govuk_template');
  // Set HTML Language
  res.locals.htmlLang = 'en';
  next();
});

module.exports = app;
