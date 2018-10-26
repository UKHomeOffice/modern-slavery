'use strict';

module.exports = {
  'user-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'confirm-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
};
