'use strict';
const config = require('../../../config');
const UploadModel = require('../models/file-upload');
const uuid = require('uuid');

module.exports = superclass => class extends superclass {

  process(req, res, next) {
    const file = req.files['supporting-document-upload'];
    // error if file too big
    if (file && file.truncated) {
      const err = new this.ValidationError('supporting-document-upload', {
        type: 'filesize',
        arguments: [config.upload.maxFileSize]
      }, req, res);
      return next({
        'supporting-document-upload': err
      });
    }
    if (file && file.data && file.data.length) {
      req.form.values['supporting-document-filename'] = file.name;
      req.form.values['supporting-document-type'] = file.mimetype;
      // generates an object with a url
      const model = new UploadModel(file);
      model.save()
      .then((result) => {
      // N:B validation controller gets values from req.form.values
      // and not on req.files so you have to pass a value to the filename
      // otherwise the required validation appears
        req.form.values['supporting-document-upload'] = result.url;
      })
      .then(()=> next())
      .catch(e => {
        next(e);
      });
    } else {
      next();
    }
  }

  saveValues(req, res, next) {
    const files = req.sessionModel.get('supporting-documents') || [];
    files.push({
      id: uuid.v1(),
      url: req.form.values['supporting-document-upload'],
      description: req.form.values['supporting-document-description'] ||
        req.form.values['supporting-document-filename'],
      type: req.form.values['supporting-document-type']
    });
    req.sessionModel.set('supporting-documents', files);
    super.saveValues(req, res, (err) => {
      req.sessionModel.unset('supporting-document-add-another');
      req.sessionModel.unset('supporting-document-description');
      req.sessionModel.unset('supporting-document-filename');
      req.sessionModel.unset('supporting-document-upload');
      req.sessionModel.unset('supporting-document-type');
      next(err);
    });
  }
};
