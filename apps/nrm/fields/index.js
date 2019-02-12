'use strict';

module.exports = {
  'select-location': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'england',
      'wales',
      'scotland',
      'northern-ireland'
    ]
  },
  'pv-under-age': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'yes-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'no',
      toggle: 'no-toggle-content',
      child: 'partials/panel'
    }, {
      value: 'not-sure',
      toggle: 'not-sure-toggle-content',
      child: 'partials/panel'
    }]
  },
  'pv-under-age-at-time-of-exploitation': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure',
    ]
  },
  'what-happened': {
    mixin: 'textarea',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 14
    }]
  },
  'supporting-documents-add': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'supporting-document-upload': {
    mixin: 'input-file',
    validate: 'required'
  },
  'supporting-document-description': {
    mixin: 'textarea'
  },
  'supporting-documents-add-another': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
};
