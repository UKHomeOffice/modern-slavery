'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const superLocals = super.locals(req, res);
    /**
     * Sets local variables to retain selected option.
     * The checked attribute will be enabled for the selected field.
     *
     * @see apps/nrm/views/pv-under-age.html
     *
     * This is a custom implementation to allow screen readers to read hint
     * text for radio group options
     */
    if (req.sessionModel.get('pv-under-age') === 'no') {
      superLocals.isNo = true;
    }

    if (req.sessionModel.get('pv-under-age') === 'yes') {
      superLocals.isYes = true;
    }

    if (req.sessionModel.get('pv-under-age') === 'not-sure') {
      superLocals.isNotSure = true;
    }

    return superLocals;
  }
};
