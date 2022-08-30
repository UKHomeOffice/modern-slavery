'use strict';

const { isValidEmail } = require('../../common/validators.js');

module.exports = {
  'user-email': {
    mixin: 'input-text',
    className: ['govuk-input govuk-form-control govuk-form-control-3-4'],
    validate: ['required', isValidEmail, {type: 'maxlength', arguments: [15000]}]
  },
  'confirm-email': {
    mixin: 'input-text',
    validate: ['required', isValidEmail, {type: 'maxlength', arguments: [15000]}]
  }
};
