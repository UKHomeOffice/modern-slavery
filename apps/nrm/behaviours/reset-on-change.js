'use strict';

module.exports = config => superclass => class extends superclass {
  process(req, res, cb) {
    const visited = req.sessionModel.get('steps');
    const fields = [].concat(config.storeFields);
    if (visited && visited.indexOf(req.form.options.route) > -1) {
      if (req.form.values[config.currentField] !== req.sessionModel.get(config.currentField)) {
        let items = [];
        // temp store each field from the session
        fields.forEach(field => {
          items.push({[field]: req.sessionModel.get(field)});
        });
        req.sessionModel.reset();
        // save it back in the session
        items.forEach(item => {
          const key = Object.keys(item).pop();
          const value = item[key];
          req.sessionModel.set(key, value);
        });
        // Required for the back button
        req.sessionModel.set('steps', visited);
      }
    }
    super.process(req, res, cb);
  }
};
