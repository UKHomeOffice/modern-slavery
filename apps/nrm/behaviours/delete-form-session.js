'use strict';
const request = require('request');
const config = require('../../../config');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      request.del(config.saveService.host + ':' + config.saveService.port
         + '/reports/' + req.sessionModel.get('user-email') + '/' + req.sessionModel.get('id'), next);
    });
  }
};
