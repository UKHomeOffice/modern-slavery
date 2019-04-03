'use strict';
const checkToken = require('../models/check-token');

/* eslint no-process-env: 0*/
module.exports = superclass => class extends superclass {

  getValues(req, res, callback) {
    const token = req.query.token;
    const dev = process.env.NODE_ENV === 'development';
    // skips if it goes to /nrm/start?token=skip
    // skips if a session is already present
    if (token === 'skip' && dev || (req.sessionModel.get('valid-token')) === true) {
     return super.getValues(req, res, callback);
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
         req.sessionModel.set('user-organisation', user.organisation);
         return super.getValues(req, res, callback);
       }
       return res.redirect('/nrm/token-invalid');
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
 }

};
