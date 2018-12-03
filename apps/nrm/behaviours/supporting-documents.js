'use strict';
const config = require('../../../config');

module.exports = superclass => class extends superclass {

  process(req, res, next) {
    const file = req.files['supporting-document-upload'];
    // error if file too big
    if (file && file.truncated) {
      const err = new this.ValidationError('supporting-document-upload', {
        type: 'filesize',
        arguments: [config.upload.maxfilesize]
      }, req, res);
      return next({
        'supporting-document-upload': err
      });
    } else {
      super.process(req, res, next);
    }
  }
};
