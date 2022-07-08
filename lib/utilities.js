/* eslint-disable no-console */


const config = require('../config');

class NotifyMock {
  sendEmail() {
    return Promise.resolve();
  }
}

module.exports = {
  NotifyClient: config.govukNotify.notifyApiKey === 'USE_MOCK' ?
    NotifyMock : require('notifications-node-client').NotifyClient
};
