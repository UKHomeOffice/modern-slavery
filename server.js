'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const busboyBodyParser = require('busboy-body-parser');
const download = require('./download-file');
const settings = require('./hof.settings');
const path = require('path');

const sessionCookiesTable = require('./apps/common/translations/src/en/cookies.json');

settings.routes = settings.routes.map(route => require(route));
settings.views = path.resolve(__dirname, './apps/common/views');
settings.root = __dirname;

const app = hof(settings);

if (config.useMocks) {
  app.use(mockAPIs);
}

// limits the size of a file that can be uploaded
// sets the file truncated value to true
app.use(busboyBodyParser({ limit: config.upload.maxFileSize }));

// Downloads the offline form to client side
app.use('/prompt-sheet-for-working-offline', (req, res) => {
  download.responseFile('/assets/documents', 'nrm-form-offline-v2-19-09-2019.pdf', res);
});

const addGenericLocals = (req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  // Set feedback and footer links
  res.locals.feedbackUrl = '/feedback';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' },
  ];
  next();
};

app.use((req, res, next) => addGenericLocals(req, res, next));

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  res.locals['session-cookies-table'] = sessionCookiesTable['session-cookies-table'];
  next();
});

module.exports = app;
