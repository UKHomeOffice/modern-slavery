'use strict';

module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.query.delete) {
      const files = req.sessionModel.get('files') || [];
      const remaining = files.filter(i => i.id !== req.query.delete);
      req.log('info', `Removing file: ${req.query.delete}`);
      req.sessionModel.set('files', remaining);
      return res.redirect(`${req.baseUrl}${req.path}`);
    }
    return super.configure(req, res, next);
  }
};
