'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';

module.exports = {
  env: env,
  useMocks: useMocks,
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  upload: {
    maxFileSize: '100mb'
  },
  tokenExpiry: 86400,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY || '',
    templateUserAuthId: '56b5a84f-7024-41d3-bd08-26521435be16',
  }
};
