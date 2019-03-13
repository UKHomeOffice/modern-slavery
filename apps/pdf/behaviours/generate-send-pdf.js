/* eslint-disable no-console */
'use strict';

const config = require('../../../config');
const htmlUrl = config.pdf.url;
const uuid = require('uuid');
const pdfPuppeteer = require('../util/pdf-puppeteer');
const fs = require('fs');
const templateId = config.govukNotify.templatePDF;
const notifyApiKey = config.govukNotify.notifyApiKey;
const NotifyClient = require('notifications-node-client').NotifyClient;
const notifyClient = new NotifyClient(notifyApiKey);
const path = require('path');
const tempLocation = path.resolve(config.pdf.tempLocation);

const createTemporaryFileName = () => {
  return (`${uuid.v1()}.pdf`);
};

const sendEmailWithFile = (file, email) => {
  fs.readFile(file, (err, pdfFile) => {
    console.log(err);
    notifyClient.sendEmail(templateId, email, {
      personalisation: {
        documentLink: notifyClient.prepareUpload(pdfFile)
      }
    }).then(response => console.log(response.body)).catch(error => console.error(error));
  });
};

const deleteFile = (file) => {
  fs.unlink(file, (err) => {
    if (err) {
      throw err;
    }
    console.log(`successfully deleted ${file}`);
  });
};

module.exports = superclass => class extends superclass {
  async saveValues(req, res, next) {
    const email = req.form.values.email;
    const tempName = createTemporaryFileName();

    const file = await pdfPuppeteer.generate(htmlUrl, tempLocation, tempName);
    await sendEmailWithFile(file, email);
    await deleteFile(file);
    super.saveValues(req, res, (err) => {
      next(err);
    });
  }
};
