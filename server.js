'use strict';

const hof = require('hof');
const download = require('./lib/download-file');
const settings = require('./hof.settings');
const path = require('path');
const promptSheet = require('./config').promptSheet;

const sessionCookiesTable = require('./apps/common/translations/src/en/cookies.json');

settings.routes = settings.routes.map(route => require(route));
settings.views = path.resolve(__dirname, './apps/common/views');
settings.root = __dirname;

const app = hof(settings);

// Downloads the offline form to client side
app.use('/prompt-sheet-for-working-offline', (req, res) => {
  download.responseFile('/assets/documents', promptSheet, res);
});

const addGenericLocals = (req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';
  // Set feedback and footer links
  res.locals.feedbackUrl = '/feedback';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' }
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
