'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/modify-summary-page');

describe('/apps/nrm/behaviours/modify-summary-page', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() { }
  }

  let sessionModel;
  let req;
  let res;
  let instance;
  let modifySummaryPage;

  const locals = {};
  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub()
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      modifySummaryPage = Behaviour(Base);
      instance = new modifySummaryPage();
      sinon.stub(Base.prototype, 'locals').returns(locals);
    });
    afterEach(() => {
      Base.prototype.locals.restore();
    });
    it('referenceLabelHint is true if there is a reference field', () => {
      locals.rows = [
        {
          section: 'Your report',
          fields: [{
            changeLinkDescription: 'Your reference',
            label: 'Your reference',
            value: 'local test 2',
            step: '/reference',
            field: 'reference'
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Your report',
          fields: [{
            changeLinkDescription: 'Your reference',
            label: 'Your reference',
            value: 'local test 2',
            step: '/reference',
            field: 'reference',
            referenceLabelHint: true
          }],
          omitFromPdf: false
        }
      ]);
    });

    it('omitChangeLink and automaticReferral is true if referral is automatic ', () => {
      req.sessionModel.get.withArgs('automatic-referral').returns(true);
      locals.rows = [
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'Yes',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-yes'
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'Yes',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-yes',
            omitChangeLink: true,
            automaticReferral: true
          }],
          omitFromPdf: false
        }
      ]);
    });

    it('omitChangeLink and automaticReferral is not set if referral is not automatic', () => {
      req.sessionModel.get.withArgs('automatic-referral').returns(false);
      locals.rows = [
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'Yes',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-yes'
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'Yes',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-yes'
          }],
          omitFromPdf: false
        }
      ]);
    });

    it('omitChangeLink and automaticReferral is not set if form is dtn', () => {
      req.sessionModel.get.withArgs('automatic-referral').returns(false);
      locals.rows = [
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'No',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-no'
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Potential victim',
          fields: [{
            changeLinkDescription: 'Case referred to NRM',
            label: 'Case referred to NRM',
            value: 'No',
            step: '/pv-want-to-submit-nrm',
            field: 'pv-want-to-submit-nrm',
            changeLink: '/nrm/pv-want-to-submit-nrm/edit#pv-want-to-submit-nrm-no'
          }],
          omitFromPdf: false
        }
      ]);
    });

    it('emailInfo is true if there is an email for fr-details ', () => {
      locals.rows = [
        {
          section: 'Your details',
          fields: [{
            changeLinkDescription: 'Your organisation',
            label: 'Your organisation',
            value: 'Borough Council',
            step: '/organisation',
            field: 'user-organisation'
          },
          {
            changeLinkDescription: 'Email',
            label: 'Email',
            value: 'testman@.tester.gov.uk',
            step: '/fr-details',
            field: 'user-email',
            omitChangeLink: true
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Your details',
          fields: [{
            changeLinkDescription: 'Your organisation',
            label: 'Organisation',
            value: 'Borough Council',
            step: '/organisation',
            field: 'user-organisation'
          },
          {
            changeLinkDescription: 'Email',
            label: 'Email',
            value: 'testman@.tester.gov.uk',
            step: '/fr-details',
            field: 'user-email',
            omitChangeLink: true,
            emailInfo: true
          }],
          omitFromPdf: false
        }
      ]);
    });

    it('field label is set to Organisation if user-organisation is set in Your details section', () => {
      locals.rows = [
        {
          section: 'Your details',
          fields: [{
            changeLinkDescription: 'Your organisation',
            label: 'Your organisation',
            value: 'Borough Council',
            step: '/organisation',
            field: 'user-organisation'
          },
          {
            changeLinkDescription: 'Email',
            label: 'Email',
            value: 'testman@.tester.gov.uk',
            step: '/fr-details',
            field: 'user-email',
            omitChangeLink: true
          }],
          omitFromPdf: false
        }];
      instance.locals(req, res).rows.should.deep.equal([
        {
          section: 'Your details',
          fields: [{
            changeLinkDescription: 'Your organisation',
            label: 'Organisation',
            value: 'Borough Council',
            step: '/organisation',
            field: 'user-organisation'
          },
          {
            changeLinkDescription: 'Email',
            label: 'Email',
            value: 'testman@.tester.gov.uk',
            step: '/fr-details',
            field: 'user-email',
            omitChangeLink: true,
            emailInfo: true
          }],
          omitFromPdf: false
        }
      ]);
    });
  });
});
