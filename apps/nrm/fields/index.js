'use strict';

const _ = require('lodash');
const ukCitiesAndTowns = require('../../../ms-lists/ms_uk_cities_and_towns');
const ukRegions = require('../../../ms-lists/ms_uk_regions');
const countriesExcludingUK = require('../util/filtered-countries').countriesExcludingUK;
const ukPoliceForces = require('../../../ms-lists/ms_uk_police_forces');
const dateComponent = require('hof').components.date;
const ukLocalAuthorities = require('../../../ms-lists/ms_uk_local_authorities');
const msNationalities = require('../../../ms-lists/ms_nationalities');
const organisations = require('../../../ms-lists/ms_organisations');
const path = require('path');

module.exports = {
  reference: {
    mixin: 'input-text',
    validate: ['required']
  },
  'user-organisation': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.user-organisation.options.none_selected'
    }].concat(_.sortBy(organisations, o => o.label))
  },
  'fr-location': {
    mixin: 'radio-group',
    validate: ['required'],
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
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'local-authority-contacted-about-child-local-authority-name': {
    mixin: 'select',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.local-authority-contacted-about-child.options.null'
    }].concat(ukLocalAuthorities)
  },
  'local-authority-contacted-about-child-local-authority-phone': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'local-authority-contacted-about-child-local-authority-email': {
    mixin: 'input-text',
    className: ['form-control form-control-3-4'],
    validate: ['required', 'email', {type: 'maxlength', arguments: [15000]}]
  },
  'local-authority-contacted-about-child-local-authority-first-name': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}]
  },
  'local-authority-contacted-about-child-local-authority-last-name': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}]
  },
  'pv-under-age-at-time-of-exploitation': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  // TODO- delete later when feature is merged
  'what-happened': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'education':{
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'employment-history': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 7
      }
    ]
  },
  'where-exploitation-happened': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'uk',
      'overseas',
      'uk-and-overseas'
    ]
  },
  'where-exploitation-happened-uk-city-1': {
    mixin: 'select',
    validate: 'required',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-2': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-3': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-4': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-5': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-6': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-7': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns),
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened'
    }
  },
  'where-exploitation-happened-uk-city-8': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-9': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-uk-city-10': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'where-exploitation-happened-other-uk-other-location': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ],
    dependent: {
      value: 'uk',
      field: 'where-exploitation-happened'
    }
  },
  'where-exploitation-happened-overseas-country-1': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-1'],
    validate: 'required',
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-2': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-2'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-3': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-3'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-4': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-4'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-5': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-5'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-6': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-6'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-7': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-7'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-8': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-8'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-9': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-9'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-overseas-country-10': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden', 'country-10'],
    options: [{
      value: '',
      label: 'fields.where-exploitation-happened-overseas-country.options.null'
    }].concat(countriesExcludingUK)
  },
  'where-exploitation-happened-other-overseas-other-location': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ],
    dependent: {
      value: 'overseas',
      field: 'where-exploitation-happened'
    }
  },
  'current-pv-location-uk-city': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-locationd-uk-city.options.null'
    }].concat(ukCitiesAndTowns)
  },
  'current-pv-location-uk-region': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.current-pv-location-uk-region.options.null'
    }].concat(ukRegions)
  },
  'who-exploited-pv': {
    mixin: 'textarea',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 5
      }
    ]
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
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 4
      }
    ],
    dependent: {
      value: 'true',
      field: 'types-of-exploitation-other'
    }
  },
  'any-other-pvs': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no',
      'not-sure'
    ]
  },
  'reported-to-police': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'yes-crime-reference-fieldset',
      child: 'partials/reported-to-police-yes'
    }, {
      value: 'no'
    }]
  },
  'reported-to-police-police-forces': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.reported-to-police-police-forces.options.null'
    }].concat(ukPoliceForces),
    dependent: {
      value: 'yes',
      field: 'reported-to-police'
    }
  },
  'reported-to-police-crime-reference': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'reported-to-police'
    }
  },
  'pv-want-to-submit-nrm': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes'
    }, {
      value: 'no'
    }]
  },
  'refuse-nrm': {
    mixin: 'textarea',
    validate: [{type: 'maxlength', arguments: [15000]}],
    legend: {
      className: 'visuallyhidden'
    },
    className: 'govuk-textarea',
    attributes: [
      {
        attribute: 'rows',
        value: 3
      }
    ]
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
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'pv-name-last-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'pv-name-nickname': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}]
  },
  'pv-dob': dateComponent('pv-dob', {
    labelClassName: 'visuallyhidden',
    validate: ['date', 'before', {type: 'after', arguments: '1900-01-01'}],
    template: path.resolve(__dirname, '../views/date.html')
  }),
  'pv-gender': {
    mixin: 'radio-group',
    validate: ['required'],
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
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'does-pv-have-children-yes-fieldset',
      child: 'partials/does-pv-have-children-yes-amount'
    }, {
      value: 'no'
    }]
  },
  'does-pv-have-children-yes-amount': {
    mixin: 'input-text',
    validate: ['required', 'numeric', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'does-pv-have-children'
    }
  },
  'pv-nationality': {
    mixin: 'select',
    validate: ['required'],
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality.options.null'
    }].concat(msNationalities)
  },
  'pv-nationality-second': {
    mixin: 'select',
    className: ['typeahead', 'js-hidden'],
    options: [{
      value: '',
      label: 'fields.pv-nationality-second.options.null'
    }].concat(msNationalities)
  },
  'pv-interpreter-requirements': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-interpreter-requirements-language-fieldset',
      child: 'partials/pv-interpreter-requirements-language'
    }, {
      value: 'no'
    }]
  },
  'pv-interpreter-requirements-language': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'pv-interpreter-requirements'
    }
  },
  'pv-other-help-with-communication': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-other-help-with-communication-aid-fieldset',
      child: 'partials/pv-other-help-with-communication-aid'
    }, {
      value: 'no'
    }]
  },
  'pv-other-help-with-communication-aid': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'pv-other-help-with-communication'
    }
  },
  'pv-ho-reference': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-ho-reference-type-fieldset',
      child: 'partials/pv-ho-reference-type'
    }, {
      value: 'no'
    }]
  },
  'pv-ho-reference-type': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'pv-ho-reference'
    }
  },
  'who-contact': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'potential-victim',
      'someone-else'
    ]
  },
  'pv-contact-details': {
    mixin: 'checkbox-group',
    validate: ['required'],
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
    className: ['form-control form-control-3-4'],
    validate: ['required', 'email', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'email',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-email-check': {
    mixin: 'checkbox',
    validate: ['required'],
    dependent: {
      value: 'email',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-street': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-town': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-county': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-postcode': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'pv-contact-details-post-check': {
    mixin: 'checkbox',
    validate: ['required'],
    dependent: {
      value: 'post',
      field: 'pv-contact-details'
    }
  },
  'someone-else': {
    mixin: 'checkbox-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'email',
      toggle: 'someone-else-email-input-fieldset',
      child: 'partials/someone-else-email-input'
    }, {
      value: 'post',
      toggle: 'someone-else-post-fieldset',
      child: 'partials/someone-else-post'
    }]
  },
  'someone-else-first-name': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}]
  },
  'someone-else-last-name': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}]
  },
  'someone-else-email-input': {
    mixin: 'input-text',
    className: ['form-control form-control-3-4'],
    validate: ['required', 'email', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'email',
      field: 'someone-else'
    }
  },
  'someone-else-street': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-town': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-county': {
    mixin: 'input-text',
    validate: [{type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-postcode': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'post',
      field: 'someone-else'
    }
  },
  'someone-else-permission-check': {
    mixin: 'checkbox',
    validate: ['required']
  },
  'pv-phone-number': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'pv-phone-number-yes-fieldset',
      child: 'partials/pv-phone-number-yes'
    }, {
      value: 'no'
    }]
  },
  'pv-phone-number-yes': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}],
    dependent: {
      value: 'yes',
      field: 'pv-phone-number'
    }
  },
  'co-operate-with-police': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'fr-details-first-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'fr-details-last-name': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'fr-details-role': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'fr-details-phone': {
    mixin: 'input-text',
    validate: ['required', {type: 'maxlength', arguments: [15000]}]
  },
  'fr-alternative-contact': {
    mixin: 'input-text',
    className: ['form-control form-control-3-4'],
    validate: ['email', {type: 'maxlength', arguments: [15000]}]
  }
};
