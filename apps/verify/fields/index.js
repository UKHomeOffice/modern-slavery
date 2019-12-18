'use strict';

const organisations = require('ms-organisations');

const { isValidEmail } = require('../../common/validators.js');

module.exports = {
  'user-organisation': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.user-organisation.options.null'
    }].concat(organisations)
  },
  'user-email': {
    mixin: 'input-text',
    validate: ['required', isValidEmail, {'type': 'maxlength', 'arguments': [15000]}],
  },
  'confirm-email': {
    mixin: 'input-text',
    validate: ['required', isValidEmail, {'type': 'maxlength', 'arguments': [15000]}]
  },
};
