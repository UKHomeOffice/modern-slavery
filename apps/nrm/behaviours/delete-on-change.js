/* eslint-disable consistent-return */
'use strict';

/**
 * Get fields to be deleted based on a condition
 *
 * @param {object} req - request object
 * @param {array} deleteFields - original array of fields to be deleted
 * @param {array} exceptions - array of exception objects with conditions which
 * if met details what fields should be exempt from deletion.
 *
 * Example: exceptions = {
 *  field: 'pv-name',
 *  value: true,
 *  exemptFields: [
 *  'pv-gender'
 *  ],
 * }
 * If the field 'pv-name' is true then do not remove 'pv-gender' from the
 * session
 *
 * @returns {array} - a new array of fields to be deleted
 */
const getDeleteFieldsWithoutExceptions = (req, deleteFields, exceptions) => {
  const exemptFieldsArray = exceptions.map(exception => {
    // check if condition is met
    const { field, value, exemptFields } = exception;
    if (req.sessionModel.get(field) === value) {
      return exemptFields;
    }
  });
  // merge the 'exemptFields' from each 'exemption' together into one array
  const exemptFields = [].concat.apply([], exemptFieldsArray);

  // filter out the exempt fields
  const newDeleteFieldsArray = deleteFields.filter(fieldName => {
    return (exemptFields.indexOf(fieldName) === -1);
  });

  return newDeleteFieldsArray;
};

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
  const { deleteFields, currentField, exceptions } = config;
  const currentValue = req.sessionModel.get(currentField);
  let fieldsForRemoval = deleteFields;

  if (currentValue) {
    if (req.form.values[config.currentField] !== req.sessionModel.get(currentField)) {
      // If there are exceptions for a certain condition remove those fields
      // from the default array of 'deleteFields'
      if (exceptions) {
        fieldsForRemoval = getDeleteFieldsWithoutExceptions(req, deleteFields, exceptions);
      }
      // delete each field from the session
      fieldsForRemoval.forEach(field => {
        req.sessionModel.unset(field);
      });
    }
  }
};

module.exports = config => superclass => class extends superclass {
  process(req, res, cb) {
    deleteFieldsFromSession(req, config);
    super.process(req, res, cb);
  }
};
