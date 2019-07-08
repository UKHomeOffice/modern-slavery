'use strict';

/**
 * Delete supplied fields from session
 *
 * @param {object} req - request object
 * @param {object} config - object containing configuration details for function
 * for example config = { currentField: 'pv-name',  deleteFields: ['pv-dob'] }
 *
 * @returns {void}
 */
const deleteFieldsFromSession = (req, config) => {
  const visited = req.sessionModel.get('steps');
  const { deleteFields, currentField } = config;

  if (visited && visited.indexOf(req.form.options.route) > -1) {
    if (req.form.values[config.currentField] !== req.sessionModel.get(currentField)) {
      // delete each field from the session
      deleteFields.forEach(field => {
        req.sessionModel.unset(field);
      });

      // Required for the back button
      req.sessionModel.set('steps', visited);
    }
  }
};

module.exports = config => superclass => class extends superclass {
  process(req, res, cb) {
    deleteFieldsFromSession(req, config);
    super.process(req, res, cb);
  }
};
