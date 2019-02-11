'use strict';
const nrmFields = require('../../../apps/nrm/fields/index');

/**
 * Get the listed options for a specific page within the NRM app
 *
 * @param {string} page - the page url (e.g 'select-location')
 *
 * @returns {Array} - array of options for the specified page
 */
const getOptions = (page) => {
    return nrmFields[page].options;
};

module.exports = getOptions;
