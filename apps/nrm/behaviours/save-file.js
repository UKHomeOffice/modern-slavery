'use strict';

const _ = require('lodash');
const config = require('../../../config');
const Model = require('../models/file-upload');

module.exports = name => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[name]) {
      // set file name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files
      req.form.values[name] = req.files[name].name;
      req.log('info', `Processing file: ${req.form.values[name]}`);
    }
    super.process.apply(this, arguments);
  }

  validateField(key, req) {
    if (req.body['upload-file']) {
      const fileUpload = _.get(req.files, `${name}`);

      if (fileUpload) {
        const uploadSize = fileUpload.size;
        const mimetype = fileUpload.mimetype;
        const uploadSizeTooBig = uploadSize > config.upload.maxFileSize;
        const uploadSizeBeyondServerLimits = uploadSize === null;
        const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);
        const invalidSize = uploadSizeTooBig || uploadSizeBeyondServerLimits;

        if (invalidSize || invalidMimetype) {
          return new this.ValidationError(key, {
            key,
            type: invalidSize ? 'maxFileSize' : 'fileType',
            redirect: undefined
          });
        }
      } else {
        return new this.ValidationError(key, {
          key,
          type: 'required',
          redirect: undefined
        });
      }
    }
    return super.validateField(key, req);
  }

  saveValues(req, res, next) {
    if (req.body['upload-file']) {
      const files = req.sessionModel.get('files') || [];

      if (_.get(req.files, name)) {
        req.log('info', `Saving file: ${req.files[name].name}`);
        const file = _.pick(req.files[name], ['name', 'data', 'mimetype']);
        const model = new Model(file);
        return model.save()
          .then(() => {
            req.sessionModel.set('files', [...files, model.toJSON()]);
            if (req.form.options.route === '/upload-evidence') {
              return res.redirect('/nrm/upload-evidence');
            }
            return super.saveValues(req, res, next);
          })
          .catch(next);
      }
    }
    return super.saveValues.apply(this, arguments);
  }
};
