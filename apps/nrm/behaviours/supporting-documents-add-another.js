'use strict';

const deleteItem = (req, res) => {
  const items = req.sessionModel.get('supporting-documents') || [];
  req.sessionModel.set('supporting-documents',
    items.filter((file) => file.id !== req.query.delete));
  // redirect to the original page that called this function
  res.redirect(req.get('referer'));
};

module.exports = superclass => class extends superclass {
  get(req, res, callback) {
    if (req.query.delete) {
      console.log('in delete');
      return deleteItem(req, res);
    }
    return super.get(req, res, callback);
  }
};
