'use strict';

const checkEmailToken = require('./behaviours/check-email-token');
const supportingDocuments = require('./behaviours/supporting-documents');
const supportingDocumentsAddAnother = require('./behaviours/supporting-documents-add-another');
const typesOfExploitation = require('./behaviours/types-of-exploitation.js');
const saveMissingData = require('./behaviours/save-missing-data');
const transferMissingData = require('./behaviours/transfer-missing-data');
const hideAndShowSummaryFields = require('./behaviours/hide-and-show-summary-fields');
const getPageCustomBackLink = require('./behaviours/back-links/get-page-back-link');
const getPageCustomNextStep = require('./behaviours/next-steps/get-page-next-step');
const ResetOnChange = require('./behaviours/reset-on-change');
const formatAnswers = require('./behaviours/format-answers');
const saveFormSession = require('./behaviours/save-form-session');
const resumeSession = require('./behaviours/resume-form-session');
const continueReport = require('./behaviours/continue-report');
const deleteFormSession = require('./behaviours/delete-form-session');
const saveAndExit = require('./behaviours/save-and-exit');
const confirmation = require('./behaviours/confirmation');
const deleteOnChange = require('./behaviours/delete-on-change');
const fullWidth = require('./behaviours/full-width');
const whereExploitationHappenedUk = require('./behaviours/where-exploitation-happened-uk');
const Submission = require('./behaviours/casework-submission');
const areYouSure = require('./behaviours/are-you-sure');
const submission = Submission({
  prepare: require('./models/submission')
});

