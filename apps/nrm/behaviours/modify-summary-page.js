'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res, next) {
    const locals = super.locals(req, res, next);

    locals.rows.forEach(row => {
      row.fields.forEach(field => {
        this.enhanceFieldForSummary(row, field, req.sessionModel);
      });
    });

    return locals;
  }

  enhanceFieldForSummary(row, field, sessionModel) {
    // add hint under reference label on summary pages
    if (field.field === 'reference') {
      field.referenceLabelHint = true;
      field.additionalInfoSpace = true;
    } else if (field.field === 'pv-want-to-submit-nrm') {
      // add text under pv-want-to-submit-nrm label and omit change link on summary pages if automatic referral is true
      if (field.value === 'Yes' && sessionModel.get('automatic-referral') === true) {
        field.omitChangeLink = true;
        field.automaticReferral = true;
        field.additionalInfoSpace = true;
      }
    } else if (field.step === '/fr-details' && field.field === 'user-email') {
      // add text under user-email label on summary pages for first responder details
      field.emailInfo = true;
      field.additionalInfoSpace = true;
    }

    // Modify 'Your organisation' label conditionally (optional)
    if (row.section === 'Your details' && field.label === 'Your organisation') {
      field.label = 'Organisation';
    }
  }
};
