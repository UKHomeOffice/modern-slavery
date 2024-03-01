'use strict';

const { model: Model } = require('hof');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
const logger = require('hof/lib/logger')({ env: config.env });

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  getValues(req, res, next) {
    return req.query.id && req.query.reference ?
      super.getValues(req, res, next) :
      res.redirect('/nrm/reports');
  }

  locals(req, res) {
    return Object.assign({}, super.locals(req, res), {
      id: req.query.id,
      reference: req.query.reference
    });
  }

  async saveValues(req, res, next) {
    const id = req.body.confirm;
    const email = encodeEmail(req.sessionModel.get('user-email'));
    try {
      const model = new Model();
      const params = {
        url: `${baseUrl}${email}/${id}`,
        method: 'DELETE'
      };
      await model._request(params);
    } catch (err) {
      logger.error(`Error deleting data: ${err.message}`);
      return next(new Error(err.body || 'An unknown error occurred when deleting the form'));
    }
    return super.saveValues(req, res, next);
  }
};
