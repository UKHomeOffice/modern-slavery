'use strict';

const ukCitiesAndTowns = require('ms-uk-cities-and-towns');
const ukRegions = require('ms-uk-regions');
const countries = require('hof-util-countries')();
const ukPoliceForces = require('ms-uk-police-forces');
const dateComponent = require('hof-component-date');

module.exports = {
  'fr-location': {
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
      child: 'partials/pv-under-age-panel'
    }, {
      value: 'no',
      toggle: 'no-toggle-content',
      child: 'partials/pv-under-age-panel'
    }, {
      value: 'not-sure',
      toggle: 'not-sure-toggle-content',
      child: 'partials/pv-under-age-panel'
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
  'where-exploitation-happened': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'uk',
      toggle: 'uk-location-details-fieldset',
      child: 'partials/where-exploitation-happened-uk-panel'
    }, {
      value: 'overseas',
      toggle: 'overseas-location-details-fieldset',
      child: 'partials/where-exploitation-happened-overseas-panel'
    }]
  },
  'where-exploitation-happened-uk-city': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns),
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-uk-region': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-region.options.null'
    }].concat(ukRegions),
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-overseas-country': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    validate: 'required',
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countries),
    dependent: {
      value: 'overseas',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-other-uk-other-location': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }],
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened',
    }
  },
  'where-exploitation-happened-other-overseas-other-location': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }],
    dependent: {
      value: 'overseas',
      field: 'where-exploitation-happened',
    },
  },
  'current-pv-location-uk-city': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-locationd-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'current-pv-location-uk-region': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-location-uk-region.options.null'
    }].concat(ukRegions)
  },
  'who-exploited-pv': {
    mixin: 'textarea',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 5
    }]
  },
  'types-of-exploitation-forced-to-work': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-wages-taken': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-forced-to-commit-fraud': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-prostitution': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-child-exploitation': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-taken-somewhere': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-forced-to-commit-crime': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-organs-removed': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-unpaid-household-work': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-other': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    },
    toggle: 'other-exploitation-fieldset',
    child: 'partials/other-exploitation-fieldset'
  },
  'other-exploitation-details': {
    mixin: 'textarea',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 4
    }],
    dependent: {
      value: 'other',
      field: 'types-of-exploitation-other',
    }
  },
  'any-other-pvs': {
    mixin: 'radio-group',
    options: [
      'yes',
      'no',
      'not-sure',
    ]
  },
  'reported-to-police': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'yes-crime-reference-fieldset',
      child: 'partials/reported-to-police-yes'
    }, {
      value: 'no',
    }]
  },
  'reported-to-police-police-forces': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.reported-to-police-police-forces.options.null'
    }].concat(ukPoliceForces),
    dependent: {
      value: 'yes',
      field: 'reported-to-police',
    }
  },
  'reported-to-police-crime-reference': {
    mixin: 'input-text',
    dependent: {
      value: 'yes',
      field: 'reported-to-police',
    }
  },
  'pv-want-to-submit-nrm': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes'
    }, {
      value: 'no',
      toggle: 'pv-want-to-submit-nrm-no-fieldset',
      child: 'partials/pv-want-to-submit-nrm-no'
    }]
  },
  'does-pv-need-support': {
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
  'pv-name-that-requires-support-first-name': {
    mixin: 'input-text',
    validate: 'required',
  },
  'pv-name-that-requires-support-last-name': {
    mixin: 'input-text',
    validate: 'required',
  },
  'pv-name-that-requires-support-nickname': {
    mixin: 'input-text',
  },
  'pv-dob': dateComponent('pv-dob', {
    labelClassName: 'visuallyhidden',
    validate: ['date', 'before', {type: 'after', arguments: '1900-01-01'}],
  }),
  'pv-gender': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'female',
      'male',
      'unknown'
    ]
  },
  'does-pv-have-children': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'does-pv-have-children-yes-fieldset',
      child: 'partials/does-pv-have-children-yes-amount'
    }, {
      value: 'no',
    }]
  },
  'does-pv-have-children-yes-amount': {
    mixin: 'input-text',
    validate: 'numeric',
    dependent: {
      value: 'yes',
      field: 'does-pv-have-children',
    }
  },
  'pv-nationality': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality.options.null'
    }].concat(countries)
  },
  'pv-nationality-second': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality-second.options.null'
    }].concat(countries)
  },
  'pv-interpreter-requirements': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-interpreter-requirements-language-fieldset',
      child: 'partials/pv-interpreter-requirements-language'
    }, {
      value: 'no',
    }]
  },
  'pv-interpreter-requirements-language': {
    mixin: 'input-text',
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
