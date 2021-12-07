'use strict';

const request = require('request');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['user-email', 'user-organisation', 'csrf-secret'];

    cleanList = cleanList.filter(item => keepList.indexOf(item) === -1);

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/reports']);
  }

  getValues(req, res, next) {
    const id = req.query.id;

    if (!id) {
      return res.redirect('/nrm/reports');
    }

    this.cleanSession(req);

    const getUrl = baseUrl + encodeEmail(req.sessionModel.get('user-email')) + '/' + id;

    return request.get(getUrl, (error, response, body) => {
      if (error) {
        return next(error);
      }
      const resBody = JSON.parse(body);

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
      }
      return super.getValues(req, res, next);
    });
  }

  locals(req, res) {
    const locals = Object.assign({}, super.locals(req, res), {
      hideChangeLink: true
    });

    return locals;
  }

  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        next(err);
      }

      return res.redirect('/nrm' + req.sessionModel.get('steps').pop());
    });
  }
};
