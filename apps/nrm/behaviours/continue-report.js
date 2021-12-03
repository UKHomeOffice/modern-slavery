'use strict';

const request = require('request');
const config = require('../../../config');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['user-email', 'user-organisation', 'csrf-secret'];


    cleanList = cleanList.filter(item => {
      if (keepList.indexOf(item) === -1) {
        return item;
      }
    });

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/reports']);
  }

  getValues(req, res, next) {
    const id = req.query.id;

    if (!id) {
      return res.redirect('/nrm/reports');
    }

    this.cleanSession(req);

    return request.get(baseUrl + encodeEmail(req.sessionModel.get('user-email')) + '/' + id, (error, response, body) => {
      if (error) {
        return next(error);
      }
      const resBody = JSON.parse(body);

      if (resBody && resBody.length && resBody[0].session) {
        if (resBody[0].session.hasOwnProperty('alertUser')) {
          delete resBody[0].session.alertUser;
        }

        req.sessionModel.set(resBody[0].session);
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
