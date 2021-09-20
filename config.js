'use strict';

const env = process.env.NODE_ENV || 'local';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  aws: {
    sqs: process.env.AWS_SQS || 'test-queue'
  },
  reports: {
    deletionTimeout: process.env.DELETION_TIMEOUT || 28,
    alertTimeout: process.env.FIRST_ALERT_TIMEOUT || 7
  },
  audit: {
    enabled: process.env.AUDIT_DATA || false,
    host: process.env.AUDIT_DB_HOST,
    user: process.env.AUDIT_DB_USER,
    password: process.env.AUDIT_DB_PASS,
    database: process.env.AUDIT_DB_NAME
  },
  prometheusPort: 8082,
  env,
  allowSkip: process.env.allowSkip,
  skipEmail: process.env.skipEmail,
  writeToCasework: env !== 'local',
  hostUrl: process.env.HOST_URL || 'http://localhost:8081',
  saveService: {
    port: process.env.DATASERVICE_SERVICE_PORT_HTTPS || '3000',
    host: process.env.DATASERVICE_SERVICE_HOST &&
      `https://${process.env.DATASERVICE_SERVICE_HOST}` || 'http://127.0.0.1'
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1'
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
    templateFeedback: process.env.TEMPLATE_FEEDBACK || '92b314e9-8ed5-4762-a8e2-7f208cdf3836',
    caseworkerEmail: process.env.CASEWORKER_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk',
    feedbackEmail: process.env.FEEDBACK_EMAIL || 'serviceopstesting@digital.homeoffice.gov.uk'
  }
};
