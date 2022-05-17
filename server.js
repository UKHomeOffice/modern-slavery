'use strict';

const hof = require('hof');
const download = require('./lib/download-file');
const settings = require('./hof.settings');
const path = require('path');
const promptSheet = require('./config').promptSheet;
const config = require('./config');
const _ = require('lodash');

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

if (config.env === 'development' || config.env === 'test') {
  app.use('/test/bootstrap-session', (req, res) => {
    const appName = req.body.appName;

    if (!_.get(req, 'session[`hof-wizard-${appName}`]')) {
      if (!req.session) {
        throw new Error('Redis is not running!');
      }

      req.session[`hof-wizard-${appName}`] = {};
    }

    Object.keys(req.body.sessionProperties || {}).forEach(key => {
      req.session[`hof-wizard-${appName}`][key] = req.body.sessionProperties[key];
    });

    res.send('Session populate complete');
  });
}
module.exports = app;
