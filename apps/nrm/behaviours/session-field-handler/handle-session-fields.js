'use strict';
const customSessionHandlers = require('./page-custom-session-handlers');

/**
 * Handle the session fields based on the pageName
 *
 * @param {Object} req - request parameters
 * @param {string} pageName - name of the page
 *
 * @returns {void}
 */
const handleSessionFields = (req, pageName) => {
  const pageSessionHandlers = {
    'co-operate-with-police': customSessionHandlers.coOperateWithPolice(req),
  };

  return pageSessionHandlers[pageName];
};

module.exports = pageName => superclass => class extends superclass {
  process(req, res, cb) {
    handleSessionFields(req, pageName);
    super.process(req, res, cb);
  }
};
