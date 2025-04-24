'use strict';

const env = process.env.NODE_ENV;
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8081}`;

module.exports = {
  aws: {
    sqs: process.env.AWS_SQS
  },
  reports: {
    deletionTimeout: process.env.DELETION_TIMEOUT,
    alertTimeout: process.env.FIRST_ALERT_TIMEOUT
  },
  audit: {
    enabled: String(process.env.AUDIT_DATA) === 'true',
    host: process.env.AUDIT_DB_HOST,
    user: process.env.AUDIT_DB_USER,
    password: process.env.AUDIT_DB_PASS,
    database: process.env.AUDIT_DB_NAME
  },
  prometheusPort: 8082,
  env,
  allowSkip: String(process.env.ALLOW_SKIP) === 'true',
  skipEmail: process.env.SKIP_EMAIL,
  writeToCasework: process.env.WRITE_TO_CASEWORK || env !== 'local',
  hostUrl: process.env.HOST_URL,
  saveService: {
    port: process.env.DATASERVICE_SERVICE_PORT_HTTPS,
    host: process.env.DATASERVICE_SERVICE_HOST &&
      `https://${process.env.DATASERVICE_SERVICE_HOST}` || 'http://127.0.0.1'
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  },
  upload: {
    maxFileSize: '25mb',
    hostname: process.env.FILE_VAULT_URL,
    allowedMimeTypes: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
  tokenExpiry: 1800,
  govukNotify: {
    notifyApiKey: process.env.NOTIFY_STUB === 'true' ? 'USE_MOCK' : process.env.NOTIFY_KEY,
    templateUserAuthId: process.env.TEMPLATE_USER_AUTHORISATION_ID,
    templateFeedback: process.env.TEMPLATE_FEEDBACK,
    caseworkerEmail: process.env.CASEWORKER_EMAIL,
    feedbackEmail: process.env.FEEDBACK_EMAIL
  },
  promptSheet: 'nrm-form-offline-v4-23-04-2025.pdf',
  firstResponderGuidance: 'first-responder-guide-for-england-and-wales.pdf',
};
