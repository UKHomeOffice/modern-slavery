/* eslint-disable no-console */
'use strict';

const config = require('../../../config');
const templateId = config.govukNotify.templatePDF;
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);

/**
 * Send Email via the GOV notify Service
 *
 * @param {string} email - receipient email address
 * @param {object} data - data to be used within email body
 */
const sendEmail = (email, data) => {
    notifyClient.sendEmail(templateId, email, {
      personalisation: data,
    }).then(response => console.log(response.body)).catch(error => console.error(error));
};

module.exports = {
  sendEmail,
};
