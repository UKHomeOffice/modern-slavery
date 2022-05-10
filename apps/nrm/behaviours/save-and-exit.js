'use strict';
const moment = require('moment');
const config = require('../../../config');

const calculateExpiryDate = () => {
  return moment().add(config.reports.deletionTimeout, 'days')
    .format('DD MMMM YYYY');
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      reportExpiration: calculateExpiryDate(),
      userEmail: req.sessionModel.get('user-email')
    });
    const locals = Object.assign({}, superlocals, data);

    req.sessionModel.reset();

    return locals;
  }
};
