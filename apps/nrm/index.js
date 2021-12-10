'use strict';

const automaticReferral = require('./behaviours/automatic-referral');
const setReferralState = require('./behaviours/set-referral-state');
const checkEmailToken = require('./behaviours/check-email-token');
const typesOfExploitation = require('./behaviours/types-of-exploitation.js');
const saveMissingData = require('./behaviours/save-missing-data');
const transferMissingData = require('./behaviours/transfer-missing-data');
const hideAndShowSummaryFields = require('./behaviours/hide-and-show-summary-fields');
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
      ],
      next: '/reports'
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
        setReferralState,
        saveFormSession
      ],
      fields: ['pv-under-age'],
      next: '/local-authority-contacted-about-child',
      forks: [{
        target: '/pv-under-age-at-time-of-exploitation',
        condition: {
          field: 'pv-under-age',
          value: 'no'
        }
      }],
      continueOnEdit: true
    },
    '/local-authority-contacted-about-child': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'local-authority-contacted-about-child-local-authority-name',
        'local-authority-contacted-about-child-local-authority-phone',
        'local-authority-contacted-about-child-local-authority-email',
        'local-authority-contacted-about-child-local-authority-first-name',
        'local-authority-contacted-about-child-local-authority-last-name'
      ],
      next: '/what-happened'
    },
    '/pv-under-age-at-time-of-exploitation': {
      behaviours: [
        saveFormSession
      ],
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-happened'
    },
    '/what-happened': {
      behaviours: [
        saveFormSession
      ],
      fields: ['what-happened'],
      next: '/where-exploitation-happened'
    },
    '/where-exploitation-happened': {
      behaviours: [
        saveFormSession
      ],
      fields: ['where-exploitation-happened'],
      next: '/where-exploitation-happened-uk',
      forks: [{
        target: '/where-exploitation-happened-overseas',
        condition: {
          field: 'where-exploitation-happened',
          value: 'overseas'
        }
      }],
      continueOnEdit: true
    },
    '/where-exploitation-happened-uk': {
      behaviours: [
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
        'where-exploitation-happened-other-uk-other-location'
      ],
      next: '/current-pv-location',
      forks: [{
        target: '/where-exploitation-happened-overseas',
        condition: req => req.sessionModel.get('where-exploitation-happened') === 'uk-and-overseas'
      }]
    },
    '/where-exploitation-happened-overseas': {
      behaviours: [
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
        'where-exploitation-happened-other-overseas-other-location'
      ],
      next: '/current-pv-location'
    },
    '/current-pv-location': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'current-pv-location-uk-city',
        'current-pv-location-uk-region'
      ],
      next: '/who-exploited-pv'
    },
    '/who-exploited-pv': {
      behaviours: [
        saveFormSession
      ],
      fields: ['who-exploited-pv'],
      next: '/types-of-exploitation'
    },
    '/types-of-exploitation': {
      behaviours: [
        typesOfExploitation,
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
        'other-exploitation-details'
      ],
      next: '/any-other-pvs'
    },
    '/any-other-pvs': {
      behaviours: [
        saveFormSession
      ],
      fields: ['any-other-pvs'],
      next: '/reported-to-police'
    },
    '/reported-to-police': {
      behaviours: [
        automaticReferral,
        saveFormSession
      ],
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ],
      next: '/pv-want-to-submit-nrm',
      forks: [{
        target: '/pv-name',
        condition: req => req.sessionModel.get('automatic-referral')
      }]
    },
    '/pv-want-to-submit-nrm': {
      behaviours: [
        saveFormSession
      ],
      fields: ['pv-want-to-submit-nrm'],
      next: '/does-pv-need-support',
      forks: [{
        target: '/refuse-nrm',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }],
      continueOnEdit: true
    },
    '/refuse-nrm': {
      behaviours: [
        saveFormSession
      ],
      fields: ['refuse-nrm'],
      next: '/pv-gender'
    },
    '/does-pv-need-support': {
      behaviours: [
        saveFormSession
      ],
      fields: ['does-pv-need-support'],
      next: '/pv-name'
    },
    '/support-organisations': {
      backLink: false
    },
    '/pv-name': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname'
      ],
      next: '/pv-dob',
      forks: [{
        target: '/pv-contact-details',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }]
    },
    '/pv-dob': {
      behaviours: [
        saveFormSession
      ],
      fields: ['pv-dob'],
      next: '/pv-gender'
    },
    '/pv-gender': {
      behaviours: [
        saveFormSession
      ],
      fields: ['pv-gender'],
      next: '/does-pv-have-children',
      forks: [{
        target: '/pv-nationality',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }]
    },
    '/does-pv-have-children': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'does-pv-have-children',
        'does-pv-have-children-yes-amount'
      ],
      next: '/pv-nationality'
    },
    '/pv-nationality': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-nationality',
        'pv-nationality-second'
      ],
      next: '/pv-interpreter-requirements',
      forks: [{
        target: '/co-operate-with-police',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }]
    },
    '/pv-interpreter-requirements': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-interpreter-requirements',
        'pv-interpreter-requirements-language'
      ],
      next: '/pv-other-help-with-communication'
    },
    '/pv-other-help-with-communication': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-other-help-with-communication',
        'pv-other-help-with-communication-aid'
      ],
      next: '/pv-ho-reference'
    },
    '/pv-ho-reference': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-ho-reference',
        'pv-ho-reference-type'
      ],
      next: '/who-contact',
      forks: [{
        target: '/fr-details',
        condition: req => req.sessionModel.get('pv-under-age') !== 'no'
      }]
    },
    '/who-contact': {
      behaviours: [
        saveFormSession
      ],
      fields: ['who-contact'],
      next: '/pv-contact-details',
      forks: [{
        target: '/someone-else',
        condition: req => req.sessionModel.get('who-contact') === 'someone-else'
      }],
      continueOnEdit: true
    },
    '/someone-else': {
      behaviours: [
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
        'someone-else-permission-check'
      ],
      next: '/pv-phone-number',
      forks: [{
        target: '/co-operate-with-police',
        condition: req => req.sessionModel.get('does-pv-need-support') === 'no'
      }]
    },
    '/pv-contact-details': {
      behaviours: [
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
        'pv-contact-details-post-check'
      ],
      next: '/pv-phone-number',
      forks: [{
        target: '/confirm',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }, {
        target: '/co-operate-with-police',
        condition: req => {
          return req.sessionModel.get('does-pv-need-support') === 'no' &&
            req.sessionModel.get('pv-want-to-submit-nrm') === 'yes'
        }
      }]
    },
    '/pv-phone-number': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'pv-phone-number',
        'pv-phone-number-yes'
      ],
      next: '/co-operate-with-police'
    },
    '/co-operate-with-police': {
      fields: ['co-operate-with-police'],
      behaviours: [
        saveFormSession
      ],
      next: '/pv-name',
      forks: [{
        target: '/fr-details',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'yes'
      }, {
        target: '/confirm',
        condition: req => {
          return req.sessionModel.get('co-operate-with-police') === 'no' &&
            req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
        }
      }]
    },
    '/fr-details': {
      behaviours: [
        saveFormSession
      ],
      fields: [
        'fr-details-first-name',
        'fr-details-last-name',
        'fr-details-role',
        'fr-details-phone'
      ],
      next: '/fr-alternative-contact'
    },
    '/fr-alternative-contact': {
      behaviours: [
        saveFormSession
      ],
      fields: ['fr-alternative-contact'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [
        require('hof').components.summary,
        formatAnswers,
        hideAndShowSummaryFields,
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
        confirmation
      ]
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
