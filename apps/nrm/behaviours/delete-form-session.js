'use strict';
const { model: Model } = require('hof');
const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, async err => {
      if (err) {
        next(err);
      }

      try {
        const model = new Model();
        const params = {
          url: config.saveService.host + ':' + config.saveService.port
            + '/reports/' + encodeEmail(req.sessionModel.get('user-email')) + '/' + req.sessionModel.get('id'),
          method: 'DELETE'
        };
        await model._request(params);
        return next();
      } catch (error) {
        logger.error(`Error deleting data: ${error.message}`);
        return next(error);
      }
    });
  }
};
