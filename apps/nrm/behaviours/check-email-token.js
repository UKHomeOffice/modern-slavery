'use strict';
const checkToken = require('../models/check-token');

module.exports = superclass => class extends superclass {

  getValues(req, res, callback) {
    // get the token from the link
    const token = req.params.action;
    // async issues with reading from the database so promisify function
    new Promise((resolve, reject) => {
       return checkToken.read(token, resolve, reject);
    })
    .then(isValidToken => {
      if (isValidToken) {
        return super.getValues(req, res, callback);
      }
      return res.redirect('/nrm/token-invalid');
    })
    .catch(err => console.log(err));
  }

};