module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
  pages: {
    '/token-invalid': 'token-invalid'
  },
  steps: {
    '/start': {
      behaviours: [
        checkEmailToken
      ],
      next: '/reports'
    },
    '/reports': {
      backLink: false,
      behaviours: [
        fullWidth,
        resumeSession
      ],
      next: '/reference'
    },
    '/are-you-sure': {
      backLink: false,
      behaviours: [
        areYouSure
      ]
    },
    '/reference': {
      behaviours: [
        saveFormSession
      ],
      fields: ['reference'],
      next: '/organisation'
    },
    '/organisation': {
      behaviours: [
        saveFormSession
      ],
      fields: ['user-organisation'],
      next: '/fr-location'
    },
    '/fr-location': {
      behaviours: [
        saveFormSession
      ],
      fields: ['fr-location'],
      next: '/pv-under-age'
    },
    '/pv-under-age': {
      behaviours: [
        getPageCustomNextStep('pv-under-age'),
        ResetOnChange({
          currentField: 'pv-under-age',
          storeFields: [
            'fr-location',
            'user-organisation',
            'user-email',
            'reference',
            'id'
          ]
        }),
        saveFormSession
      ],
      fields: ['pv-under-age'],
    },
    '/local-authority-contacted-about-child': {
      behaviours: [
        getPageCustomBackLink('local-authority-contacted-about-child'),
        saveFormSession
      ],
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
      behaviours: [
        getPageCustomBackLink('pv-under-age-at-time-of-exploitation'),
        saveFormSession
      ],
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-happened'
    },
    '/what-happened': {
      behaviours: [
        getPageCustomBackLink('what-happened'),
        saveFormSession
      ],
      fields: ['what-happened'],
      next: '/where-exploitation-happened'
    },
    '/where-exploitation-happened': {
      behaviours: [
        getPageCustomBackLink('where-exploitation-happened'),
        getPageCustomNextStep('where-exploitation-happened'),
        ResetOnChange({
          currentField: 'where-exploitation-happened',
          storeFields: [
            'fr-location',
            'user-organisation',
            'user-email',
            'pv-under-age',
            'local-authority-contacted-about-child-local-authority-name',
            'local-authority-contacted-about-child-local-authority-phone',
            'local-authority-contacted-about-child-local-authority-email',
            'local-authority-contacted-about-child-local-authority-first-name',
            'local-authority-contacted-about-child-local-authority-last-name',
            'pv-under-age-at-time-of-exploitation',
            'what-happened',
            'reference',
            'id'
          ],
        }),
        saveFormSession
      ],
      fields: [
        'where-exploitation-happened'
      ],
    },
    '/where-exploitation-happened-uk': {
      behaviours: [
        getPageCustomBackLink('where-exploitation-happened-uk'),
        getPageCustomNextStep('where-exploitation-happened-uk'),
        whereExploitationHappenedUk,
        saveFormSession
      ],
      fields: [
        'where-exploitation-happened-uk-city-1',
        'where-exploitation-happened-uk-city-2',
        'where-exploitation-happened-uk-city-3',
        'where-exploitation-happened-uk-city-4',
        'where-exploitation-happened-uk-city-5',
        'where-exploitation-happened-uk-city-6',
        'where-exploitation-happened-uk-city-7',
        'where-exploitation-happened-uk-city-8',
        'where-exploitation-happened-uk-city-9',
        'where-exploitation-happened-uk-city-10',
        'where-exploitation-happened-other-uk-other-location',
      ],
    },
    '/where-exploitation-happened-overseas': {
      behaviours: [
        getPageCustomBackLink('where-exploitation-happened-overseas'),
        getPageCustomNextStep('where-exploitation-happened-overseas'),
        saveFormSession
      ],
      fields: [
        'where-exploitation-happened-overseas-country-1',
        'where-exploitation-happened-overseas-country-2',
        'where-exploitation-happened-overseas-country-3',
        'where-exploitation-happened-overseas-country-4',
        'where-exploitation-happened-overseas-country-5',
        'where-exploitation-happened-overseas-country-6',
        'where-exploitation-happened-overseas-country-7',
        'where-exploitation-happened-overseas-country-8',
        'where-exploitation-happened-overseas-country-9',
        'where-exploitation-happened-overseas-country-10',
        'where-exploitation-happened-other-overseas-other-location',
      ],
    },
    '/current-pv-location': {
      behaviours: [
        getPageCustomBackLink('current-pv-location'),
        saveFormSession
      ],
      fields: [
        'current-pv-location-uk-city',
        'current-pv-location-uk-region',
      ],
      next: '/who-exploited-pv'
    },
    '/who-exploited-pv': {
      behaviours: [
        getPageCustomBackLink('default'),
        saveFormSession
      ],
      fields: ['who-exploited-pv'],
      next: '/types-of-exploitation'
    },
    '/types-of-exploitation': {
      behaviours: [
        typesOfExploitation,
        getPageCustomBackLink('default'),
        saveFormSession
      ],
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
        'other-exploitation-details',
      ],
      next: '/any-other-pvs'
    },
    '/any-other-pvs': {
      behaviours: [
        getPageCustomBackLink('default'),
        saveFormSession
      ],
      fields: ['any-other-pvs'],
      next: '/reported-to-police'
    },
    '/reported-to-police': {
      behaviours: [
        getPageCustomBackLink('reported-to-police'),
        getPageCustomNextStep('reported-to-police'),
        saveFormSession
      ],
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference',
      ]
    },
    '/pv-want-to-submit-nrm': {
      behaviours: [
        getPageCustomBackLink('pv-want-to-submit-nrm'),
        getPageCustomNextStep('pv-want-to-submit-nrm'),
        ResetOnChange({
          currentField: 'pv-want-to-submit-nrm',
          storeFields: [
            'fr-location',
            'user-organisation',
            'user-email',
            'pv-under-age',
            'pv-under-age-at-time-of-exploitation',
            'what-happened',
            'where-exploitation-happened',
            'where-exploitation-happened-uk-city',
            'where-exploitation-happened-uk-region',
            'where-exploitation-happened-other-uk-other-location',
            'where-exploitation-happened-overseas-country',
            'where-exploitation-happened-other-overseas-other-location',
            'current-pv-location-uk-city',
            'current-pv-location-uk-region',
            'who-exploited-pv',
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
            'other-exploitation-details',
            'any-other-pvs',
            'reported-to-police',
            'reported-to-police-police-forces',
            'reported-to-police-crime-reference',
            'reference',
            'id'
          ]
        }),
        saveFormSession
      ],
      fields: ['pv-want-to-submit-nrm'],
      continueOnEdit: true,
    },
    '/refuse-nrm': {
      behaviours: [
        getPageCustomBackLink('refuse-nrm'),
        saveFormSession
      ],
      fields: ['refuse-nrm'],
      next: '/pv-gender'
    },
    '/does-pv-need-support': {
      behaviours: [
        getPageCustomBackLink('does-pv-need-support'),
        getPageCustomNextStep('does-pv-need-support'),
        ResetOnChange({
          currentField: 'does-pv-need-support',
          storeFields: [
            'fr-location',
            'user-organisation',
            'user-email',
            'pv-under-age',
            'pv-under-age-at-time-of-exploitation',
            'what-happened',
            'where-exploitation-happened',
            'where-exploitation-happened-uk-city',
            'where-exploitation-happened-uk-region',
            'where-exploitation-happened-other-uk-other-location',
            'where-exploitation-happened-overseas-country',
            'where-exploitation-happened-other-overseas-other-location',
            'current-pv-location-uk-city',
            'current-pv-location-uk-region',
            'who-exploited-pv',
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
            'other-exploitation-details',
            'any-other-pvs',
            'reported-to-police',
            'reported-to-police-police-forces',
            'reported-to-police-crime-reference',
            'pv-want-to-submit-nrm',
            'reference',
            'id'
          ],
        }),
        saveFormSession
      ],
      fields: ['does-pv-need-support'],
      continueOnEdit: true,
    },
    '/support-organisations': {
      backLink: false,
    },
    '/pv-name': {
      behaviours: [
        getPageCustomBackLink('pv-name'),
        getPageCustomNextStep('pv-name'),
        saveFormSession
      ],
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname',
      ]
    },
    '/pv-dob': {
      behaviours: [
        getPageCustomBackLink('pv-dob'),
        saveMissingData('pv-dob'),
        saveFormSession
      ],
      fields: ['pv-dob'],
      next: '/pv-gender'
    },
    '/pv-gender': {
      behaviours: [
        getPageCustomBackLink('pv-gender'),
        getPageCustomNextStep('pv-gender'),
        saveMissingData('pv-gender'),
        saveFormSession
      ],
      fields: ['pv-gender'],
    },
    '/does-pv-have-children': {
      behaviours: [
        getPageCustomBackLink('does-pv-have-children'),
        getPageCustomNextStep('does-pv-have-children'),
        saveMissingData([
          'does-pv-have-children',
          'does-pv-have-children-yes-amount',
        ]),
        saveFormSession
      ],
      fields: [
        'does-pv-have-children',
        'does-pv-have-children-yes-amount',
      ],
    },
    '/pv-nationality': {
      behaviours: [
        getPageCustomBackLink('pv-nationality'),
        getPageCustomNextStep('pv-nationality'),
        saveMissingData([
          'pv-nationality',
          'pv-nationality-second',
        ]),
        saveFormSession
      ],
      fields: [
        'pv-nationality',
        'pv-nationality-second',
      ],
      next: '/co-operate-with-police'
    },
    '/pv-interpreter-requirements': {
      behaviours: [
        getPageCustomBackLink('pv-interpreter-requirements'),
        saveMissingData([
          'pv-interpreter-requirements',
          'pv-interpreter-requirements-language',
        ]),
        saveFormSession
      ],
      fields: [
        'pv-interpreter-requirements',
        'pv-interpreter-requirements-language',
      ],
      next: '/pv-other-help-with-communication'
    },
    '/pv-other-help-with-communication': {
      behaviours: [
        saveMissingData([
          'pv-other-help-with-communication', 'pv-other-help-with-communication-aid',
        ]),
        getPageCustomBackLink('default'),
        saveFormSession
      ],
      fields: [
        'pv-other-help-with-communication',
        'pv-other-help-with-communication-aid',
      ],
      next: '/pv-ho-reference'
    },
    '/pv-ho-reference': {
      behaviours: [
        getPageCustomBackLink('pv-ho-reference'),
        getPageCustomNextStep('pv-ho-reference'),
        saveMissingData([
          'pv-ho-reference',
          'pv-ho-reference-type',
        ]),
        saveFormSession
      ],
      fields: [
        'pv-ho-reference',
        'pv-ho-reference-type',
      ],
    },
    '/who-contact': {
      behaviours: [
        getPageCustomBackLink('who-contact'),
        getPageCustomNextStep('who-contact'),
        saveMissingData('who-contact'),
        deleteOnChange({
          currentField: 'who-contact',
          deleteFields: [
            'pv-contact-details',
            'pv-contact-details-email-input',
            'pv-contact-details-email-check',
            'pv-contact-details-street',
            'pv-contact-details-town',
            'pv-contact-details-county',
            'pv-contact-details-postcode',
            'pv-contact-details-post-check',
            'someone-else',
            'someone-else-first-name',
            'someone-else-last-name',
            'someone-else-email-input',
            'someone-else-street',
            'someone-else-town',
            'someone-else-county',
            'someone-else-postcode',
            'someone-else-permission-check',
            'pv-phone-number',
            'pv-phone-number-yes',
            'co-operate-with-police',
            'fr-details-first-name',
            'fr-details-last-name',
            'fr-details-role',
            'fr-details-phone',
            'fr-alternative-contact',
          ],
        }),
        saveFormSession
      ],
      fields: ['who-contact'],
      continueOnEdit: true,
    },
    '/someone-else': {
      behaviours: [
        getPageCustomBackLink('someone-else'),
        getPageCustomNextStep('someone-else'),
        saveFormSession
      ],
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
      behaviours: [
        getPageCustomBackLink('pv-contact-details'),
        getPageCustomNextStep('pv-contact-details'),
        transferMissingData([
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
          'does-pv-have-children-yes-amount',
          'pv-nationality',
          'pv-nationality-second',
          'pv-ho-reference',
          'pv-ho-reference-type',
          'pv-interpreter-requirements',
          'pv-interpreter-requirements-language',
          'pv-other-help-with-communication',
          'pv-other-help-with-communication-aid',
          'who-contact',
          'pv-phone-number',
          'pv-phone-number-yes',
        ]),
        saveFormSession
      ],
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
        getPageCustomBackLink('pv-phone-number'),
        saveMissingData([
          'pv-phone-number',
          'pv-phone-number-yes',
        ]),
        saveFormSession
      ],
      fields: [
        'pv-phone-number',
        'pv-phone-number-yes',
      ],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      behaviours: [
        getPageCustomBackLink('co-operate-with-police'),
        getPageCustomNextStep('co-operate-with-police'),
        transferMissingData([
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
          'does-pv-have-children-yes-amount',
          'pv-nationality',
          'pv-nationality-second',
          'pv-ho-reference',
          'pv-ho-reference-type',
          'pv-interpreter-requirements',
          'pv-interpreter-requirements-language',
          'pv-other-help-with-communication',
          'pv-other-help-with-communication-aid',
          'pv-phone-number',
          'pv-phone-number-yes',
          'who-contact',
        ]),
        deleteOnChange({
          currentField: 'co-operate-with-police',
          deleteFields: [
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
            'fr-details-first-name',
            'fr-details-last-name',
            'fr-details-role',
            'fr-details-phone',
            'fr-alternative-contact',
          ],
          exceptions: [
            {
              field: 'pv-want-to-submit-nrm',
              value: 'yes',
              exemptFields: [
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
              ],
            },
          ],
        }),
        saveFormSession
      ],
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
      behaviours: [
        getPageCustomBackLink('fr-details'),
        saveFormSession
      ],
      fields: [
        'fr-details-first-name',
        'fr-details-last-name',
        'fr-details-role',
        'fr-details-phone',
      ],
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      behaviours: [
        getPageCustomBackLink('fr-alternative-contact'),
        getPageCustomNextStep('fr-alternative-contact'),
        transferMissingData([
          'pv-dob',
          'pv-gender',
          'does-pv-have-children',
          'does-pv-have-children-yes-amount',
          'pv-nationality',
          'pv-nationality-second',
          'pv-ho-reference',
          'pv-ho-reference-type',
          'pv-interpreter-requirements',
          'pv-interpreter-requirements-language',
          'pv-other-help-with-communication',
          'pv-other-help-with-communication-aid',
          'who-contact',
          'pv-phone-number',
          'pv-phone-number-yes'
        ]),
        saveFormSession
      ],
      fields: ['fr-alternative-contact'],
    },
    '/confirm': {
      behaviours: [
        require('hof').components.summary,
        formatAnswers,
        hideAndShowSummaryFields,
        getPageCustomBackLink('confirm'),
        fullWidth,
        submission,
        deleteFormSession,
        'complete'
      ],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false,
      behaviours: [
        confirmation,
      ],
    },
    '/continue-report': {
      backLink: false,
      behaviours: [
        require('hof').components.summary,
        formatAnswers,
        hideAndShowSummaryFields,
        fullWidth,
        continueReport
      ],
      next: '/reference'
    },
    '/save-and-exit': {
      backLink: false,
      behaviours: [
        saveAndExit
      ]
    }
  }
};
