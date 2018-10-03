'use strict';
/* eslint no-process-env: 0 */

module.exports = {
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY || '',
    templateId: '56b5a84f-7024-41d3-bd08-26521435be16',
    appLink: 'https://www.google.co.uk/'
  }
};
