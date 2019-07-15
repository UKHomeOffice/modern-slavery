'use strict';

const Model = require('hof-model');
const crypto = require('crypto');

const config = require('../../../config');

module.exports = class CaseworkModel extends Model {

  constructor(attributes, options) {
    super(attributes, options);
    this.options.timeout = this.options.timeout || config.icasework.timeout;
  }

  url() {
    return config.icasework.url + config.icasework.createpath;
  }

  prepare() {
    const params = {
      Key: config.icasework.key,
      Signature: this.sign(),
      Type: 'NRM',
      Format: 'json',
      db: 'nrm',
      RequestMethod: 'Online form'
    };

    return params;
  }

  sign() {
    const date = (new Date()).toISOString().split('T')[0];
    return crypto.createHash('md5').update(date + config.icasework.secret).digest('hex');
  }

  save() {
    const options = this.requestConfig({});
    options.form = this.prepare();
    options.method = 'POST';
    if (!config.icasework.secret || !config.icasework.key && config.env !== 'production') {
      return Promise.resolve({
        createcaseresponse: {
          caseid: 'mock caseid'
        }
      });
    }
    return this.request(options);
  }

};
