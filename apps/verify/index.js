'use strict';
const emailLookupAndSend = require('./behaviours/email-lookup-sender');
const emailPasser = require('./behaviours/email-passer');

module.exports = {
  name: 'verify',
  pages: {
    '/email-not-recognised': 'email-not-recognised'
  },
  steps: {
    '/start': {
      next: '/who-do-you-work-for'
    },
    '/paper-version-download': {
      backLink: false,
    },
    '/designated-organisations': {
      backLink: false,
    },
    '/support-organisations': {
      backLink: false,
    },
    '/privacy': {
      backLink: false,
    },
    '/who-do-you-work-for': {
      fields: ['user-organisation', 'user-email'],
      next: '/confirm-email'
    },
    '/confirm-email': {
      fields: ['confirm-email'],
      behaviours: [emailPasser, emailLookupAndSend],
      next: '/check-inbox'
    },
    '/check-inbox': {
      behaviours: require('./behaviours/confirm-email-passer'),
    }
  }
};
