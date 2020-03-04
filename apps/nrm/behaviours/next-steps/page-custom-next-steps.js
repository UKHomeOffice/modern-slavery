'use strict';

module.exports = {
  coOperateWithPolice: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes') {
      nextStep = '/nrm/fr-details';
    } else if (req.sessionModel.get('co-operate-with-police') === 'no') {
      nextStep = '/nrm/confirm';
    } else {
      nextStep = '/nrm/pv-name';
    }

    if (
      req.params &&
      req.params.action &&
      req.params.action === 'edit' &&
      nextStep !== '/nrm/confirm' &&
      nextStep !== '/nrm/fr-details'
      ) {
      nextStep += '/edit';
    }

    return nextStep;
  },
  doesPvHaveChildren: (req) => {
    let nextStep = '/nrm/pv-nationality';

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  doesPvNeedSupport: () => {
    let nextStep = '/nrm/pv-name';

    return nextStep;
  },
  frAlternativeContact: () => {
    let nextStep = '/nrm/confirm';

    return nextStep;
  },
  pvContactDetails: (req) => {
    let nextStep;

    if (
      req.sessionModel.get('pv-want-to-submit-nrm') === 'no' ||
      (req.params && req.params.action && req.params.action === 'edit')
      ) {
      nextStep = '/nrm/confirm';
    } else if (req.sessionModel.get('does-pv-need-support') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-phone-number';
    }

    return nextStep;
  },
  pvGender: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/pv-nationality';
    } else {
      nextStep = '/nrm/does-pv-have-children';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  pvHoReference: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      nextStep = '/nrm/fr-details';
    } else {
      nextStep = '/nrm/who-contact';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  pvName: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'yes' || req.sessionModel.get('pv-under-age') !== 'no') {
      nextStep = '/nrm/pv-dob';
    } else {
      nextStep = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  pvNationality: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-interpreter-requirements';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  pvUnderAge: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      nextStep = '/nrm/local-authority-contacted-about-child';
    } else {
      nextStep = '/nrm/pv-under-age-at-time-of-exploitation';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  },
  pvWantToSubmitNrm: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      nextStep = '/nrm/refuse-nrm';
    } else {
      nextStep = '/nrm/does-pv-need-support';
    }

    return nextStep;
  },
  reportedToPolice: (req) => {
    let nextStep;

    if (req.sessionModel.get('pv-under-age') !== 'no') {
      nextStep = '/nrm/pv-name';
    } else {
      nextStep = '/nrm/pv-want-to-submit-nrm';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  someoneElse: (req) => {
    let nextStep;

    if (req.sessionModel.get('does-pv-need-support') === 'no') {
      nextStep = '/nrm/co-operate-with-police';
    } else {
      nextStep = '/nrm/pv-phone-number';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  whoContact: (req) => {
    let nextStep;

    if (req.sessionModel.get('who-contact') === 'someone-else') {
      nextStep = '/nrm/someone-else';
    } else {
      nextStep = '/nrm/pv-contact-details';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  whereExploitationHappened: (req) => {
    let nextStep;

    if (req.sessionModel.get('where-exploitation-happened') === 'overseas') {
      nextStep = '/nrm/where-exploitation-happened-overseas';
    } else {
      nextStep = '/nrm/where-exploitation-happened-uk';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep += '/edit';
    }

    return nextStep;
  },
  whereExploitationHappenedUk: (req) => {
    let nextStep;

    if (req.sessionModel.get('where-exploitation-happened') === 'uk-and-overseas') {
      nextStep = '/nrm/where-exploitation-happened-overseas';
    } else {
      nextStep = '/nrm/current-pv-location';
    }

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  whereExploitationHappenedOverseas: (req) => {
    let nextStep = '/nrm/current-pv-location';

    if (req.params && req.params.action && req.params.action === 'edit') {
      nextStep = '/nrm/confirm';
    }

    return nextStep;
  },
  checkYourAnswersSoFar: (req) => {
    let nextStep = '/nrm/start';

    const savedData = req.sessionModel.get('report-read-success');

    if (savedData) {
      // get the last saved page - only caveat is that the user would have already answered this question
      // ideally we would like to send them to the subsequent page
      const visitedPages = savedData.visited_pages.split(',');
      const getLastSavedPage = visitedPages[visitedPages.length - 1].trim();

      nextStep = `/nrm${getLastSavedPage}`;
    }

    return nextStep;
  },
};
