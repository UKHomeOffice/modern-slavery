'use strict';

module.exports = fields => {

  return superclass => class extends superclass {

  // bugfix for fields not saving so need transfer
  // related to save-missing-data behaviour
  saveValues(req, res, next) {
    fields.forEach(field => {
      const val = req.sessionModel.get(`${field}-save`);
      req.sessionModel.set(field, val);
    });
      super.saveValues(req, res, (err) => {
        next(err);
      });
    }
  };

};
