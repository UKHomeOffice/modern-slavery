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

module.exports = {
  transformData: (values) => {
    let data = {};
    data.hostUrl = hostUrl;
    data.date = moment().format('DD/MM/YYYY h:mm a');
    data.reportId = uuidv4();
    data.reportLocation = values['fr-location'];
    data.exploitationUk = equal(values['where-exploitation-happened'], 'uk');
    data.isChild = equal(values['pv-under-age'], 'Yes');
    data.isAdult = equal(values['pv-under-age'], 'No');
    data.isUnderAge = values['pv-under-age'];
    if (data.isUnderAge === 'Not sure') {
      data.isChild = true;
    }
    data.underAgeWhenExploited = values['pv-under-age-at-time-of-exploitation'];
    data.labourExploit = util.compare(['types-of-exploitation-forced-to-work',
      'types-of-exploitation-wages-taken', 'types-of-exploitation-forced-to-commit-fraud'], values);
    data.sexualExploit = util.compare(['types-of-exploitation-prostitution',
      'types-of-exploitation-child-exploitation', 'types-of-exploitation-taken-somewhere'], values);
    data.criminalExploit = util.compare(['types-of-exploitation-forced-to-commit-crime',
      'types-of-exploitation-organs-removed'], values);
    data.otherVictims = values['any-other-pvs'];
    data.gender = values['pv-gender'];
    if (data.gender === 'Unknown') {
      data.gender = 'They do not identify as male or female';
    }
    data.pvWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'Yes');
    data.pvNotWantToSubmit = equal(values['pv-want-to-submit-nrm'], 'No');
    data.contactSomeoneElse = equal(values['who-contact'], 'someone-else');
    data.whoContact = values['who-contact'];
    if (data.contactSomeoneElse) {
      data.whoContact = 'Someone else';
    }
    if (data.whoContact === 'potential-victim') {
      data.whoContact = 'Potential victim';
    }
    data.values = values;
    return data;
  }
};
