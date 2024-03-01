'use strict';
const Model = require('hof').model;
const config = require('../../../config');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      const model = new Model();
      const params = {
        url: config.saveService.host + ':' + config.saveService.port
          + '/reports/' + encodeEmail(req.sessionModel.get('user-email')) + '/' + req.sessionModel.get('id'),
        method: 'DELETE'
      };

      return model._request(params).then(() => {
        next();
      }).catch(error => {
        next(error);
      });
    });
  }
};
