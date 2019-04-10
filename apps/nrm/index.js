'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const supportingDocuments = require('./behaviours/supporting-documents');
const supportingDocumentsAddAnother = require('./behaviours/supporting-documents-add-another');
const typesOfExploitation = require('./behaviours/types-of-exploitation');
const dataToPdf = require('./behaviours/data-to-pdf');
const generateSendPdf = require('./behaviours/generate-send-pdf');
const saveMissingData = require('./behaviours/save-missing-data');
const transferMissingData = require('./behaviours/transfer-missing-data');

/* Back Link and Next Step functions overridden */
const bkLinkNextPvUnderAge = require('./behaviours/pv-under-age');
const bkLinkNextCoOperateWithPolice = require('./behaviours/co-operate-with-police');
const bkLinkNextPvName = require('./behaviours/pv-name');
const bkLinkNextPvNationality = require('./behaviours/pv-nationality');
const bkLinkNextPvContactDetails = require('./behaviours/pv-contact-details');
const bkLinkNextPvGender = require('./behaviours/pv-gender');
const bkLinkNextDoesPvHaveChildren = require('./behaviours/does-pv-have-children');
const bkLinkNextReportedToPolice = require('./behaviours/reported-to-police');
const bkLinkNextPvHoReference = require('./behaviours/pv-ho-reference');
const bkLinkNextPvWantToSubmitNrm = require('./behaviours/pv-want-to-submit-nrm');
const bkLinkNextDoesPvNeedSupport = require('./behaviours/does-pv-need-support');
const bkLinkNextWhoContact = require('./behaviours/who-contact');
const bkLinkNextSomeoneElse = require('./behaviours/someone-else');
const bkLinkNextFrAlternateContact = require('./behaviours/fr-alternate-contact');

/* Back Link function overridden */
const bkLinkRefuseNrm = require('./behaviours/refuse-nrm');
const bkLinkPvInterpreterRequirements = require('./behaviours/pv-interpreter-requirements');
const bkLinkPvDob = require('./behaviours/pv-dob');
const bkLinkFrLocation = require('./behaviours/fr-location.js');
const bkLinkWhatHappend = require('./behaviours/what-happend');
const bkLinkPvPhoneNumber = require('./behaviours/pv-phone-number');
const bkLinkFrDetails = require('./behaviours/fr-details');
const bkLinkConfirm = require('./behaviours/confirm');
const bkLinkPvUnderAgeAtTimeOfExploitation = require('./behaviours/pv-under-age-at-time-of-exploitation');
const bkLinkLocalAuthorityContactedAboutChild = require('./behaviours/local-authority-contacted-about-child');


