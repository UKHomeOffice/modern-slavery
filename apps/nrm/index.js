'use strict';

const automaticReferral = require('./behaviours/automatic-referral');
const setReferralState = require('./behaviours/set-referral-state');
const resetJourneyToSubmitNRM = require('./behaviours/reset-journey-to-submit-nrm');
const checkEmailToken = require('./behaviours/check-email-token');
const typesOfExploitation = require('./behaviours/types-of-exploitation.js');
const saveFormSession = require('./behaviours/save-form-session');
const resumeSession = require('./behaviours/resume-form-session');
const continueReport = require('./behaviours/continue-report');
const deleteFormSession = require('./behaviours/delete-form-session');
const saveAndExit = require('./behaviours/save-and-exit');
const SaveFile = require('./behaviours/save-file');
const RemoveFile = require('./behaviours/remove-file');
const LimitDocument = require('./behaviours/limit-documents');
const confirmation = require('./behaviours/confirmation');
const fullWidth = require('./behaviours/full-width');
const whereExploitationHappenedUk = require('./behaviours/where-exploitation-happened-uk');
const authoritiesCooperation = require('./behaviours/authorities-cooperation-edit');
const Submission = require('./behaviours/casework-submission');
const areYouSure = require('./behaviours/are-you-sure');
const modifySummaryPage = require('./behaviours/modify-summary-page');
const submission = Submission({
  prepare: require('./models/submission')
});

