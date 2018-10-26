'use strict';

module.exports = superclass => class extends superclass {
  // pass in the email to locals so it can be used in the template
  locals(req, res) {
    const locals = super.locals(req, res);
    locals.userEmail = req.sessionModel.get('user-email');
    return locals;
  }

};
