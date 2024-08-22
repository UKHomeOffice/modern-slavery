'use strict';
const request = require('axios');
const config = require('../../../config');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      request.del(config.saveService.host + ':' + config.saveService.port
         + '/reports/' + encodeEmail(req.sessionModel.get('user-email')) + '/' + req.sessionModel.get('id'), next);
    });
  }
};
