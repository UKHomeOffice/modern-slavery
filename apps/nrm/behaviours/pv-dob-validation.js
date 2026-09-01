'use strict';

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    const { values } = req.form;
    const isDobUnknown = values['pv-dob-not-known'] === true || values['pv-dob-not-known'] === 'true';

    if (isDobUnknown) {
      values['pv-dob'] = undefined;
      values['pv-dob-day'] = undefined;
      values['pv-dob-month'] = undefined;
      values['pv-dob-year'] = undefined;

      if (req.sessionModel && req.sessionModel.unset) {
        req.sessionModel.unset('pv-dob');
        req.sessionModel.unset('pv-dob-day');
        req.sessionModel.unset('pv-dob-month');
        req.sessionModel.unset('pv-dob-year');
      }
    }

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