module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
  pages: {
    '/template-pdf': 'pdf',
    '/token-invalid': 'token-invalid'
  },
  steps: {
    '/start': {
      behaviours: checkEmailToken,
      next: '/fr-location'
    },
    '/fr-location': {
      behaviours: bkLinkFrLocation,
      fields: ['fr-location'],
      next: '/pv-under-age'
    },
    '/pv-under-age': {
      behaviours: bkLinkNextPvUnderAge,
      fields: ['pv-under-age'],
    },
    '/local-authority-contacted-about-child': {
      behaviours: bkLinkLocalAuthorityContactedAboutChild,
      fields: [
        'local-authority-contacted-about-child-local-authority-name',
        'local-authority-contacted-about-child-local-authority-phone',
        'local-authority-contacted-about-child-local-authority-email',
        'local-authority-contacted-about-child-local-authority-first-name',
        'local-authority-contacted-about-child-local-authority-last-name',
      ],
      next: '/what-happened'
    },
    '/pv-under-age-at-time-of-exploitation': {
      behaviours: bkLinkPvUnderAgeAtTimeOfExploitation,
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-happened'
    },
    '/what-happened': {
      behaviours: bkLinkWhatHappend,
      fields: ['what-happened'],
      next: '/where-exploitation-happened'
    },
    '/where-exploitation-happened': {
      fields: [
        'where-exploitation-happened',
        'where-exploitation-happened-uk-city',
        'where-exploitation-happened-uk-region',
        'where-exploitation-happened-other-uk-other-location',
        'where-exploitation-happened-overseas-country',
        'where-exploitation-happened-other-overseas-other-location'
      ],
      next: '/current-pv-location'
    },
    '/current-pv-location': {
      fields: ['current-pv-location-uk-city', 'current-pv-location-uk-region'],
      next: '/who-exploited-pv'
    },
    '/who-exploited-pv': {
      fields: ['who-exploited-pv'],
      next: '/types-of-exploitation'
    },
    '/types-of-exploitation': {
      behaviours: typesOfExploitation,
      fields: [
        'types-of-exploitation-forced-to-work',
        'types-of-exploitation-wages-taken',
        'types-of-exploitation-forced-to-commit-fraud',
        'types-of-exploitation-prostitution',
        'types-of-exploitation-child-exploitation',
        'types-of-exploitation-taken-somewhere',
        'types-of-exploitation-forced-to-commit-crime',
        'types-of-exploitation-organs-removed',
        'types-of-exploitation-unpaid-household-work',
        'types-of-exploitation-other',
        'other-exploitation-details'
      ],
      next: '/any-other-pvs'
    },
    '/any-other-pvs': {
      fields: ['any-other-pvs'],
      next: '/reported-to-police'
    },
    '/reported-to-police': {
      behaviours: bkLinkNextReportedToPolice,
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ]
    },
    '/pv-want-to-submit-nrm': {
      behaviours: bkLinkNextPvWantToSubmitNrm,
      fields: ['pv-want-to-submit-nrm'],
      continueOnEdit: true,
    },
    '/refuse-nrm': {
      behaviours: bkLinkRefuseNrm,
      fields: ['refuse-nrm'],
      next: '/pv-gender'
    },
    '/does-pv-need-support': {
      behaviours: bkLinkNextDoesPvNeedSupport,
      fields: ['does-pv-need-support'],
      continueOnEdit: true,
    },
    '/support-organisations': {
      backLink: '/does-pv-need-support'
    },
    '/pv-name': {
      behaviours: bkLinkNextPvName,
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname',
      ]
    },
    '/pv-dob': {
      fields: ['pv-dob'],
      behaviours: [bkLinkPvDob, saveMissingData('pv-dob')],
      next: '/pv-gender'
    },
    '/pv-gender': {
      fields: ['pv-gender'],
      behaviours: [bkLinkNextPvGender, saveMissingData('pv-gender')],
    },
    '/does-pv-have-children': {
      behaviours: [
        bkLinkNextDoesPvHaveChildren,
        saveMissingData(['does-pv-have-children', 'does-pv-have-children-yes-amount'])
      ],
      fields: ['does-pv-have-children', 'does-pv-have-children-yes-amount'],
    },
    '/pv-nationality': {
      fields: ['pv-nationality', 'pv-nationality-second'],
      behaviours: [bkLinkNextPvNationality, saveMissingData(['pv-nationality', 'pv-nationality-second'])],
      next: '/co-operate-with-police'
    },
    '/pv-interpreter-requirements': {
      behaviours: [
        bkLinkPvInterpreterRequirements,
        saveMissingData(['pv-interpreter-requirements', 'pv-interpreter-requirements-language'])
      ],
      fields: ['pv-interpreter-requirements', 'pv-interpreter-requirements-language'],
      next: '/pv-other-help-with-communication'
    },
    '/pv-other-help-with-communication': {
      behaviours: saveMissingData(['pv-other-help-with-communication', 'pv-other-help-with-communication-aid']),
      fields: ['pv-other-help-with-communication', 'pv-other-help-with-communication-aid'],
      next: '/pv-ho-reference'
    },
    '/pv-ho-reference': {
      fields: ['pv-ho-reference', 'pv-ho-reference-type'],
      behaviours: [bkLinkNextPvHoReference, saveMissingData(['pv-ho-reference', 'pv-ho-reference-type'])],
    },
    '/who-contact': {
      behaviours: [bkLinkNextWhoContact, saveMissingData('who-contact')],
      fields: ['who-contact'],
      continueOnEdit: true,
    },
    '/someone-else': {
      behaviours: bkLinkNextSomeoneElse,
      fields: [
        'someone-else',
        'someone-else-first-name',
        'someone-else-last-name',
        'someone-else-email-input',
        'someone-else-street',
        'someone-else-town',
        'someone-else-county',
        'someone-else-postcode',
        'someone-else-permission-check',
      ],
    },
    '/pv-contact-details': {
      behaviours: [bkLinkNextPvContactDetails, transferMissingData(['pv-dob', 'pv-gender',
        'does-pv-have-children', 'does-pv-have-children-yes-amount', 'pv-nationality',
        'pv-nationality-second', 'pv-ho-reference', 'pv-ho-reference-type',
        'pv-interpreter-requirements', 'pv-interpreter-requirements-language',
        'pv-other-help-with-communication', 'pv-other-help-with-communication-aid', 'who-contact',
        'pv-phone-number', 'pv-phone-number-yes'])],
      fields: [
        'pv-contact-details',
        'pv-contact-details-email-input',
        'pv-contact-details-email-check',
        'pv-contact-details-street',
        'pv-contact-details-town',
        'pv-contact-details-county',
        'pv-contact-details-postcode',
        'pv-contact-details-post-check',
      ],
    },
    '/pv-phone-number': {
      behaviours: [
      bkLinkPvPhoneNumber,
      saveMissingData(['pv-phone-number', 'pv-phone-number-yes']),
      ],
      fields: ['pv-phone-number', 'pv-phone-number-yes'],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      behaviours: [bkLinkNextCoOperateWithPolice, transferMissingData(['pv-dob', 'pv-gender',
        'does-pv-have-children', 'does-pv-have-children-yes-amount', 'pv-nationality',
        'pv-nationality-second', 'pv-ho-reference', 'pv-ho-reference-type',
        'pv-interpreter-requirements', 'pv-interpreter-requirements-language',
        'pv-other-help-with-communication', 'pv-other-help-with-communication-aid',
        'pv-phone-number', 'pv-phone-number-yes', 'who-contact'])],
    },
    '/supporting-documents-add': {
      fields: [
        'supporting-documents-add'
      ],
      forks: [{
        target: '/supporting-documents',
        condition: {
          field: 'supporting-documents-add',
          value: 'yes'
        }
      }],
    },
    '/supporting-documents': {
      behaviours: supportingDocuments,
      fields: [
      'supporting-document-upload',
      'supporting-document-description'
      ],
      continueOnEdit: true,
      next: '/supporting-documents-add-another'
    },
    '/supporting-documents-add-another': {
      fields: [
        'supporting-documents-add-another'
      ],
      behaviours: supportingDocumentsAddAnother,
      forks: [{
        target: '/supporting-documents',
        condition: {
          field: 'supporting-documents-add-another',
          value: 'yes'
        }
      }],
      continueOnEdit: true,
    },
    '/fr-details': {
      behaviours: bkLinkFrDetails,
      fields: [
        'fr-details-first-name',
        'fr-details-last-name',
        'fr-details-role',
        'fr-details-phone',
      ],
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      behaviours: [bkLinkNextFrAlternateContact, transferMissingData(['pv-dob', 'pv-gender',
        'does-pv-have-children', 'does-pv-have-children-yes-amount', 'pv-nationality',
        'pv-nationality-second', 'pv-ho-reference', 'pv-ho-reference-type',
        'pv-interpreter-requirements', 'pv-interpreter-requirements-language',
        'pv-other-help-with-communication', 'pv-other-help-with-communication-aid', 'who-contact',
        'pv-phone-number', 'pv-phone-number-yes'])],
      fields: ['fr-alternative-contact'],
    },
    '/confirm': {
      behaviours: [
        require(
          'hof-behaviour-summary-page'),
          bkLinkConfirm,
          generateSendPdf,
          'complete'
      ],
      next: '/confirmation'
    },
    // need this to check the formatting of the pdf
    '/pdf': {
      behaviours: dataToPdf
    },
    '/confirmation': {
      backLink: false
    }
  }
};
