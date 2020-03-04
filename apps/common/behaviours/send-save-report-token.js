'use strict';
const config = require('../../../config');
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
// this is currently pointing to the wrong template,
// this needs to change
const templateId = config.govukNotify.templateUserAuthId;
const appPath = require('../../nrm/index').baseUrl;
const firstStep = '/continue-report/';
const saveReportTokens = require('../models/save-report-tokens');

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
  async saveValues(req, res, next) {
    try {
      const email = req.form.values['saved-email'];

      const host = req.get('host');
      // add token & email to db
      const token = await saveReportTokens.writeToken({'user-email': email});
      sendEmail(email, host, token);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Something went wrong ${error}`);
        return res.redirect('/500');
    }
    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
