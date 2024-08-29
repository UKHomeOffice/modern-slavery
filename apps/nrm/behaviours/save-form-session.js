/* eslint-disable consistent-return */
'use strict';

const axios = require('axios');
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

      // remove the firstAlert property added when the user has a week to complete the report
      if (session.hasOwnProperty('firstAlert')) {
        delete session.firstAlert;
      }

      // skip requesting data service api when running in local and test mode
      if (config.env === 'local' || config.env === 'test') {
        return next();
      }

      const externalID = req.sessionModel.get('externalID');
      req.log('info', `External ID: ${externalID}, Saving Form Session: ${req.sessionModel.get('id')}`);

      axios.post(`${config.saveService.host}:${config.saveService.port}/reports`, {
        email: req.sessionModel.get('user-email'),
        id: req.sessionModel.get('id'),
        session: session
      }, {
        headers: {'Content-Type': 'application/json'}
      })
        .then(response => {
          const resBody = response.data;

          if (resBody && resBody.length && resBody[0].id) {
            req.sessionModel.set('id', resBody[0].id);
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
        })
        .catch(error => {
          req.log('info', `External ID: ${externalID}, Error Saving Session: ${error}`);
          next(error);
        });
    });
  }
};
