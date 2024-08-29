'use strict';

const axios = require('axios');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';

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

  saveValues(req, res, next) {
    const id = req.body.confirm;

    if (id) {
      const email = encodeEmail(req.sessionModel.get('user-email'));
      const url = `${baseUrl}${email}/${id}`;

      return axios.delete(url)
        .then(() => {
          return super.saveValues(req, res, next);
      })
      .catch(err => {
        return next(err);
      });
    }
    return super.saveValues(req, res, next);
  }
};
