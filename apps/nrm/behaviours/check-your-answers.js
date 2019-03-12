'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, callback) {
    super.configure(req, res, err => {
      /* set fields from each section if the user has not visited
      that field */
      if (req.sessionModel.get('pv-under-age') !== 'no') {
        if (req.form.options.sections['potential-victim'][0].field === 'does-pv-need-support') {
          req.sessionModel.set('does-pv-need-support', 'Yes');
        }
      }
      callback(err);
    });
  }
};
