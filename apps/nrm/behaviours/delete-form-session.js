'use strict';
const request = require('request');
const got = require('got');
const config = require('../../../config');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      got.del(config.saveService.host + ':' + config.saveService.port
         + '/reports/' + req.sessionModel.get('user-email') + '/' + req.sessionModel.get('id'), next);
    });
  }
};