module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
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
      locals: { showSaveAndExit: true },
      fields: ['reference'],
      next: '/organisation'
    },
    '/organisation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['user-organisation'],
      next: '/fr-location'
    },
    '/fr-location': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['fr-location'],
      next: '/pv-under-age'
    },
    '/pv-under-age': {
      behaviours: [
        automaticReferral,
        resetJourneyToSubmitNRM,
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
      fields: [
        'local-authority-contacted-about-child-local-authority-name',
        'local-authority-contacted-about-child-local-authority-phone',
        'local-authority-contacted-about-child-local-authority-email',
        'local-authority-contacted-about-child-local-authority-first-name',
        'local-authority-contacted-about-child-local-authority-last-name'
      ],
      next: '/what-is-their-background'
    },
    '/pv-under-age-at-time-of-exploitation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['pv-under-age-at-time-of-exploitation'],
      next: '/what-is-their-background'
    },
    '/what-happened': {
      backLink: 'pv-under-age-at-time-of-exploitation',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['what-happened'],
      next: '/what-is-their-background'
    },
    '/what-is-their-background': {
      backLink: 'pv-under-age-at-time-of-exploitation',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['birthplace', 'family', 'education', 'employment-history'],
      next: '/potential-victim-exploitative-situation-multiple'
    },
    '/potential-victim-exploitative-situation-multiple': {
      behaviours: [
        saveFormSession
      ],
      forks: [{
        target: '/when-did-the-exploitation-take-place-multiple',
        condition: {
          field: 'potential-victim-exploitative-situation-multiple',
          value: 'yes'
        }
      }],
      locals: { showSaveAndExit: true },
      fields: ['potential-victim-exploitative-situation-multiple'],
      continueOnEdit: true,
      next: '/when-did-the-exploitation-take-place'
    },
    '/when-did-the-exploitation-take-place': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['when-did-the-exploitation-take-place'],
      next: '/how-did-the-exploitation-start'
    },
    '/when-did-the-exploitation-take-place-multiple': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['when-did-the-exploitation-take-place-multiple'],
      next: '/how-did-the-exploitation-start'
    },
    '/how-did-the-exploitation-start': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['how-did-the-exploitation-start'],
      next: '/were-they-taken-somewhere-by-their-exploiter'
    },
    '/were-they-taken-somewhere-by-their-exploiter': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'were-they-taken-somewhere-by-their-exploiter',
        'were-they-taken-somewhere-by-their-exploiter-journey-details'
      ],
      next: '/how-they-were-treated'
    },
    '/how-they-were-treated': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['what-were-they-required-to-do', 'how-they-were-treated', 'why-they-stayed'],
      next: '/how-why-did-they-leave-the-situation'
    },
    '/how-why-did-they-leave-the-situation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['how-why-did-they-leave-the-situation'],
      next: '/when-last-contact'
    },
    '/when-last-contact': {
      behaviours: [
        saveFormSession
      ],
      fields: ['when-last-contact'],
      next: '/details-last-contact',
      locals: { showSaveAndExit: true },
      continueOnEdit: true
    },
    '/details-last-contact': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['details-last-contact'],
      next: '/is-this-the-first-chance-to-report'
    },
    '/is-this-the-first-chance-to-report': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['is-this-the-first-chance-to-report'],
      forks: [{
        target: '/why-report-now',
        condition: {
          field: 'is-this-the-first-chance-to-report',
          value: 'no'
        }
      }],
      next: '/why-are-you-making-the-referral',
      continueOnEdit: true
    },
    '/why-report-now': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['why-report-now'],
      next: '/why-are-you-making-the-referral'
    },
    '/why-are-you-making-the-referral': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['why-are-you-making-the-referral'],
      next: '/where-how-interview-carried-out'
    },
    '/where-how-interview-carried-out': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['where-how-interview-carried-out'],
      next: '/are-others-involved'
    },
    '/are-others-involved': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['are-others-involved', 'are-others-involved-details'],
      next: '/evidence-of-dishonesty'
    },
    '/evidence-of-dishonesty': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['evidence-of-dishonesty', 'evidence-of-dishonesty-details'],
      next: '/where-exploitation-happened'
    },
    '/where-exploitation-happened': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
      fields: ['who-exploited-pv'],
      next: '/exploiters-location'
    },
    '/exploiters-location': {
      behaviours: saveFormSession,
      fields: ['exploiters-location'],
      forks: [{
        target: '/are-exploiters-in-the-uk',
        condition: {
          field: 'exploiters-location',
          value: 'yes'
        }
      }],
      locals: { showSaveAndExit: true },
      next: '/types-of-exploitation',
      continueOnEdit: true
    },
    '/are-exploiters-in-the-uk': {
      behaviours: saveFormSession,
      fields: ['are-exploiters-in-the-uk'],
      locals: { showSaveAndExit: true },
      next: '/exploiters-current-location-details',
      continueOnEdit: true
    },
    '/exploiters-current-location-details': {
      behaviours: saveFormSession,
      fields: ['exploiters-current-location-details'],
      locals: { showSaveAndExit: true },
      next: '/types-of-exploitation'
    },
    '/types-of-exploitation': {
      behaviours: [
        typesOfExploitation,
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
      fields: ['any-other-pvs'],
      next: '/future-exploitation'
    },
    '/future-exploitation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['future-exploitation-concerns'],
      forks: [{
        target: '/concerns-future-exploitation',
        condition: {
          field: 'future-exploitation-concerns',
          value: 'yes'
        }
      }],
      next: '/reported-to-police',
      continueOnEdit: true
    },
    '/concerns-future-exploitation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['future-exploitation-reasons'],
      next: '/reported-to-police'
    },
    '/reported-to-police': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'reported-to-police',
        'reported-to-police-police-forces',
        'reported-to-police-crime-reference'
      ],
      next: '/authorities-cooperation'
    },
    '/authorities-cooperation': {
      behaviours: [
        saveFormSession,
        authoritiesCooperation
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'authorities-cooperation',
        'authorities-cooperation-details'
      ],
      next: '/pv-want-to-submit-nrm'
    },
    '/pv-want-to-submit-nrm': {
      behaviours: [
        setReferralState,
        resetJourneyToSubmitNRM,
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['pv-want-to-submit-nrm'],
      next: '/does-pv-need-support',
      forks: [{
        target: '/pv-name-referral',
        condition: req => {
          return req.sessionModel.get('pv-want-to-submit-nrm') === 'yes' &&
            req.sessionModel.get('automatic-referral');
        }
      }, {
        target: '/refuse-nrm',
        condition: req => req.sessionModel.get('pv-want-to-submit-nrm') === 'no'
      }],
      continueOnEdit: true
    },
    '/refuse-nrm': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['refuse-nrm'],
      next: '/pv-gender-dtn'
    },
    '/pv-gender-dtn': {
      template: 'pv-gender',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['pv-gender'],
      next: '/pv-nationality-dtn'
    },
    '/pv-nationality-dtn': {
      template: 'pv-nationality',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'pv-nationality',
        'pv-nationality-second'
      ],
      forks: [{
        target: '/pv-name-dtn',
        condition: {
          field: 'authorities-cooperation',
          value: 'yes'
        }
      }],
      next: '/confirm'
    },
    '/pv-name-dtn': {
      template: 'pv-name',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname'
      ],
      next: '/pv-contact-details-dtn'
    },
    '/pv-contact-details-dtn': {
      template: 'pv-contact-details',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      next: '/confirm'
    },
    '/does-pv-need-support': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['does-pv-need-support'],
      next: '/pv-name-referral'
    },
    '/support-organisations': {
      backLink: false
    },
    '/pv-name-referral': {
      template: 'pv-name',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'pv-name-first-name',
        'pv-name-last-name',
        'pv-name-nickname'
      ],
      next: '/pv-dob'
    },
    '/pv-dob': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['pv-dob'],
      next: '/pv-gender-referral'
    },
    '/pv-gender-referral': {
      template: 'pv-gender',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['pv-gender'],
      next: '/does-pv-have-children'
    },
    '/does-pv-have-children': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'does-pv-have-children',
        'does-pv-have-children-yes-amount'
      ],
      next: '/pv-nationality-referral'
    },
    '/pv-nationality-referral': {
      template: 'pv-nationality',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'pv-nationality',
        'pv-nationality-second'
      ],
      next: '/pv-interpreter-requirements'
    },
    '/pv-interpreter-requirements': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
      fields: ['who-contact'],
      next: '/pv-contact-details-referral',
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
      locals: { showSaveAndExit: true },
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
        target: '/fr-details',
        condition: req => req.sessionModel.get('does-pv-need-support') === 'no'
      }]
    },
    '/pv-contact-details-referral': {
      template: 'pv-contact-details',
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
        target: '/fr-details',
        condition: req => req.sessionModel.get('does-pv-need-support') === 'no'
      }]
    },
    '/pv-phone-number': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: [
        'pv-phone-number',
        'pv-phone-number-yes'
      ],
      next: '/fr-details'
    },
    '/fr-details': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
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
      locals: { showSaveAndExit: true },
      fields: ['fr-alternative-contact'],
      next: '/upload-evidence'
    },
    '/upload-evidence': {
      behaviours: [ saveFormSession, SaveFile('upload-file'), RemoveFile, LimitDocument ],
      locals: { showSaveAndExit: true },
      fields: ['upload-file'],
      forks: [{
        target: '/what-evidence-you-will-submit',
        condition: req => req.sessionModel.get('files') && req.sessionModel.get('files').length > 0
      }],
      next: '/confirm',
      continueOnEdit: true
    },
    '/what-evidence-you-will-submit': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['what-evidence-you-will-submit'],
      next: '/confirm'
    },
    '/confirm': {
      sections: require('./sections/summary-data-sections'),
      behaviours: [
        require('hof').components.summary,
        modifySummaryPage,
        fullWidth,
        submission,
        deleteFormSession,
        'complete'
      ],
      locals: { showSaveAndExit: true },
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
      sections: require('./sections/summary-data-sections'),
      behaviours: [
        require('hof').components.summary,
        modifySummaryPage,
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
    },
    '/token-invalid': {
      clearSession: true
    },
    '/exit': {},
    '/more-than-one-exploitation-situation': {
      behaviours: [
        saveFormSession
      ],
      locals: { showSaveAndExit: true },
      fields: ['more-than-one-exploitation-situation'],
      next: '/how-did-the-exploitation-start'
    }
  }
};
