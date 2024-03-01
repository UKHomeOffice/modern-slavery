'use strict';

const { model: Model } = require('hof');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
const logger = require('hof/lib/logger')({ env: config.env });

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['user-email', 'user-organisation', 'csrf-secret'];

    cleanList = cleanList.filter(item => keepList.indexOf(item) === -1);

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/reports']);
  }

  async getValues(req, res, next) {
    const id = req.query.id;
    if (!id) {
      return res.redirect('/nrm/reports');
    }
    this.cleanSession(req);

    try {
      const model = new Model();
      const params = {
        url: baseUrl + encodeEmail(req.sessionModel.get('user-email')) + '/' + id,
        method: 'GET'
      };
      const response = await model._request(params);
      const resBody = response.data;

      if (resBody && resBody.length && resBody[0].session) {
        if (resBody[0].session.hasOwnProperty('alertUser')) {
          delete resBody[0].session.alertUser;
        }
        const session = resBody[0].session;

        delete session['csrf-secret'];
        delete session.errors;

        // ensure no /edit steps are add to the steps property when session resumed
        session.steps = session.steps.filter(step => !step.match(/\/change|edit$/));

        req.sessionModel.set(session);
        req.sessionModel.set('id', id);
        req.sessionModel.set('redirect-to-reports', true);
      }
    } catch (error) {
      logger.error(`Error getting data: ${error.message}`);
      return next(error);
    }
    return super.getValues(req, res, next);
  }

  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }
      req.sessionModel.set('redirect-to-reports', false);

      // steps in the session fall out of sync when changed from the current progress report page
      // this reorders them to ensure the user jumps to the last step they filled out
      const sessionSteps = req.sessionModel.get('steps');
      const formSteps = Object.keys(req.form.options.steps);
      const orderedSessionSteps = formSteps.filter(step => sessionSteps.includes(step));
      const lastestStepInJourney = orderedSessionSteps.pop();

      return res.redirect(`/nrm${lastestStepInJourney}`);
    });
  }
};
