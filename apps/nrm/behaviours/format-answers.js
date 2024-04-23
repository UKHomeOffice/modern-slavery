'use strict';

const dataFormatter = require('../util/data-formatter');
const { removeDashesFromText, capitaliseText } = dataFormatter;

/**
 * Format session answers for display purposes
 *
 * @param {Object} req - request object
 *
 * @returns {Object} - additional formatted data for display on UI
 */
// eslint-disable-next-line complexity
const formatAnswers = req => {
  let data = {};

  if (req.sessionModel.get('pv-under-age')) {
    data = Object.assign({}, data, {
      formattedPvUnderAge: removeDashesFromText(capitaliseText(req.sessionModel.get('pv-under-age')))
    });
  }

  if (req.sessionModel.get('does-pv-need-support')) {
    data = Object.assign({}, data, {
      formattedDoesPvNeedSupport: capitaliseText(req.sessionModel.get('does-pv-need-support'))
    });
  }

  if (req.sessionModel.get('pv-want-to-submit-nrm')) {
    data = Object.assign({}, data, {
      formattedPvWnatToSubmitNrm: capitaliseText(req.sessionModel.get('pv-want-to-submit-nrm'))
    });
  }

  if (req.sessionModel.get('pv-gender')) {
    let formattedPvGenderValue = removeDashesFromText(capitaliseText(req.sessionModel.get('pv-gender')));

    if (formattedPvGenderValue === 'Unknown') {
      formattedPvGenderValue = 'They do not identify as male or female';
    }

    data = Object.assign({}, data, {
      formattedPvGender: formattedPvGenderValue
    });
  }

  if (req.sessionModel.get('does-pv-have-children')) {
    data = Object.assign({}, data, {
      formattedDoesPvHaveChildren: capitaliseText(req.sessionModel.get('does-pv-have-children'))
    });
  }


  if (req.sessionModel.get('pv-interpreter-requirements')) {
    data = Object.assign({}, data, {
      formattedPvInterpreterRequirements: capitaliseText(req.sessionModel.get('pv-interpreter-requirements'))
    });
  }

  if (req.sessionModel.get('pv-other-help-with-communication')) {
    data = Object.assign({}, data, {
      formattedPvOtherHelpWithCommunication: capitaliseText(req.sessionModel.get('pv-other-help-with-communication'))
    });
  }

  if (req.sessionModel.get('pv-under-age-at-time-of-exploitation')) {
    data = Object.assign({}, data, {
      formattedPvUnderAgeAtTimeOfExploitation: removeDashesFromText(
        capitaliseText(req.sessionModel.get('pv-under-age-at-time-of-exploitation'))
      )
    });
  }

  if (req.sessionModel.get('pv-phone-number')) {
    data = Object.assign({}, data, {
      formattedPvPhoneNumber: capitaliseText(req.sessionModel.get('pv-phone-number'))
    });
  }

  if (req.sessionModel.get('fr-location')) {
    data = Object.assign({}, data, {
      formattedFrLocation: capitaliseText(removeDashesFromText(req.sessionModel.get('fr-location')), true)
    });
  }

  if (req.sessionModel.get('any-other-pvs')) {
    data = Object.assign({}, data, {
      formattedAnyOtherPvs: removeDashesFromText(capitaliseText(req.sessionModel.get('any-other-pvs')))
    });
  }

  if (req.sessionModel.get('reported-to-police')) {
    data = Object.assign({}, data, {
      formattedReportedToPolice: capitaliseText(req.sessionModel.get('reported-to-police'))
    });
  }

  if (req.sessionModel.get('where-exploitation-happened')) {
    data = Object.assign({}, data, {
      formattedWhereExploitationHappened: capitaliseText(
        removeDashesFromText(req.sessionModel.get('where-exploitation-happened')),
        true,
        [{ word: 'and', allCaps: false}, {word: 'uk', allCaps: true }]
      )
    });
  }

  if (req.sessionModel.get('were-they-taken-somewhere-by-their-exploiter')) {
    data = Object.assign({}, data, {
      formattedWereTheyTakenSomewhereByTheirExploiter: removeDashesFromText(
        capitaliseText(req.sessionModel.get('were-they-taken-somewhere-by-their-exploiter')))
    });
  }

  if (req.sessionModel.get('when-last-contact')) {
    data = Object.assign({}, data, {
      formattedwhenLastContact: capitaliseText(removeDashesFromText(req.sessionModel.get('when-last-contact')), true)
    });
  }

  if (req.sessionModel.get('is-this-the-first-chance-to-report')) {
    data = Object.assign({}, data, {
      formattedIsThisTheFirstChanceToReport: removeDashesFromText(capitaliseText(
        req.sessionModel.get('is-this-the-first-chance-to-report')))
    });
  }

  if (req.sessionModel.get('are-others-involved')) {
    data = Object.assign({}, data, {
      formattedAreOthersInvolved: removeDashesFromText(capitaliseText(
        req.sessionModel.get('are-others-involved')))
    });
  }

  if (req.sessionModel.get('evidence-of-dishonesty')) {
    data = Object.assign({}, data, {
      formattedEvidenceOfDishonesty: removeDashesFromText(capitaliseText(
        req.sessionModel.get('evidence-of-dishonesty')))
    });
  }

  return data;
};

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superlocals = super.locals(req, res);
    const data = Object.assign({}, formatAnswers(req));
    const locals = Object.assign({}, superlocals, data);

    return locals;
  }
};
