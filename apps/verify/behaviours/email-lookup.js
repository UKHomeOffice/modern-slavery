'use strict';
const emailDomainList = require('../../../ms-email-domains.js');

// throw a validation when an email domain is not recognised
module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
    console.log('nothing is happening');
    const userEmail = req.form.values['user-email'];
    const userEmailDomain = userEmail.replace(/.*@/, '');
    const isRecognisedDomain = this.checkDomain(userEmailDomain);

    // if (isRecognisedDomain === false) {
    //   return '/email-not-recognised';
    // }
    // return super.getNextStep(req, res);
      next(err);
    });
  }


  getNextStep(req, res) {

  }

  // validate(req, res, next) {
  //   const userEmail = req.form.values['user-email'];
  //   const userEmailDomain = userEmail.replace(/.*@/, '');
  //   const isRecognisedDomain = this.checkDomain(userEmailDomain);

  //   if (isRecognisedDomain === false) {
  //     next({
  //       'user-email': new this.ValidationError('user-email', {type: 'wrongEmail'})
  //     });
  //   } else {
  //     super.validate(req, res, next);
  //   }
  // }

  checkDomain(userEmailDomain) {
    let flag = false;

    emailDomainList.forEach((emailDomain) => {
      if (userEmailDomain === emailDomain) {
        flag = true;
      }
    });
    return flag;
  }
};
