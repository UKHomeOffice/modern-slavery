'use strict';

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const { values } = req.form;
    const isDobUnknown = values['pv-dob-not-known'] === true || values['pv-dob-not-known'] === 'true';

    if (!values['pv-dob'] && !isDobUnknown) {
      return next({
        'pv-dob': new this.ValidationError('pv-dob', {
          key: 'pv-dob',
          type: 'required'
        })
      });
    }

    return super.validate(req, res, next);
  }
};
