'use strict';

module.exports = {
  coOperateWithPolice: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-nationality';
    } else if (req.sessionModel.get('does-pv-need-support') === 'yes') {
      backLink = '/nrm/pv-phone-number';
    } else if (req.sessionModel.get('who-contact') === 'someone-else') {
      backLink = '/nrm/someone-else';
    } else {
      backLink = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  },
  confirm: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes' || req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/fr-alternative-contact/edit';
    } else if (req.sessionModel.get('co-operate-with-police') === 'yes') {
      backLink = '/nrm/pv-contact-details/edit';
    } else {
      backLink = '/nrm/co-operate-with-police/edit';
    }

    return backLink;
  },
  doesPvHaveChildren: (req) => {
    let backLink = '/nrm/pv-gender';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  doesPvNeedSupport: (req) => {
    let backLink = '/nrm/pv-want-to-submit-nrm';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  },
  frAlternativeContact: (req) => {
    let backLink = '/nrm/fr-details';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  frDetails: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/pv-ho-reference';
    } else {
      backLink = '/nrm/co-operate-with-police';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  localAuthorityContactedAboutChild: (req) => {
    let backLink;

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    } else {
      backLink = '/nrm/pv-under-age';
    }

    return backLink;
  },
  pvContactDetails: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-name';
    } else {
      backLink = '/nrm/who-contact';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvDob: (req) => {
    let backLink = '/nrm/pv-name';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvGender: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/refuse-nrm';
    } else {
      backLink = '/nrm/pv-dob';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvHoReference: (req) => {
    let backLink = '/nrm/pv-other-help-with-communication';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvInterpreterRequirements: (req) => {
    let backLink = '/nrm/pv-nationality';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvName: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/reported-to-police';
    } else if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes') {
      backLink = '/nrm/does-pv-need-support';
    } else {
      backLink = '/nrm/co-operate-with-police';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvNationality: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      backLink = '/nrm/pv-gender';
    } else {
      backLink = '/nrm/does-pv-have-children';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvPhoneNumber: (req) => {
    let backLink;

    if (req.sessionModel.get('who-contact') === 'someone-else') {
      backLink = '/nrm/someone-else';
    } else {
      backLink = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  pvUnderAgeAtTimeOfExploitation: (req) => {
    let backLink;

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    } else {
      backLink = '/nrm/pv-under-age';
    }

    return backLink;
  },
  pvWantToSubmitNrm: (req) => {
    let backLink = '/nrm/reported-to-police';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  },
  refuseNrm: (req) => {
    let backLink = '/nrm/pv-want-to-submit-nrm';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  reportedToPolice: (req) => {
    let backLink = '/nrm/any-other-pvs';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  someoneElse: (req) => {
    let backLink = '/nrm/who-contact';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  whatHappened: (req) => {
    let backLink;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      backLink = '/nrm/local-authority-contacted-about-child';
    } else {
      backLink = '/nrm/pv-under-age-at-time-of-exploitation';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  whoContact: (req) => {
    let backLink = '/nrm/pv-ho-reference';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  whereExploitationHappened: (req) => {
    let backLink = '/nrm/what-happened';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink += '/edit';
    }

    return backLink;
  },
  whereExploitationHappenedUk: (req) => {
    let backLink = '/nrm/where-exploitation-happened';

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    }

    return backLink;
  },
  whereExploitationHappenedOverseas: (req) => {
    let backLink;

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    } else if (req.sessionModel.get('where-exploitation-happened') === 'overseas') {
      backLink = '/nrm/where-exploitation-happened';
    } else {
      backLink = '/nrm/where-exploitation-happened-uk';
    }

    return backLink;
  },
  currentPvLocation: (req) => {
    let backLink;

    if (req.params && req.params.action && req.params.action === 'edit') {
      backLink = '/nrm/confirm';
    } else if (req.sessionModel.get('where-exploitation-happened') === 'uk') {
      backLink = '/nrm/where-exploitation-happened-uk';
    } else {
      backLink = '/nrm/where-exploitation-happened-overseas';
    }

    return backLink;
  },
};
