'use strict';

module.exports = superclass => class extends superclass {
  get(req, res, callback) {
    if (req.query.delete) {
      return this.deleteItem(req, res);
    }
    return super.get(req, res, callback);
  }

  deleteItem(req, res) {
    const items = req.sessionModel.get('supporting-documents') || [];
    req.sessionModel.set('supporting-documents',
      items.filter((file) => file.id !== req.query.delete));
    res.redirect(req.get('referer'));
  }
};
