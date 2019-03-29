'use strict';

module.exports = fields => {

  return superclass => class extends superclass {

// bugfix for field not saving
  saveValues(req, res, next) {
    const items = [].concat(fields);
    items.forEach(item => {
      req.sessionModel.set(`${item}-save`, req.form.values[item]);
    });
      super.saveValues(req, res, (err) => {
        next(err);
      });
    }

  };

};
