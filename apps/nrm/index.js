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
      next: '/pv-want-to-submit-nrm'
    },
    '/pv-want-to-submit-nrm': {
      fields: ['pv-want-to-submit-nrm'],
      next: '/does-pv-need-support'
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
      next: '/does-pv-have-children'
    },
    '/does-pv-have-children': {
      next: '/pv-nationality'
    },
    '/pv-nationality': {
      next: '/pv-interpreter-requirements'
    },
    '/pv-interpreter-requirements': {
      next: '/pv-other-help-with-communication'
    },
    '/pv-other-help-with-communication': {
      next: '/pv-ho-reference'
    },
    '/pv-ho-reference': {
      next: '/pv-contact-details'
    },
    '/pv-contact-details': {
      next: '/pv-phone-number'
    },
    '/pv-phone-number': {
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      next: '/supporting-documents-add'
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
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      next: '/confirm'
    },
    '/confirm': {
       behaviours: ['complete'],
       next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
