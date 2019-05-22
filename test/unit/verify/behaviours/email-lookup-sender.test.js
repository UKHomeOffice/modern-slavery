/* 'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const NotifyClient = require('notifications-node-client').NotifyClient;

const tokenGenerator = {
  save: sinon.stub()
};

// we need to proxyquire for multiple dependencies
// As soon as you require one of these it tries to create a Redis
// connection. We do not want Redis as a dependency of our unit tests.
// Therefore stub it before it gets to that
const Behaviour = proxyquire('../../../../apps/verify/behaviours/email-lookup-sender',
  { '../models/save-token': tokenGenerator,
    '../../nrm/index': sinon.stub()
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

      result.should.equal('/email-not-recognised');
    });

    it('calls the parent method when an email is on the whitelist', () => {
      req.sessionModel.get.withArgs('recognised-email').returns(undefined);

      instance.getNextStep(req, res);

      Base.prototype.getNextStep.should.have.been.calledWith(req, res);
    });

  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').yields();
      sinon.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
      NotifyClient.prototype.sendEmail.restore();
    });

    it('sets a `recognised-email` to false when an email is not on the whitelist', (done) => {
      req.form = {
        values: {
          'confirm-email': 'hello@email.com'
        }
      };

      instance.saveValues(req, res, () => {
        req.sessionModel.set.should.be.calledWith('recognised-email', false);
        done();
      });
    });

    it('calls tokenGenerator if an email is on the whitelist', (done) => {
      req.form = {
        values: {
          'confirm-email': 'test@homeoffice.gov.uk'
        }
      };

      instance.saveValues(req, res, () => {
        tokenGenerator.save.should.have.been.called;
        done();
      });
    });

    it('sends an email if an email is on the whitelist', (done) => {
      req.form = {
        values: {
          'confirm-email': 'test@homeoffice.gov.uk'
        }
      };

      instance.saveValues(req, res, () => {
        NotifyClient.prototype.sendEmail.should.have.been.called;
        done();
      });
    });
  });
});
 */
