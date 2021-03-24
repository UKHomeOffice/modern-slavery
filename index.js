'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const busboyBodyParser = require('busboy-body-parser');
const download = require('./download-file');
const settings = require('./hof.settings');
const path = require('path');
const fs = require('fs');

settings.routes = settings.routes.map(route => require(route));
settings.views = path.resolve(__dirname, './apps/common/views');
settings.root = __dirname;
settings.start = false;

// edit cookies.json from hof-template-partials so that the correct session cookies are shown on /cookies
fs.readFile('node_modules/hof-template-partials/translations/src/en/cookies.json', 'utf8', (e, data) => {
  const obj = JSON.parse(data);
  obj['session-cookies-table'].rows[0][0] = 'modern-slavery.hof.sid';
  fs.writeFile('node_modules/hof-template-partials/translations/src/en/cookies.json',
      JSON.stringify(obj, null, 2), (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.err(err);
        }
      });
});

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

app.use((req, res, next) => {
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
});

module.exports = app;
