'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/save-and-exit');
const TestDate = 'Mon 05 Jul 2021 13:28:56 +0100';
const TestDateFeb = 'Sat 29 Feb 2020 13:28:56 +0100';
const CorrectDate = '02 August 2021';
const CorrectDateFeb = '28 March 2020';
const Route = 'save-and-exit';
const UserEmail = 'mary-jane-parker@homeoffice.gov.uk';

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

  let superLocals = {
    'route': Route,
    'created_at': TestDate,
    'user-email': UserEmail
  };

  const data = Object.assign({}, {
    reportExpiration: CorrectDate,
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
        'route': Route,
        'created_at': TestDate,
        'user-email': UserEmail
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with expiry date calculated', async() => {
      const expected = {
        'route': Route,
        'created_at': TestDate,
        'user-email': UserEmail,
        'reportExpiration': CorrectDate,
        'userEmail': UserEmail
      };

      req.sessionModel.get.withArgs('created_at').returns(TestDate);
      req.sessionModel.get.withArgs('user-email').returns(UserEmail);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
      expect(sessionModel.reset).to.have.been.called;
    });

    it('returns an extended locals with expiry date calculated for 29th Feb', async() => {
      const expected = {
        'route': Route,
        'created_at': TestDateFeb,
        'user-email': UserEmail,
        'reportExpiration': CorrectDateFeb,
        'userEmail': UserEmail
      };
      // eslint-disable-next-line camelcase
      locals.created_at = TestDateFeb;

      req.sessionModel.get.withArgs('created_at').returns(TestDateFeb);
      req.sessionModel.get.withArgs('user-email').returns(UserEmail);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
      expect(sessionModel.reset).to.have.been.called;
    });

    it('returns an Invalid date when given an empty created_at date', async() => {
      const expected = {
        'route': Route,
        'created_at': '',
        'user-email': UserEmail,
        'reportExpiration': 'Invalid date',
        'userEmail': UserEmail
      };
      // eslint-disable-next-line camelcase
      locals.created_at = '';

      req.sessionModel.get.withArgs('created_at').returns('');
      req.sessionModel.get.withArgs('user-email').returns(UserEmail);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
      expect(sessionModel.reset).to.have.been.called;
    });


    it('resets the session', () => {
      instance.locals(req, res);
      expect(sessionModel.reset).to.have.been.called;
    });

    it('gets the users email and report creation date from the previous page', () => {
      instance.locals(req, res);
      expect(sessionModel.get).to.have.been.calledWith('user-email');
      expect(sessionModel.get).to.have.been.calledWith('created_at');
    });
  });
});
