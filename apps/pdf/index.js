'use strict';

module.exports = {
  name: 'pdf',
  baseUrl: '/pdf',
  steps: {
    '/generate': {
      next: '/complete'
    },
    '/complete': {
    }
  }
};
