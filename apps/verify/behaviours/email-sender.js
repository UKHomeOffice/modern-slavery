'use strict';

const config = require('../../../config');
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const templateId = config.govukNotify.templateId;
const appLink = config.govukNotify.appLink;

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      const host = req.get('host');
      const emailAddress = req.form.values['user-email'];
      notifyClient
        .sendEmail(templateId, emailAddress, {
            personalisation: this.getPersonalisation()
          })
          .then(response => console.log(response))
          .catch(error => console.error(error));
      next(err);
    });
  }

  getPersonalisation() {
    return {
      'link': appLink
    };
  }
};
