'use strict';
const emailDomainList = require('ms-email-domains');
const config = require('../../../config');
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const templateId = config.govukNotify.templateUserAuthId;
const appPath = require('../../nrm/index').baseUrl;
const firstStep = '/start/';
const tokenGenerator = require('../models/save-token');
const checkEmailExtension = require('../util/check-email-ext');
// this will be an npm module in the future
const emailExtensions = ['gov.uk', 'police.uk', 'pnn.police.uk'];

const isRecognisedExtension = (email) => {
  const extensionString = checkEmailExtension.getExtensionsString(emailExtensions);
  return checkEmailExtension.isRecognised(email, extensionString);
};

const checkDomain = (userEmailDomain) => {
  let flag = false;

  emailDomainList.forEach((emailDomain) => {
    if (userEmailDomain === emailDomain) {
      flag = true;
    }
  });
  return flag;
};

const getPersonalisation = (host, token) => {
  return {
    // pass in `&` at the end in case there is another
    // query e.g. ?hof-cookie-check
    'link': `http://${host + appPath + firstStep}?token=${token}&`,
    'host': `http://${host}`,
  };
};

const sendEmail = (email, host, token) => {
  notifyClient
    .sendEmail(templateId, email, {
      personalisation: getPersonalisation(host, token)
    })
    // we will need to log out the response to a proper logger
    // eslint-disable-next-line no-console
    .then(console.log(`email sent to ${email}`))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

module.exports = superclass => class extends superclass {

  saveValues(req, res, callback) {
    super.saveValues(req, res, err => {
      const email = req.form.values['confirm-email'];
      const organisation = req.sessionModel.get('user-organisation');
      const emailDomain = email.replace(/.*@/, '');

      const isRecognisedEmail = isRecognisedExtension(email) || checkDomain(emailDomain);

      if (isRecognisedEmail === false) {
        req.sessionModel.set('recognised-email', false);
        return callback(err);
      }

      const host = req.get('host');
      const token = tokenGenerator.save(email, organisation);
      sendEmail(email, host, token);
      return callback(err);
    });
  }

  // fork to error page when an email domain is not recognised
  getNextStep(req, res) {
    if (req.sessionModel.get('recognised-email') === false) {
      req.sessionModel.unset('recognised-email');
      return '/email-not-recognised';
    }
    return super.getNextStep(req, res);
  }
};
