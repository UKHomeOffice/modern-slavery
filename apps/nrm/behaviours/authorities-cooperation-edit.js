module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    // set continueOnEdit if user changes answer to yes for authorities cooperation
    if (req.form.values['authorities-cooperation'] === 'yes') {
      req.form.options.continueOnEdit = true;
      req.form.options.steps['/authorities-cooperation'].continueOnEdit = true;
    }
    return super.saveValues(req, res, next);
  }
};
