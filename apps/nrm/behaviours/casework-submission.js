'use strict';

const CaseworkModel = require('../models/i-casework');
const StatsD = require('hot-shots');
const client = new StatsD();

const Compose = func => superclass => class extends superclass {

  prepare() {
    if (typeof func === 'function') {
      return Object.assign(super.prepare(), func(this.toJSON()));
    }
    return super.prepare();
  }

};

module.exports = config => {

  config = config || {};

  // allow a custom model override
  config.Model = config.Model || CaseworkModel;

  // compose custom per-app prepare methods onto the standard model
  const Model = Compose(config.prepare)(config.Model);

  return superclass => class extends superclass {

    saveValues(req, res, next) {
      req.log('debug', 'Submitting case to icasework');
      super.saveValues(req, res, err => {
        if (err) {
          return next(err);
        }
        const model = new Model(req.sessionModel.toJSON());
        req.log('debug', `Sending icasework submission to ${model.url()}`);
        model.save()
          .then(data => {
            req.log('debug', `Successfully submitted case to icasework (${data.createcaseresponse.caseid})`);
            req.sessionModel.set('caseid', data.createcaseresponse.caseid);
            client.increment('casework.submission.success');
            next();
          })
          .catch(e => {
            req.log('error', `Casework submission failed: ${e.status}`);
            req.log('error', e.headers && e.headers['x-application-error-info']);
            client.increment('casework.submission.failed');
            next(e);
          });
      });
    }

  };

};
