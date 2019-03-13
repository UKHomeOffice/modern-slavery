'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const supportingDocuments = require('./behaviours/supporting-documents');
const supportingDocumentsAddAnother = require('./behaviours/supporting-documents-add-another');

module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
  pages: {
    '/token-invalid': 'token-invalid'
  },
  steps: {
    '/start': {
      behaviours: checkEmailToken,
      next: '/fr-location'
    },
    '/fr-location': {
      fields: ['fr-location'],
      next: '/pv-under-age'
    },
    '/pv-under-age': {
      fields: ['pv-under-age'],
      forks: [
       {
        target: '/local-authority-contacted-about-child',
        condition: {
          field: 'pv-under-age',
          value: 'yes'
        }
       },
       {
        target: '/local-authority-contacted-about-child',
        condition: {
          field: 'pv-under-age',
          value: 'not-sure'
        }
       }
      ],
      next: '/pv-under-age-at-time-of-exploitation',
    },
    '/local-authority-contacted-about-child': {
      fields: [
        'local-authority-contacted-about-child-local-authority-name',
        'local-authority-contacted-about-child-local-authority-phone',
        'local-authority-contacted-about-child-local-authority-email',
        'local-authority-contacted-about-child-local-authority-contact',
      ],
      next: '/what-happened'
    },
    '/pv-under-age-at-time-of-exploitation': {
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-happened'
    },
    '/what-happened': {
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
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ],
      forks: [{
        target: '/pv-name-that-requires-support',
        condition: (req) => {
          return (req.sessionModel.get('pv-under-age')) !== 'no';
        }
      }],
      next: '/pv-want-to-submit-nrm'
    },
    '/pv-want-to-submit-nrm': {
      fields: ['pv-want-to-submit-nrm'],
      forks: [{
        target: '/refuse-nrm',
        condition: {
          field: 'pv-want-to-submit-nrm',
          value: 'no'
        }
      }],
      continueOnEdit: true,
      next: '/does-pv-need-support'
    },
    '/refuse-nrm': {
      fields: ['refuse-nrm'],
      next: '/refuse-nrm-co-operate-with-police'
    },
    '/refuse-nrm-co-operate-with-police': {
      fields: ['refuse-nrm-co-operate-with-police'],
      forks: [{
        target: '/confirm',
        condition: {
          field: 'refuse-nrm-co-operate-with-police',
          value: 'no'
        }
      }],
      continueOnEdit: true,
      next: '/refuse-nrm-pv-name'
    },
    '/refuse-nrm-pv-name': {
      fields: [
        'refuse-nrm-pv-name-first-name',
        'refuse-nrm-pv-name-last-name',
        'refuse-nrm-pv-name-nickname',
      ],
      next: '/refuse-nrm-pv-contact-details'
    },
    '/refuse-nrm-pv-contact-details': {
      fields: [
        'refuse-nrm-pv-contact-details',
        'refuse-nrm-pv-contact-details-email-input',
        'refuse-nrm-pv-contact-details-email-check',
        'refuse-nrm-pv-contact-details-street',
        'refuse-nrm-pv-contact-details-town',
        'refuse-nrm-pv-contact-details-county',
        'refuse-nrm-pv-contact-details-postcode',
        'refuse-nrm-pv-contact-details-post-check',
      ],
      next: '/confirm'
    },
    '/does-pv-need-support': {
      fields: ['does-pv-need-support'],
      next: '/pv-name-that-requires-support'
    },
    '/pv-name-that-requires-support': {
      fields: [
        'pv-name-that-requires-support-first-name',
        'pv-name-that-requires-support-last-name',
        'pv-name-that-requires-support-nickname',
      ],
      next: '/pv-dob'
    },
    '/pv-dob': {
      fields: ['pv-dob'],
      next: '/pv-gender'
    },
    '/pv-gender': {
      fields: ['pv-gender'],
      next: '/does-pv-have-children'
    },
    '/does-pv-have-children': {
      fields: ['does-pv-have-children', 'does-pv-have-children-yes-amount'],
      next: '/pv-nationality'
    },
    '/pv-nationality': {
      fields: ['pv-nationality', 'pv-nationality-second'],
      next: '/pv-interpreter-requirements'
    },
    '/pv-interpreter-requirements': {
      fields: ['pv-interpreter-requirements', 'pv-interpreter-requirements-language'],
      next: '/pv-other-help-with-communication'
    },
    '/pv-other-help-with-communication': {
      fields: ['pv-other-help-with-communication', 'pv-other-help-with-communication-aid'],
      next: '/pv-ho-reference'
    },
    '/pv-ho-reference': {
      fields: ['pv-ho-reference', 'pv-ho-reference-type'],
      forks: [{
        target: '/fr-details',
        condition: (req) => {
          return (req.sessionModel.get('pv-under-age')) !== 'no';
        }
      }],
      next: '/pv-contact-details'
    },
    '/pv-contact-details': {
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
      forks: [{
        target: '/co-operate-with-police',
        condition: (req) => {
          return (req.sessionModel.get('does-pv-need-support')) === 'no';
        }
      }],
      next: '/pv-phone-number'
    },
    '/pv-phone-number': {
      fields: ['pv-phone-number', 'pv-phone-number-yes'],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      next: '/fr-details'
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
      next: '/fr-details'
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
      next: '/fr-details'
    },
    '/fr-details': {
      fields: [
        'fr-details-name',
        'fr-details-role',
        'fr-details-phone',
      ],
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      fields: ['fr-alternative-contact'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [
        'complete',
        require('hof-behaviour-summary-page')
      ],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
