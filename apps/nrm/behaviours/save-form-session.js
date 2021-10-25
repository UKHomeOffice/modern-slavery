/* eslint-disable consistent-return */
'use strict';

const request = require('request');
const config = require('../../../config');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }

      // not sure why the current step hasn't been added to the steps at this point?
      const session = req.sessionModel.toJSON();
      if (session.steps.indexOf(req.path) === -1) {
        session.steps.push(req.path);
      }
      // ensure no /edit steps are add to the steps property when we save to the store
      session.steps = session.steps.filter(step => {
        return (step.indexOf('/edit') === -1 || step.indexOf('/change'));
      });

      if (req.body['save-and-exit']) {
        session.alertUser = true;
      }

      // skip requesting data service api when running in local mode
      if (config.env === 'local') {
        return next();
      }

      request.post({
        headers: {'content-type': 'application/json'},
        url: config.saveService.host + ':' + config.saveService.port + '/reports',
        body: JSON.stringify({
          email: req.sessionModel.get('user-email'),
          id: req.sessionModel.get('id'),
          session: session
        })
      }, (error, response, body) => {
        if (error) {
          next(error);
        }
        const resBody = JSON.parse(body);
        if (resBody && resBody.length && resBody[0].id) {
          req.sessionModel.set('id', JSON.parse(body)[0].id);
        } else {
          req.sessionModel.unset('id');
        }

        if (req.body['save-and-exit']) {
          return res.redirect('/nrm/save-and-exit');
        }

        if (req.path.indexOf('/change') !== -1) {
          return res.redirect('/nrm/continue-report');
        }

        next();
      });
    });
  }
};
