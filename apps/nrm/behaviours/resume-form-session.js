/* eslint-disable consistent-return */
'use strict';

const request = require('axios');
const config = require('../../../config');
const moment = require('moment');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
const _ = require('lodash');
const uuid = require('uuid');

const encodeEmail = email => Buffer.from(email).toString('hex');

module.exports = superclass => class extends superclass {
  cleanSession(req) {
    let cleanList = Object.keys(req.sessionModel.attributes);
    const keepList = ['user-email', 'user-organisation', 'csrf-secret'];

    cleanList = cleanList.filter(item => keepList.indexOf(item) === -1);

    req.sessionModel.unset(cleanList);
    req.sessionModel.set('steps', ['/start', '/reports']);

    const externalID = req.sessionModel.get('externalID') || uuid.v4();
    req.sessionModel.set('externalID', externalID);
    req.log('info', `External ID: ${externalID} for report submission`);
  }

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
    this.cleanSession(req);

    const externalID = req.sessionModel.get('externalID');

    // skip requesting data service api when running in local and test mode
    if (config.env === 'local' || config.env === 'test') {
      return super.getValues(req, res, next);
    }

    return request.get(baseUrl + encodeEmail(req.sessionModel.get('user-email')), (err, response, body) => {
      if (err) {
        return next(err);
      }

      const resBody = JSON.parse(body);

      if (resBody && resBody.length && resBody[0].session) {
        req.previousReports = [];

        resBody.forEach(report => {
          const created = moment(report.created_at);
          const expires = moment(report.updated_at).add(config.reports.deletionTimeout, 'days').endOf('day');
          const remaining = expires.diff(moment(), 'days');

          req.log('info', `External ID: ${externalID}, Report Session ID: ${report.id}`);
          req.log('info', `External ID: ${externalID}, Report Session Reference: ${report.session.reference}`);
          req.log('info', `External ID: ${externalID}, Report Created at: ${created.format('DD MMMM YYYY')}`);
          req.log('info', `External ID: ${externalID}, Report Expires at: ${expires.format('DD MMMM YYYY')}`);

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
      req.sessionModel.set('redirect-to-reports', false);
      return super.getValues(req, res, next);
    });
  }
};
