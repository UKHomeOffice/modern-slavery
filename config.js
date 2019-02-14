'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  env: env,
  useMocks: useMocks,
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  upload: {
    maxFileSize: '100mb',
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://${localhost()}/api/file-upload`
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  tokenExpiry: 86400,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_KEY || '',
    templateUserAuthId: '56b5a84f-7024-41d3-bd08-26521435be16',
  },
  pdf: {
    template: './apps/pdf/views/pdf.html',
    // problems with creating temp folder so use images folder
    tempLocation: 'public/images'
  }
};
