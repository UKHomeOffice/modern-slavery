'use strict';

const config = require('../../../config');
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const templateId = config.govukNotify.templateId;
const appPath = require('../../nrm/index').baseUrl;
const firstStep = '/start/';
const tokenGenerator = require('../models/save-token');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      const host = req.get('host');
      const email = req.form.values['confirm-email'];
      const token = tokenGenerator.save();
      notifyClient
        .sendEmail(templateId, email, {
            personalisation: this.getPersonalisation(host, token)
          })
          .then(response => console.log(response))
          .catch(error => console.error(error));
      next(err);
    });
  }

  getPersonalisation(host, token) {
    return {
      'link': `http://${host + appPath + firstStep + token}`
    };
  }
};
