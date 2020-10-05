'use strict';
const request = require('request');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';

module.exports = superclass => class extends superclass {

  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      reference: req.sessionModel.get('toDelete').reference
    });
    const locals = Object.assign({}, superlocals, data);

    return locals;
  }

  getValues(req, res, next) {
    if (!req.sessionModel.get('toDelete')) {
      res.redirect('/nrm/reports');
    }

    super.getValues(req, res, next);
  }

  saveValues(req, res, next) {
    super.saveValues(req, res, (err) => {
      if (req.body.confirm) {
        request.del(baseUrl + req.sessionModel.get('user-email') + '/' + req.sessionModel.get('toDelete').id, () => {
          req.sessionModel.unset('toDelete');
          res.redirect('/nrm/reports');
        });
      } else {
        req.sessionModel.unset('toDelete');
        res.redirect('/nrm/reports');
        next(err);
      }
    });
  }
};


