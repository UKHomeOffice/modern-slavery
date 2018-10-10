'use strict';
const emailDomainList = require('../../../ms-email-domains.js');
const checkDomain = (userEmailDomain) => {
    let flag = false;

    emailDomainList.forEach((emailDomain) => {
      if (userEmailDomain === emailDomain) {
        flag = true;
      }
    });
    return flag;
};

// fork to error page when an email domain is not recognised
module.exports = superclass => class extends superclass {

  saveValues(req, res, callback) {
    super.saveValues(req, res, err => {
      const email = req.form.values['confirm-email'];
      const emailDomain = email.replace(/.*@/, '');
      const isRecognisedDomain = checkDomain(emailDomain);

      if (isRecognisedDomain === false) {
        req.sessionModel.set('recognised-email', false);
      }
      callback(err);
    });
  }

  getNextStep(req, res) {
    if (req.sessionModel.get('recognised-email') === false) {
      req.sessionModel.unset('recognised-email');
      return '/email-not-recognised';
    }
    return super.getNextStep(req, res);
  }
};
