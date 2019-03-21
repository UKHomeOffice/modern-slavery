'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const supportingDocuments = require('./behaviours/supporting-documents');
const supportingDocumentsAddAnother = require('./behaviours/supporting-documents-add-another');
const typesOfExploitation = require('./behaviours/types-of-exploitation');

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
        'local-authority-contacted-about-child-local-authority-first-name',
        'local-authority-contacted-about-child-local-authority-last-name',
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
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ],
      forks: [{
        target: '/pv-name',
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
      next: '/does-pv-need-support'
    },
    '/refuse-nrm': {
      fields: ['refuse-nrm'],
      next: '/pv-gender'
    },
    '/does-pv-need-support': {
      fields: ['does-pv-need-support'],
      next: '/pv-name'
    },
    '/pv-name': {
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname',
      ],
      forks: [{
        target: '/pv-contact-details',
        condition: (req) => {
          return (req.sessionModel.get('pv-want-to-submit-nrm')) === 'no';
        }
      }],
      next: '/pv-dob'
    },
    '/pv-dob': {
      fields: ['pv-dob'],
      next: '/pv-gender'
    },
    '/pv-gender': {
      fields: ['pv-gender'],
      forks: [{
        target: '/pv-nationality',
        condition: (req) => {
          return (req.sessionModel.get('pv-want-to-submit-nrm')) === 'no';
        }
      }],
      next: '/does-pv-have-children'
    },
    '/does-pv-have-children': {
      fields: ['does-pv-have-children', 'does-pv-have-children-yes-amount'],
      next: '/pv-nationality'
    },
    '/pv-nationality': {
      fields: ['pv-nationality', 'pv-nationality-second'],
      forks: [{
        target: '/co-operate-with-police',
        condition: (req) => {
          return ((req.sessionModel.get('pv-want-to-submit-nrm')) === 'no');
        }
      }],
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
      next: '/who-contact'
    },
    '/who-contact': {
      fields: ['who-contact'],
      forks: [{
        target: '/someone-else',
        condition: {
          field: 'who-contact',
          value: 'someone-else'
        }
      }],
      next: '/pv-contact-details'
    },
    '/someone-else': {
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
      forks: [{
        target: '/co-operate-with-police',
        condition: (req) => {
          return (req.sessionModel.get('does-pv-need-support')) === 'no';
        }
      }],
      next: '/pv-phone-number'
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
      forks: [
        {
          target: '/co-operate-with-police',
          condition: (req) => {
            return (req.sessionModel.get('does-pv-need-support')) === 'no';
          }
        },
        {
          target: '/confirm',
          condition: (req) => {
            return (
              ((req.sessionModel.get('pv-want-to-submit-nrm')) === 'no') &&
              ((req.sessionModel.get('does-pv-need-support')) !== 'yes')
              );
          }
        },
      ],
      next: '/pv-phone-number'
    },
    '/pv-phone-number': {
      fields: ['pv-phone-number', 'pv-phone-number-yes'],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      forks: [
        {
          target: '/confirm',
          condition: (req) => {
            return (
              ((req.sessionModel.get('pv-want-to-submit-nrm')) === 'no') &&
              (req.sessionModel.get('co-operate-with-police') === 'no')
              );
          }
        },
        {
          target: '/pv-name',
          condition: (req) => {
            return (
              ((req.sessionModel.get('pv-want-to-submit-nrm')) === 'no') &&
              (req.sessionModel.get('co-operate-with-police') === 'yes')
              );
          }
        },
      ],
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
        'fr-details-first-name',
        'fr-details-last-name',
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
       behaviours: ['complete'],
       next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
