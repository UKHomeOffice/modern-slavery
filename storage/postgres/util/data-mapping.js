'use strict';

/**
 * Get Mapped data
 *
 * Converts data into a format to be stored in database
 *
 * @param {object} data - data to be converted
 *
 * @returns {object} - object in required db format
 */
const getMappedData = (data) => {
  const mappedData = {
    userEmail: data['user-email'],
    jsonSavedData: data,
  };

  return mappedData;
};

module.exports = {
  getData: getMappedData,
};
