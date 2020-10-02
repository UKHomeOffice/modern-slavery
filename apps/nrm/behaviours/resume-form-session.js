'use strict';
const request = require('request');
const config = require('../../../config');
const moment = require('moment');
const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
const _ = require('lodash');

module.exports = superclass => class extends superclass {

  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      previousReports: _.sortBy(req.previousReports, 'id')
    });
    const locals = Object.assign({}, superlocals, data);

    return locals;
  }

  getValues(req, res, next) {
    request.get(baseUrl + req.sessionModel.get('user-email'), (err, response, body) => {
        if (err) {
          return next(err);
        }
        this.cleanSession(req);
        const resBody = JSON.parse(body);

        if (resBody && resBody.length && resBody[0].session) {
          req.previousReports = [];

          resBody.forEach(report => {
            let created = moment(report.created_at);
            let expires = moment(report.created_at).add(28, 'days');
            let remaining = expires.diff(moment(), 'days');

            let rep = {
              id: report.id,
              reference: report.session.reference,
              createdAt: created.format('DD MMMM YYYY'),
              expiresAt: expires.format('DD MMMM YYYY'),
              daysRemaining: remaining
            };
            req.previousReports.push(rep);
          });
          super.getValues(req, res, next);
        } else {
          super.getValues(req, res, next);
        }
      }
    );
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
    super.saveValues(req, res, (err) => {
      if (req.body.delete) {
        request.del(baseUrl + req.sessionModel.get('user-email') + '/' + req.body.delete, () => {
          res.redirect('/nrm/reports');
        });
      } else if (req.body.resume) {
        request.get(baseUrl + req.sessionModel.get('user-email') + '/' + req.body.resume, (error, response, body) => {
            const resBody = JSON.parse(body);
            if (resBody && resBody.length && resBody[0].session) {

              if (resBody[0].session.hasOwnProperty('alertUser')) {
                delete resBody[0].session.alertUser;
              }

              req.sessionModel.set(resBody[0].session);
              req.sessionModel.set('id', req.body.resume);

              return res.redirect('/nrm/continue-report');
            }
            next(error);
        });
      } else {
        this.cleanSession(req);
        next(err);
      }
    });
  }
};


