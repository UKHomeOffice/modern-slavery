'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const supportingDocuments = require('./behaviours/supporting-documents');
const supportingDocumentsAddAnother = require('./behaviours/supporting-documents-add-another');
const typesOfExploitation = require('./behaviours/types-of-exploitation');
const dataToPdf = require('./behaviours/data-to-pdf');
const generateSendPdf = require('./behaviours/generate-send-pdf');
const saveMissingData = require('./behaviours/save-missing-data');
const transferMissingData = require('./behaviours/transfer-missing-data');
const pvUnderAge = require('./behaviours/pv-under-age');
const pvUnderAgeAtTimeOfExploitation = require('./behaviours/pv-under-age-at-time-of-exploitation');
const localAuthorityContactedAboutChild = require('./behaviours/local-authority-contacted-about-child');
const coOperateWithPolice = require('./behaviours/co-operate-with-police');
const confirm = require('./behaviours/confirm');
const pvName = require('./behaviours/pv-name');
const pvNationality = require('./behaviours/pv-nationality');
const pvContactDetails = require('./behaviours/pv-contact-details');
const frLocation = require('./behaviours/fr-location.js');
const whatHappend = require('./behaviours/what-happend');
const pvGender = require('./behaviours/pv-gender');
const pvPhoneNumber = require('./behaviours/pv-phone-number');
const frDetails = require('./behaviours/fr-details');
const doesPvHaveChildren = require('./behaviours/does-pv-have-children');
const reportedToPolice = require('./behaviours/reported-to-police');
const pvDob = require('./behaviours/pv-dob');
const pvHoReference = require('./behaviours/pv-ho-reference');
const pvWantToSubmitNrm = require('./behaviours/pv-want-to-submit-nrm');
const doesPvNeedSupport = require('./behaviours/does-pv-need-support');
const pvInterpreterRequirements = require('./behaviours/pv-interpreter-requirements');
const refuseNrm = require('./behaviours/refuse-nrm');
const whoContact = require('./behaviours/who-contact');
const someoneElse = require('./behaviours/someone-else');
const frAlternateContact = require('./behaviours/fr-alternate-contact');

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
      behaviours: frLocation,
      fields: ['fr-location'],
      next: '/pv-under-age'
    },
    '/pv-under-age': {
      behaviours: pvUnderAge,
      fields: ['pv-under-age'],
    },
    '/local-authority-contacted-about-child': {
      behaviours: localAuthorityContactedAboutChild,
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
      behaviours: pvUnderAgeAtTimeOfExploitation,
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-happened'
    },
    '/what-happened': {
      behaviours: whatHappend,
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
      behaviours: reportedToPolice,
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ]
    },
    '/pv-want-to-submit-nrm': {
      behaviours: pvWantToSubmitNrm,
      fields: ['pv-want-to-submit-nrm'],
      continueOnEdit: true,
    },
    '/refuse-nrm': {
      behaviours: refuseNrm,
      fields: ['refuse-nrm'],
      next: '/pv-gender'
    },
    '/does-pv-need-support': {
      behaviours: doesPvNeedSupport,
      fields: ['does-pv-need-support'],
      continueOnEdit: true,
    },
    '/support-organisations': {
      backLink: '/does-pv-need-support'
    },
    '/pv-name': {
      behaviours: pvName,
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname',
      ]
    },
    '/pv-dob': {
      fields: ['pv-dob'],
      behaviours: [pvDob, saveMissingData('pv-dob')],
      next: '/pv-gender'
    },
    '/pv-gender': {
      fields: ['pv-gender'],
      behaviours: [pvGender, saveMissingData('pv-gender')],
    },
    '/does-pv-have-children': {
      behaviours: [doesPvHaveChildren, saveMissingData(['does-pv-have-children', 'does-pv-have-children-yes-amount'])],
      fields: ['does-pv-have-children', 'does-pv-have-children-yes-amount'],
    },
    '/pv-nationality': {
      fields: ['pv-nationality', 'pv-nationality-second'],
      behaviours: [pvNationality, saveMissingData(['pv-nationality', 'pv-nationality-second'])],
      next: '/co-operate-with-police'
    },
    '/pv-interpreter-requirements': {
      behaviours: [
        pvInterpreterRequirements,
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
      behaviours: [pvHoReference, saveMissingData(['pv-ho-reference', 'pv-ho-reference-type'])],
    },
    '/who-contact': {
      behaviours: [whoContact, saveMissingData('who-contact')],
      fields: ['who-contact'],
      continueOnEdit: true,
    },
    '/someone-else': {
      behaviours: someoneElse,
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
      behaviours: [pvContactDetails, transferMissingData(['pv-dob', 'pv-gender',
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
      pvPhoneNumber,
      saveMissingData(['pv-phone-number', 'pv-phone-number-yes']),
      ],
      fields: ['pv-phone-number', 'pv-phone-number-yes'],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      behaviours: [coOperateWithPolice, transferMissingData(['pv-dob', 'pv-gender',
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
      behaviours: frDetails,
      fields: [
        'fr-details-first-name',
        'fr-details-last-name',
        'fr-details-role',
        'fr-details-phone',
      ],
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      behaviours: [frAlternateContact, transferMissingData(['pv-dob', 'pv-gender',
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
          confirm,
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
