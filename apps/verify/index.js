'use strict';
const emailLookupAndSend = require('./behaviours/email-lookup-sender');

module.exports = {
  name: 'verify',
  baseUrl: '/verify',
  pages: {
    '/email-not-recognised': 'email-not-recognised'
  },
  steps: {
    '/who-do-you-work-for': {
      fields: ['user-organisation', 'user-email'],
      behaviours: [emailLookupAndSend],
      next: '/check-inbox'
    },
    '/check-inbox': {
      behaviours: require('./behaviours/confirm-email-passer')
    }
  }
};
