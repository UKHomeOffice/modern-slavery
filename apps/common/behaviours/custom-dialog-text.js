module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);
    if (locals.route === 'continue-report' || locals.route === 'reports' || locals.route === 'are-you-sure') {
      locals.dialogText = true;
      req.translate('pages.session-timeout-warning.dialog-text');
    }
    return locals;
  }
};
