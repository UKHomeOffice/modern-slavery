'use strict';
/* eslint no-process-env: 0 */

const env = process.env.NODE_ENV || 'production';
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  aws: {
    sqs: process.env.AWS_SQS
  },
  audit: {
    enabled: process.env.AUDIT_DATA || false,
    host: process.env.AUDIT_DB_HOST,
    user: process.env.AUDIT_DB_USER,
    password: process.env.AUDIT_DB_PASS,
    database: process.env.AUDIT_DB_NAME
  },
  prometheusPort: 8082,
  env: env,
  useMocks: useMocks,
  allowSkip: process.env.allowSkip,
  writeToCasework: (process.env.WRITE_TO_CASEWORK === 'true') ? true : false,
  hostUrl: process.env.HOST_URL || 'http://localhost:8081',
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  dataService: {
    url: process.env.DATA_SERVICE_PORT_10443_TCP || process.env.DATA_SERVICE_PORT_10080_TCP || 'http://localhost:8080',
    login: process.env.DATA_SERVICE_LOGIN,
    password: process.env.DATA_SERVICE_PASSWORD,
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
    templateUserAuthId: process.env.TEMPLATE_USER_AUTHORISATION_ID || 'fe0408cb-24f0-4b5f-9bdb-6569834039fb',
    templatePDF: process.env.TEMPLATE_PDF || 'd48b84c8-9350-4cf8-b31c-8cc4ef8237f1',
    templateFeedback: process.env.TEMPLATE_FEEDBACK || '92b314e9-8ed5-4762-a8e2-7f208cdf3836',
    caseworkerEmail: process.env.CASEWORKER_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk',
    feedbackEmail: process.env.FEEDBACK_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk'
  },
  pdf: {
    template: './apps/nrm/views/pdf.html',
    // problems with creating temp folder so use images folder
    tempLocation: 'public/images'
  },
};
