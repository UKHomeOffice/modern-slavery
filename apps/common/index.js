'use strict';

module.exports = {
  name: 'common',
  pages: {
    '/privacy': 'privacy',
    '/accessibility': 'accessibility',
    '/support-organisations': 'support-organisations',
    '/designated-organisations': 'designated-organisations',
    '/cookies': 'cookies',
    '/paper-version-download': 'paper-version-download'
  },
  steps: {
    '/start': {
      next: '/verify/who-do-you-work-for'
    },
    '/session-timeout': {},
    '/exit': {}
  }
};
