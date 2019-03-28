'use strict';
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const util = require('./check-list-with-object');
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

module.exports = {
  transformData: (values) => {
    let data = {};
    data.hostUrl = hostUrl;
    data.date = moment().format('DD/MM/YYYY h:mm a');
    data.reportId = uuidv4();
    data.exploitationUk = equal(values['where-exploitation-happened'], 'uk');
    data.isChild = equal(values['pv-under-age'], 'yes');
    data.isAdult = equal(values['pv-under-age'], 'no');
    data.labourExploit = util.compare(['types-of-exploitation-forced-to-work',
      'types-of-exploitation-wages-taken', 'types-of-exploitation-forced-to-commit-fraud'], values);
    data.sexualExploit = util.compare(['types-of-exploitation-prostitution',
      'types-of-exploitation-child-exploitation', 'types-of-exploitation-taken-somewhere'], values);
    data.criminalExploit = util.compare(['types-of-exploitation-forced-to-commit-crime',
      'types-of-exploitation-organs-removed'], values);
    data.pvWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'yes');
    data.pvNotWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'no');
    data.contactSomeoneElse = equal(values['who-contact'], 'someone-else');
    data.pvHasChildren = upperCase(values['does-pv-have-children']);
    data.values = values;
    return data;
  }
};
