'use strict';
const axios = require('axios');
const config = require('../../../config');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    try {
      // Wrap super.saveValues with a promise
      await new Promise((resolve, reject) => {
        super.saveValues(req, res, err => {
          if (err) {
            return reject(err); // Explicitly reject the promise
          }
          resolve(); // Explicitly resolve the promise
        });
      });

      // Construct the URL for the request
      const email = encodeEmail(req.sessionModel.get('user-email'));
      const id = req.sessionModel.get('id');
      const url = `${config.saveService.host}:${config.saveService.port}/reports/${email}/${id}`;

      // Perform the delete request using axios
      await axios.delete(url);

      // Explicitly return next() to ensure the function is consistent
      return next();
    } catch (error) {
      // Explicitly return next(error) to handle the error case
      return next(error);
    }
  }
};
