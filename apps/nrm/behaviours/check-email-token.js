'use strict';
const checkToken = require('../models/check-token');

/* eslint no-process-env: 0*/
module.exports = superclass => class extends superclass {

  getValues(req, res, callback) {
    const token = req.query.token;

    if (token === 'skip' && process.env.NODE_ENV === 'development') {
      return super.getValues(req, res, callback);
    }

    // async issues with reading from the database so promisify function
    new Promise((resolve, reject) => {
       return checkToken.read(token, resolve, reject);
    })
    .then(isValidToken => {
      if (isValidToken) {
        // delete the token once it's been used
        checkToken.delete(token);
        return super.getValues(req, res, callback);
      }
      return res.redirect('/nrm/token-invalid');
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
  }

};
