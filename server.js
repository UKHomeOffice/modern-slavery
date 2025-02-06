'use strict';
/* eslint-disable consistent-return */

const hof = require('hof');
const download = require('./lib/download-file');
let settings = require('./hof.settings');
const path = require('path');
const promptSheet = require('./config').promptSheet;
const config = require('./config');
const _ = require('lodash');
const busboy = require('busboy');
const bytes = require('bytes');
const bl = require('bl');

const sessionCookiesTable = require('./apps/common/translations/src/en/cookies.json');

settings.routes = settings.routes.map(route => require(route));
settings.behaviours = settings.behaviours.map(require);
settings.views = path.resolve(__dirname, './apps/common/views');
settings.root = __dirname;

settings = Object.assign({}, settings, {
  csp: {
    imgSrc: [
      'www.google-analytics.com',
      'ssl.gstatic.com',
      'www.google.co.uk/ads/ga-audiences',
      'data:'
    ],
    connectSrc: [
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com'
    ]
  }
});

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

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    let busboyInstance;
    try {
      busboyInstance = busboy({
        headers: req.headers,
        limits: {
          fileSize: bytes('200mb')
        }
      });
    } catch (err) {
      return next(err);
    }

    busboyInstance.on('field', function (key, value) {
      req.body[key] = value;
    });

    busboyInstance.on('file', function (key, file, fileInfo) {
      file.pipe(bl(function (err, d) {
        if (err || !(d.length || fileInfo.filename)) {
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: fileInfo.filename || null,
          encoding: fileInfo.encoding,
          mimetype: fileInfo.mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        if (settings.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });

    let error;

    busboyInstance.on('error', function (err) {
      error = err;
      next(err);
    });

    busboyInstance.on('finish', function () {
      if (error) {
        return;
      }
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(busboyInstance);
  } else {
    next();
  }
});

module.exports = app;
