'use strict';

module.exports = {
    name: 'static-pages',
    steps: {
      '/start': {
        next: '/verify/who-do-you-work-for'
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
      }
    }
  };
