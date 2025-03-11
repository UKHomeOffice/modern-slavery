module.exports = superclass => class LimitDocs extends superclass {
  validate(req, res, next) {
    const files = req.sessionModel.get('files');
    if (files && files.length >= 100) {
      return next({
        'upload-file': new this.ValidationError(
          'upload-file',
          {
            type: 'tooMany'
          }
        )
      });
    } super.validate(req, res, next);
    return next;
  }
};
