'use strict';

const sessionModifiers = require('../../models/session-modifiers');

const { deleteFieldsFromSession } = sessionModifiers;

const coOperateWithPolice = (req) => {
  const currentField = 'co-operate-with-police';
  const pvWantToSubmitNrmValue = req.sessionModel.get('pv-want-to-submit-nrm') === 'yes';
  const coOperateWithPoliceValue = req.sessionModel.get('co-operate-with-police') === 'yes';

  if (pvWantToSubmitNrmValue) {
      const deleteFields = [
        'fr-details-first-name',
        'fr-details-last-name',
        'fr-details-role',
        'fr-details-phone',
        'fr-alternative-contact',
      ];

      const config = {
        currentField,
        deleteFields,
      };

      deleteFieldsFromSession(req, config);

  } else if (coOperateWithPoliceValue && !pvWantToSubmitNrmValue) {
    const deleteFields = [
      'pv-name-first-name',
      'pv-name-last-name',
      'pv-name-nickname',
      'pv-contact-details',
      'pv-contact-details-email-input',
      'pv-contact-details-email-check',
      'pv-contact-details-street',
      'pv-contact-details-town',
      'pv-contact-details-county',
      'pv-contact-details-postcode',
      'pv-contact-details-post-check',
    ];

    const config = {
      currentField,
      deleteFields,
    };

    deleteFieldsFromSession(req, config);
  }
};

module.exports = {
  coOperateWithPolice,
};

