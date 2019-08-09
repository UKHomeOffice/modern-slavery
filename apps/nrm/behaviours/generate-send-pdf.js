'use strict';

const config = require('../../../config');
const uuid = require('uuid');
const pdfPuppeteer = require('../util/pdf-puppeteer');
const fs = require('fs');
const caseworkerEmail = config.govukNotify.caseworkerEmail;
const templateId = config.govukNotify.templatePDF;
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const path = require('path');
const tempLocation = path.resolve(config.pdf.tempLocation);
const util = require('../util/transform-data');
const templateFile = path.resolve(config.pdf.template);

const createTemporaryFileName = () => {
  return (`${uuid.v1()}.pdf`);
};

const sendEmailWithFile = (file, email, req) => {
  fs.readFile(file, (err, pdfFile) => {
    if (err) {
      req.log('error', err);
    }
    notifyClient.sendEmail(templateId, email, {
      personalisation: {
        documentLink: notifyClient.prepareUpload(pdfFile),
        jsonPayload: JSON.stringify(req.sessionModel.get('jsonPayload'), null, 4)
      }
    }).then(
      req.log('debug', `${uuid.v1()}.pdf successfully sent`)
    ).catch(error => req.log('error', error));
  });
};

const deleteFile = (file, req) => {
  fs.unlink(file, (err) => {
    if (err) {
      throw err;
    }
    req.log('debug', `${uuid.v1()}.pdf successfully deleted`);
  });
};

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    const tempName = createTemporaryFileName();

    const session = req.sessionModel.attributes;
    const data = await util.transformData(session);
    const file = await pdfPuppeteer.generate(templateFile, tempLocation, tempName, data);

    await sendEmailWithFile(file, caseworkerEmail, req);

    await deleteFile(file, req);

    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
