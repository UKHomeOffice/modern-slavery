'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superLocals = super.locals(req, res);
    superLocals.columnWidth = 'full-width';
    return superLocals;
  }
};
