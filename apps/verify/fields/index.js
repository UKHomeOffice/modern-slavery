'use strict';

const { isValidEmail } = require('../../common/validators.js');

module.exports = {
  'user-email': {
    mixin: 'input-text',
    validate: ['required', isValidEmail, {type: 'maxlength', arguments: [15000]}]
  }
};
