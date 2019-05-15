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
const formatAnswers = (req) => {
  let data = {};

  data = Object.assign({}, data, {
    formattedPvUnderAge: removeDashesFromText(capitaliseText(req.sessionModel.get('pv-under-age'))),
  });

  if (req.sessionModel.get('does-pv-need-support')) {
    data = Object.assign({}, data, {
      formattedDoesPvNeedSupport: capitaliseText(req.sessionModel.get('does-pv-need-support')),
    });
  }

  if (req.sessionModel.get('pv-want-to-submit-nrm')) {
    data = Object.assign({}, data, {
      formattedPvWnatToSubmitNrm: capitaliseText(req.sessionModel.get('pv-want-to-submit-nrm')),
    });
  }

  if (req.sessionModel.get('co-operate-with-police')) {
    data = Object.assign({}, data, {
      formattedCoOperateWithPolice: capitaliseText(req.sessionModel.get('co-operate-with-police')),
    });
  }

  if (req.sessionModel.get('pv-gender')) {
    let formattedPvGenderValue = removeDashesFromText(capitaliseText(req.sessionModel.get('pv-gender')));

    if (formattedPvGenderValue === 'Unknown') {
      formattedPvGenderValue = 'They do not identify as male or female';
    }

    data = Object.assign({}, data, {
      formattedPvGender: formattedPvGenderValue,
    });
  }

  if (req.sessionModel.get('does-pv-have-children')) {
    data = Object.assign({}, data, {
      formattedDoesPvHaveChildren: capitaliseText(req.sessionModel.get('does-pv-have-children')),
    });
  }


  if (req.sessionModel.get('pv-interpreter-requirements')) {
    data = Object.assign({}, data, {
      formattedPvInterpreterRequirements: capitaliseText(req.sessionModel.get('pv-interpreter-requirements')),
    });
  }

  if (req.sessionModel.get('pv-other-help-with-communication')) {
    data = Object.assign({}, data, {
      formattedPvOtherHelpWithCommunication: capitaliseText(req.sessionModel.get('pv-other-help-with-communication')),
    });
  }

  if (req.sessionModel.get('pv-under-age-at-time-of-exploitation')) {
    data = Object.assign({}, data, {
      formattedPvUnderAgeAtTimeOfExploitation: removeDashesFromText(
        capitaliseText(req.sessionModel.get('pv-under-age-at-time-of-exploitation'))
        ),
    });
  }

  data = Object.assign({}, data, {
    formattedFrLocation: capitaliseText(removeDashesFromText(req.sessionModel.get('fr-location')), true),
  });

  data = Object.assign({}, data, {
    formattedAnyOtherPvs: removeDashesFromText(capitaliseText(req.sessionModel.get('any-other-pvs'))),
  });

  data = Object.assign({}, data, {
    formattedReportedToPolice: capitaliseText(req.sessionModel.get('reported-to-police')),
  });

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
