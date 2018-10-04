'use strict';

module.exports = {
  name: 'nrm',
  baseUrl: '/nrm',
  steps: {
    '/start': {
      next: '/victim-age'
    },
    '/victim-age': {
    }
  }
};
