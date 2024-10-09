'use strict';
const emailDomainCheck = require('../../../ms-lists/ms_email_domains');
const config = require('../../../config');
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const templateId = config.govukNotify.templateUserAuthId;
const appPath = require('../../nrm/index').baseUrl;
const firstStep = '/start';
const tokenGenerator = require('../models/save-token');
const logger = require('hof/lib/logger')({ env: config.env });

const getPersonalisation = (host, token) => {
  return {
    'link': `http://${host + appPath + firstStep}?token=${token}`,
    'host': `http://${host}`,
  };
};

const sendEmail = async (email, host, token) => {
  try {
    await notifyClient
      .sendEmail(templateId, email, {
        personalisation: getPersonalisation(host, token)
      });
    // we will need to log out the response to a proper logger
    logger.log('info', `email sent to ${email}`);
  }
  catch (error) {
    logger.error(`Error sending email: ${error}`);
    throw error;
  };
};

module.exports = superclass => class extends superclass {

  skipEmailVerification(email) {
    return config.allowSkip && email === config.skipEmail;
  }

  async saveValues(req, res, next) {
    const email = req.form.values['user-email'];

    if (this.skipEmailVerification(email)) {
      return super.saveValues(req, res, next);
    }
    return super.saveValues(req, res, async err => {
      if (err) {
        return next(err);
      }
      try {
        const organisation = req.sessionModel.get('user-organisation');
        const emailDomain = email.replace(/.*@/, '');

        const isRecognisedEmail = emailDomainCheck.isValidDomain(emailDomain);

        if (!isRecognisedEmail) {
          req.sessionModel.set('recognised-email', false);
          return next(err);
        }

        const host = req.get('host');
        const token = await tokenGenerator.save(email, organisation);
        await sendEmail(email, host, token);
        return next();
      } catch (err) {
        logger.error('error', `Error in the saveValues method ${error}`);
        return next(err);
      }
    });
  }

  // fork to error page when an email domain is not recognised
  getNextStep(req, res) {
    if (req.sessionModel.get('recognised-email') === false) {
      req.sessionModel.unset('recognised-email');
      return 'email-not-recognised';
    }

    const email = req.form.values['user-email'];

    if (this.skipEmailVerification(email)) {
      return res.redirect('/nrm/start?token=skip');
    }

    return super.getNextStep(req, res);
  }
};
