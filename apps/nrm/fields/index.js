'use strict';

const ukCitiesAndTowns = require('ms-uk-cities-and-towns');
const ukRegions = require('ms-uk-regions');
const countries = require('hof-util-countries')();
const ukPoliceForces = require('ms-uk-police-forces');
const dateComponent = require('hof-component-date');
const ukLocalAuthorities = require('ms-uk-local-authorities');

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
  'local-authority-contacted-about-child-local-authority-name': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.local-authority-contacted-about-child.options.null'
    }].concat(ukLocalAuthorities)
  },
  'local-authority-contacted-about-child-local-authority-phone': {
    mixin: 'input-text',
    validate: ['required']
  },
  'local-authority-contacted-about-child-local-authority-email': {
    mixin: 'input-text',
    validate: ['required', 'email']
  },
  'local-authority-contacted-about-child-local-authority-contact': {
    mixin: 'input-text',
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
    validation: 'at-least-one-option-selected',
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
      value: 'true',
      field: 'types-of-exploitation-other',
    }
  },
  'any-other-pvs': {
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
  'refuse-nrm': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [{
      attribute: 'rows',
      value: 3
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
  'pv-name-first-name': {
    mixin: 'input-text',
    validate: 'required',
  },
  'pv-name-last-name': {
    mixin: 'input-text',
    validate: 'required',
  },
  'pv-name-nickname': {
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
  'pv-other-help-with-communication': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-other-help-with-communication-aid-fieldset',
      child: 'partials/pv-other-help-with-communication-aid'
    }, {
      value: 'no',
    }]
  },
  'pv-other-help-with-communication-aid': {
    mixin: 'input-text',
  },
  'pv-ho-reference': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-ho-reference-type-fieldset',
      child: 'partials/pv-ho-reference-type'
    }, {
      value: 'no',
    }]
  },
  'pv-ho-reference-type': {
    mixin: 'input-text',
  },
  'pv-contact-details': {
    mixin: 'checkbox-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'email',
      toggle: 'pv-contact-details-email-input-fieldset',
      child: 'partials/pv-contact-details-email-input'
    }, {
      value: 'post',
      toggle: 'pv-contact-details-post-fieldset',
      child: 'partials/pv-contact-details-post'
    }]
  },
  'pv-contact-details-email-input': {
    mixin: 'input-text',
    validate: ['required', 'email'],
    dependent: {
      value: 'email',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-email-check': {
    mixin: 'checkbox',
    validate: 'required',
    dependent: {
      value: 'email',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-street': {
    mixin: 'input-text',
    dependent: {
      value: 'post',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-town': {
    mixin: 'input-text',
    dependent: {
      value: 'post',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-county': {
    mixin: 'input-text',
    dependent: {
      value: 'post',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-postcode': {
    mixin: 'input-text',
    dependent: {
      value: 'post',
      field: 'pv-contact-details',
    },
  },
  'pv-contact-details-post-check': {
    mixin: 'checkbox',
    validate: 'required',
    dependent: {
      value: 'post',
      field: 'pv-contact-details',
    },
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
  'pv-phone-number': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-phone-number-yes-fieldset',
      child: 'partials/pv-phone-number-yes'
     }, {
      value: 'no',
    }]
  },
  'pv-phone-number-yes': {
    mixin: 'input-text'
  },
  'co-operate-with-police': {
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
  'fr-details-name': {
    mixin: 'input-text',
    validate: 'required'
  },
  'fr-details-role': {
    mixin: 'input-text',
    validate: 'required'
  },
  'fr-details-phone': {
    mixin: 'input-text'
  },
  'fr-alternative-contact': {
    mixin: 'input-text',
    validate: ['email']
  }
};
