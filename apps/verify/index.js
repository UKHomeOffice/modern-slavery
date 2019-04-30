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
    '/designated-organisations': {
      backLink: false,
    },
    '/support-organisations': {
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
    }
  }
};
