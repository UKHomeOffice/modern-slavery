/* eslint-disable consistent-return */
'use strict';

const request = require('request');
const config = require('../../../config');
const moment = require('moment');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
const _ = require('lodash');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      previousReports: _.sortBy(req.previousReports, 'id').reverse(),
      deletionTimeout: config.reports.deletionTimeout
    });
    const locals = Object.assign({}, superlocals, data);

    return locals;
  }

  getValues(req, res, next) {
    // skip requesting data service api when running in local mode
    if (config.env === 'local') {
      return super.getValues(req, res, next);
    }

    return request.get(baseUrl + encodeEmail(req.sessionModel.get('user-email')), (err, response, body) => {
      if (err) {
        return next(err);
      }
      this.cleanSession(req);
      const resBody = JSON.parse(body);

      if (resBody && resBody.length && resBody[0].session) {
        req.previousReports = [];

        resBody.forEach(report => {
          const created = moment(report.created_at);
          const expires = moment(report.created_at).add(config.reports.deletionTimeout, 'days');
          const remaining = expires.diff(moment(), 'days');

          const rep = {
            id: report.id,
            reference: report.session.reference,
            createdAt: created.format('DD MMMM YYYY'),
            expiresAt: expires.format('DD MMMM YYYY'),
            daysRemaining: remaining
          };
          req.previousReports.push(rep);
        });
      }
      return super.getValues(req, res, next);
    });
  }

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

  saveValues(req, res, next) {
    this.cleanSession(req);
    return super.saveValues(req, res, next);
  }
};
