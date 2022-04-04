'use strict';
const moment = require('moment');
const config = require('../../../config');

const calculateExpiryDate = updatedAtDate => {
  return moment(updatedAtDate).add(config.reports.deletionTimeout, 'days')
    .format('DD MMMM YYYY');
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      reportExpiration: calculateExpiryDate(req.sessionModel.get('updated_at')),
      userEmail: req.sessionModel.get('user-email')
    });
    const locals = Object.assign({}, superlocals, data);

    req.sessionModel.reset();

    return locals;
  }
};
