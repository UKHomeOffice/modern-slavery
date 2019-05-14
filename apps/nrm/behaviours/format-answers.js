'use strict';

/**
 * Capitalise the first letter or the first letter of each word (Title Case)
 *
 * @param {Object} text - text to be capitalised
 * @param {bool} [all=false] - whether the first letter of each word is capitalised
 *
 * @returns {bool} - capitalised text
 */
const capitaliseText = (text, all = false) => {
  const capitalisedText = text.charAt(0).toUpperCase() + text.slice(1);

  if (all) {
    var splitString = text.toLowerCase().split(' ');
    for (var i = 0; i < splitString.length; i++) {
      splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
    }
    return splitString.join(' ');
  }

  return capitalisedText;

};

/**
 * Remove dashes from text
 *
 * @param {Object} text - request parameters
 *
 * @returns {bool} - has the user followed the duty to notify path
 */
const removeDashesFromText = (text) => {
  const strippedDashes = text.replace('-', ' ');

  return strippedDashes;
};

/**
 * Format session answers
 *
 * @param {Object} req - request object
 *
 * @returns {void}
 */
const formatAnswers = (req) => {
  req.sessionModel.set(
    'pv-under-age',
    removeDashesFromText(capitaliseText(req.sessionModel.get('pv-under-age'))),
  );

  if (req.sessionModel.get('does-pv-need-support')) {
    req.sessionModel.set(
      'does-pv-need-support',
      capitaliseText(req.sessionModel.get('does-pv-need-support')),
    );
  }

  if (req.sessionModel.get('pv-want-to-submit-nrm')) {
    req.sessionModel.set(
      'pv-want-to-submit-nrm',
      capitaliseText(req.sessionModel.get('pv-want-to-submit-nrm')),
    );
  }

  if (req.sessionModel.get('co-operate-with-police')) {
    req.sessionModel.set(
      'co-operate-with-police',
      capitaliseText(req.sessionModel.get('co-operate-with-police')),
    );
  }

  if (req.sessionModel.get('pv-gender')) {
    req.sessionModel.set(
      'pv-gender',
      removeDashesFromText(capitaliseText(req.sessionModel.get('pv-gender'))),
    );
  }

  if (req.sessionModel.get('does-pv-have-children')) {
    req.sessionModel.set(
      'does-pv-have-children',
      capitaliseText(req.sessionModel.get('does-pv-have-children')),
    );
  }

  if (req.sessionModel.get('pv-interpreter-requirements')) {
    req.sessionModel.set(
      'pv-interpreter-requirements',
      capitaliseText(req.sessionModel.get('pv-interpreter-requirements')),
    );
  }

  if (req.sessionModel.get('pv-other-help-with-communication')) {
    req.sessionModel.set(
      'pv-other-help-with-communication',
      capitaliseText(req.sessionModel.get('pv-other-help-with-communication')),
    );
  }

  if (req.sessionModel.get('pv-under-age-at-time-of-exploitation')) {
    req.sessionModel.set(
      'pv-under-age-at-time-of-exploitation',
      removeDashesFromText(capitaliseText(req.sessionModel.get('pv-under-age-at-time-of-exploitation'))),
    );
  }

  req.sessionModel.set(
    'fr-location',
    capitaliseText(removeDashesFromText(req.sessionModel.get('fr-location')), true),
  );

  req.sessionModel.set(
    'any-other-pvs',
    removeDashesFromText(capitaliseText(req.sessionModel.get('any-other-pvs'))),
  );

  req.sessionModel.set(
    'reported-to-police',
    capitaliseText(req.sessionModel.get('reported-to-police')),
  );
};

module.exports = superclass => class extends superclass {
  getValues(req, res, callback) {
    formatAnswers(req);
    return super.getValues(req, res, callback);
  }
};
