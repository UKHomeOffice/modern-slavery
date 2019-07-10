'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superLocals = super.locals(req, res);
    if (req.sessionModel.get('pv-want-to-submit-nrm') === 'no') {
      superLocals.isDtn = true;
    } else {
      superLocals.isNrm = true;
    }
    return superLocals;
  }
};
