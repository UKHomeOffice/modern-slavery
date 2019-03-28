'use strict';
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const util = require('../util/check-list-with-object');
const hostUrl = require('../../../config').hostUrl;

const equal = (item, value) => {
  if (item === value) {
    return true;
  }
  return false;
};
const upperCase = (inputString) => {
  if (inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  return '';
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    locals.date = moment().format('DD/MM/YYYY h:mm a');
    locals.reportId = uuidv4();
    locals.hostUrl = hostUrl;
    const values = req.sessionModel.options.session['hof-wizard-nrm'];
    locals.exploitationUk = equal(values['where-exploitation-happened'], 'uk');
    locals.isChild = equal(values['pv-under-age'], 'yes');
    locals.isAdult = equal(values['pv-under-age'], 'no');
    locals.labourExploit = util.compare(['types-of-exploitation-forced-to-work',
      'types-of-exploitation-wages-taken', 'types-of-exploitation-forced-to-commit-fraud'], values);
    locals.sexualExploit = util.compare(['types-of-exploitation-prostitution',
      'types-of-exploitation-child-exploitation', 'types-of-exploitation-taken-somewhere'], values);
    locals.criminalExploit = util.compare(['types-of-exploitation-forced-to-commit-crime',
      'types-of-exploitation-organs-removed'], values);
    locals.pvWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'yes');
    locals.pvNotWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'no');
    locals.contactSomeoneElse = equal(values['who-contact'], 'someone-else');
    locals.pvHasChildren = upperCase(values['does-pv-have-children']);
    return locals;
  }
};
