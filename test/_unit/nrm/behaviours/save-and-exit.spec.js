'use strict';

const moment = require('moment');
const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/save-and-exit');

const Route = 'save-and-exit';
const UserEmail = 'mary-jane-parker@homeoffice.gov.uk';
const DeletionTimeout = 28;
const ExpectedExpiryDate = moment(new Date()).add(DeletionTimeout, 'days')
  .format('DD MMMM YYYY');

describe('/apps/nrm/behaviours/save-and-exit', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
  }

  let sessionModel;
  let req;
  let res;
  let instance;
  let SaveAndExit;

  const superLocals = {
    route: Route
  };

  const data = Object.assign({}, {
    reportExpiration: ExpectedExpiryDate,
    userEmail: UserEmail
  });

  let locals = Object.assign({}, superLocals, data);

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        reset: sinon.stub()
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      SaveAndExit = Behaviour(Base);
      instance = new SaveAndExit();
      sinon.stub(Base.prototype, 'locals').returns(locals);
    });
    afterEach(() => {
      locals = {
        route: Route
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with expiry date calculated', async () => {
      const expected = {
        route: Route,
        reportExpiration: ExpectedExpiryDate,
        userEmail: UserEmail
      };

      req.sessionModel.get.withArgs('user-email').returns(UserEmail);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
      expect(sessionModel.reset).to.have.been.called;
    });

    it('resets the session', () => {
      instance.locals(req, res);
      expect(sessionModel.reset).to.have.been.called;
    });

    it('gets the users email from the previous page', () => {
      instance.locals(req, res);
      expect(sessionModel.get).to.have.been.calledWith('user-email');
    });
  });
});
