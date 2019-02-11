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
      next: '/select-location'
    },
    '/select-location': {
      fields: ['select-location'],
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
      next: '/what-happened'
    },
    '/what-happened': {
      next: '/where-exploitation-happened'
    },
    '/where-exploitation-happened': {
      next: '/current-pv-location'
    },
    '/current-pv-location': {
      next: '/who-exploited-pv'
    },
    '/who-exploited-pv': {
      next: '/types-of-exploitation'
    },
    '/types-of-exploitation': {
      next: '/any-other-pvs'
    },
    '/any-other-pvs': {
      next: '/reported-to-police'
    },
    '/reported-to-police': {
      next: '/pv-want-to-submit-nrm'
    },
    '/pv-want-to-submit-nrm': {
      next: '/does-pv-need-support'
    },
    '/does-pv-need-support': {
      next: '/pv-name-that-requires-support'
    },
    '/pv-name-that-requires-support': {
      next: '/pv-dob'
    },
    '/pv-dob': {
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
