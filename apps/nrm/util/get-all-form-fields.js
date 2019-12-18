'use strict';

// Get all form fields from each app
const nrmAppFields = require('../fields');
const verifyAppFields = require('../../verify/fields');

/**
 * Get all fields from the app
 *
 * Merge all fields from each app
 *
 * @returns {array} - array of all fields within the app
 */
function getAllFields() {
  // all fields are listed as keys, so we return them instead of the whole object
  const nrmFields = Object.keys(nrmAppFields);
  const verifyFields = Object.keys(verifyAppFields);

  const allFields = nrmFields.concat(verifyFields);

  return allFields;
}

module.exports = {
  getAllFields,
};
