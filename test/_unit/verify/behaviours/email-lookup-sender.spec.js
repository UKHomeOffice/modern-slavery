'use strict';

const config = require('../../../../config');
const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const NotifyClient = require('notifications-node-client').NotifyClient;

const emailDomainCheck = {
  isValidDomain: sinon.stub(),
  isOnDomainList: sinon.stub(),
  isOnExtensionList: sinon.stub()
};

const tokenGenerator = {
  save: sinon.stub()
};

// we need to proxyquire for multiple dependencies
// As soon as you require one of these it tries to create a Redis
// connection. We do not want Redis as a dependency of our unit tests.
// Therefore stub it before it gets to that
const Behaviour = proxyquire('../../../../apps/verify/behaviours/email-lookup-sender',
  { '../models/save-token': tokenGenerator,
    '../../nrm/index': sinon.stub(),
    '../../../ms-lists/ms_email_domains': emailDomainCheck,
    '../../../config': Object.assign({}, config, {
      allowSkip: true, skipEmail: 'sas-hof-test@digital.homeoffice.gov.uk'
    })
  });

describe('apps/verify/behaviours/email-lookup-sender', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });


  class Base {
    saveValues() {}
    getNextStep() {}
  }

  let req;
  let res;
  let sessionModel;
  let EmailLookUpSender;
  let instance;

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub(),
      unset: sinon.stub()
    };
    res = reqres.res();
    req = reqres.req({sessionModel});
    req.form = { values: {} };
    res.redirect = sinon.stub();

    EmailLookUpSender = Behaviour(Base);
    instance = new EmailLookUpSender();
  });

  describe('getNextStep()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getNextStep');
    });
    afterEach(() => {
      Base.prototype.getNextStep.restore();
    });

    it('removes `recognised-email` property when an email is not on the whitelist', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(false);

      instance.getNextStep(req, res);

      req.sessionModel.unset.should.have.been.calledWith('recognised-email');
    });

    it('returns exit page if an email is not on the whitelist', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(false);

      const result = instance.getNextStep(req, res);

      result.should.equal('email-not-recognised');
    });

    it('calls the parent method when an email is on the whitelist', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(undefined);

      instance.getNextStep(req, res);

      Base.prototype.getNextStep.should.have.been.calledWith(req, res);
    });

    it('does not call the parent method when email auth is skipped with correct email', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(undefined);
      req.form.values['user-email'] = 'sas-hof-test@digital.homeoffice.gov.uk';

      instance.getNextStep(req, res);

      Base.prototype.getNextStep.should.not.have.been.called;
      res.redirect.should.have.been.calledOnce.calledWithExactly('/nrm/start?token=skip');
    });

    it('calls the parent method when skip email auth is allowed but with incorrect email', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(undefined);
      req.form.values['user-email'] = 'bad-email@digital.homeoffice.gov.uk';

      instance.getNextStep(req, res);

      Base.prototype.getNextStep.should.have.been.calledWith(req, res);
      res.redirect.should.not.have.been.called;
    });
  });

  describe('saveValues()', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(Base.prototype, 'saveValues').yields();
      sandbox.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');

      emailDomainCheck.isValidDomain.withArgs('homeoffice.gov.uk').returns(true);
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('sets a `recognised-email` to false when an email is not on the whitelist', done => {
      req.form = {
        values: {
          'user-email': 'hello@email.com'
        }
      };
      emailDomainCheck.isValidDomain.withArgs('hello@email.com').returns(false);
      instance.saveValues(req, res, () => {
        req.sessionModel.set.should.have.been.calledOnce.calledWithExactly('recognised-email', false);
        done();
      });
    });

    it('calls tokenGenerator if an email is on the whitelist', done => {
      req.form = {
        values: {
          'user-email': 'test@homeoffice.gov.uk'
        }
      };

      instance.saveValues(req, res, () => {
        tokenGenerator.save.should.have.been.calledOnce;
        done();
      });
    });

    it('sends an email if an email is on the whitelist', done => {
      req.form = {
        values: {
          'user-email': 'test@homeoffice.gov.uk'
        }
      };

      instance.saveValues(req, res, () => {
        NotifyClient.prototype.sendEmail.should.have.been.calledOnce;
        done();
      });
    });

    it('skips calling data service when email auth skip is allowed with correct email', done => {
      req.form = {
        values: {
          'user-email': 'sas-hof-test@digital.homeoffice.gov.uk'
        }
      };

      instance.saveValues(req, res, () => {
        NotifyClient.prototype.sendEmail.should.not.have.been.called;
        done();
      });
    });
  });
});
