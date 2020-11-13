'use strict';

module.exports = {
    name: 'common',
    pages: {
      '/privacy': 'privacy',
      '/accessibility': 'accessibility',
      '/support-organisations': 'support-organisations',
      '/designated-organisations': 'designated-organisations'
    },
    steps: {
      '/start': {
        next: '/verify/who-do-you-work-for'
      },
      '/paper-version-download': {
        backLink: false,
      }
    }
  };
