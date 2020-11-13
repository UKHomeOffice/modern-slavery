'use strict';
const moment = require('moment');

module.exports = superclass => class extends superclass {

  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, {
      reportExpiration: moment(req.sessionModel.get('created_at')).format('DD MMMM YYYY'),
      userEmail: req.sessionModel.get('user-email')
    });
    const locals = Object.assign({}, superlocals, data);

    req.sessionModel.reset();

    return locals;
  }
};

