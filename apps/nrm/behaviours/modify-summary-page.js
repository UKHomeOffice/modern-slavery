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

    // display exploitatio-types
    let forcedToWork;
    let wagesTaken;
    let forcedToCommitFraud;
    let prostitution;
    let childExploitation;
    let takenSomewhere;
    let forcedToCommitCrime;
    let organsRemoved;
    let unpaidHouseholdWork;

    if (req.sessionModel.get('types-of-exploitation-forced-to-work')) {
      forcedToWork = 'Forced to work for nothing or almost nothing';
    }
    if (req.sessionModel.get('types-of-exploitation-wages-taken')) {
      wagesTaken = 'Wages taken by force or coercion, such as through control of a bank account';
    }
    if (req.sessionModel.get('types-of-exploitation-forced-to-commit-fraud')) {
      forcedToCommitFraud = 'Forced to commit fraud, such as using their identity to claim benefits';
    }
    if (req.sessionModel.get('types-of-exploitation-prostitution')) {
      prostitution = 'Forced into prostitution';
    }
    if (req.sessionModel.get('types-of-exploitation-child-exploitation')) {
      childExploitation = 'Child sexual exploitation';
    }
    if (req.sessionModel.get('types-of-exploitation-taken-somewhere')) {
      takenSomewhere = 'Taken somewhere, held against their will and sexually assaulted';
    }
    if (req.sessionModel.get('types-of-exploitation-forced-to-commit-crime')) {
      forcedToCommitCrime = 'Forced to commit a crime, such as growing cannabis, drug dealing or begging';
    }
    if (req.sessionModel.get('types-of-exploitation-organs-removed')) {
      organsRemoved = 'Organs, such as kidneys, removed against their will';
    }
    if (req.sessionModel.get('types-of-exploitation-unpaid-household-work')) {
      unpaidHouseholdWork = 'Forced to do unpaid or low paid household work by relatives or strangers';
    }
    req.sessionModel.set('exploitation-types'),[
      forcedToWork,
      wagesTaken,
      forcedToCommitFraud,
      prostitution,
      childExploitation,
      takenSomewhere,
      forcedToCommitCrime,
      organsRemoved,
      unpaidHouseholdWork,
      req.form.values['other-exploitation-details']
    ].filter(Boolean);
  }
};
