'use strict';
const axios = require('axios');
const config = require('../../../config');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        return next(err);
      }
      const email = encodeEmail(req.sessionModel.get('user-email'));
      const id = req.sessionModel.get('id');
      const url = `${config.saveService.host}:${config.saveService.port}/reports/${email}/${id}`;
      
      axios.delete(url)
        .then(() => {
          next();
        })
        .catch(error => {
          next(error);
        });
    });
  }
};
