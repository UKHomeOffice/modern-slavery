'use strict';
module.exports = superclass => class extends superclass {

  locals(req, res) {
    const superlocals = super.locals(req, res);
    const locals = Object.assign({}, superlocals, {
      hideChangeLink: true
    });

    return locals;
  }

  saveValues(req, res, next) {
    super.saveValues(req, res, (err) => {
      if (err) {
        next(err);
      }
      return res.redirect('/nrm' + req.sessionModel.get('steps').pop());
    });
  }

};
