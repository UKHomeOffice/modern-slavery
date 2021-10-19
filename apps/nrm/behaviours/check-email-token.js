'use strict';
const checkToken = require('../models/check-token');
const config = require('../../../config');

/* eslint no-process-env: 0*/
module.exports = superclass => class extends superclass {

  saveValues(req, res, callback) {
    const token = req.query.token;
    // skips if it goes to /nrm/start?token=skip
    // skips if a session is already present
    if (token === 'skip' && config.allowSkip && config.skipEmail || (req.sessionModel.get('valid-token')) === true) {
      req.sessionModel.set('user-email', config.skipEmail);
      console.log('========> sessionModel', req.sessionModel.get('user-email'));
      return super.saveValues(req, res, callback);
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
        return super.saveValues(req, res, callback);
       }
       return res.redirect('/nrm/token-invalid');
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
 }

};
