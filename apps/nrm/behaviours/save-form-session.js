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

      // remove csrf secret and errors from session data to prevent CSRF Secret issues in the session
      const session = req.sessionModel.toJSON();
      delete session['csrf-secret'];
      delete session.errors;

      if (session.steps.indexOf(req.path) === -1) {
        session.steps.push(req.path);
      }
      // ensure no /edit steps are add to the steps property when we save to the store
      session.steps = session.steps.filter(step => !step.match(/\/change|edit$/));

      if (req.body['save-and-exit']) {
        session.alertUser = true;
      }

      // skip requesting data service api when running in local and test mode
      if (config.env === 'local' || config.env === 'test') {
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

        const noEditContinue = !req.form.options.continueOnEdit;

        if (req.sessionModel.get('redirect-to-reports') && noEditContinue) {
          return res.redirect(`/nrm/continue-report?id=${req.sessionModel.get('id')}`);
        }

        next();
      });
    });
  }
};
