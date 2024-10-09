'use strict';
const checkToken = require('../models/check-token');
const config = require('../../../config');

/* eslint no-process-env: 0*/
module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    // const token = req.query.token;
    const token = (req.query.token).replace('?hof-cookie-check', '');
    const email = req.query.email || config.skipEmail;

    const skipEmailAuth = token === 'skip' && config.allowSkip && email;
    const validEmailToken = req.sessionModel.get('valid-token') === true;
    // skips if it goes to /nrm/start?token=skip
    // skips if a session is already present.
    // skips if email params if provided /nrm/start?token=skip&email=s@
    if (skipEmailAuth || validEmailToken) {
      req.sessionModel.set('user-email', email);
      return super.saveValues(req, res, next);
    }
    // returns a Promise
    return checkToken.read(token)
      .then(user => {
        if (user.valid) {
          // delete the token once it's been used
          checkToken.delete(token);
          // this is so a user can go back without requesting a new token
          req.sessionModel.set('valid-token', true);
          // store email & org to send to caseworker later
          req.sessionModel.set('user-email', user.email);
          return super.saveValues(req, res, next);
        }
        return res.redirect('/nrm/token-invalid');
      })
      .catch(err => req.log('info', `Check Token Error: ${err}`)
      );
  }
};
