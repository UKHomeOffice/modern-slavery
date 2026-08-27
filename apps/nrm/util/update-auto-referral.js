'use strict';

const updateAutomaticReferral = (req, pvUnderAgeValue) => {
  if (typeof pvUnderAgeValue === 'undefined') {
    return;
  }

  const pvUnderAge = pvUnderAgeValue !== 'no';
  const currentSteps = req.sessionModel.get('steps') || [];
  const previouslyAnsweredSubmitToNRM = currentSteps.includes('/pv-want-to-submit-nrm');

  req.sessionModel.set('automatic-referral', pvUnderAge);

  if (pvUnderAge) {
    req.sessionModel.set('pv-want-to-submit-nrm', 'yes');
    req.sessionModel.set('is-referral', true);
    req.sessionModel.unset('does-pv-need-support');
  } else if (!previouslyAnsweredSubmitToNRM) {
    req.sessionModel.unset('pv-want-to-submit-nrm');
    req.sessionModel.unset('is-referral');
  }
};

module.exports = {
  updateAutomaticReferral
};
