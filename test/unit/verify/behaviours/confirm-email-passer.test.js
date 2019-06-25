'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/verify/behaviours/confirm-email-passer');

describe('apps/behaviours/confirm-email-passer', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
  }
  let req;
  let res;
  let ConfirmEmailPasser;
  let sessionModel;
  let instance;

  const superLocals = {
    route: 'confirm-email',
    backLink: '/who-do-you-work-for',
    nextPage: '/check-inbox'
  };

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub()
    };
    res = reqres.res();
    req = reqres.req({sessionModel});
    sinon.stub(Base.prototype, 'locals').returns(superLocals);
    ConfirmEmailPasser = Behaviour(Base);
    instance = new ConfirmEmailPasser();
  });

  afterEach(() => {
    Base.prototype.locals.restore();
  });

  describe('locals', () => {
    it('returns an extended locals with the confirmEmail', () => {
      const expected = {
      route: 'confirm-email',
      backLink: '/who-do-you-work-for',
      nextPage: '/check-inbox',
      confirmEmail: 'test@mail.com'
    };

    req.sessionModel.get.withArgs('confirm-email').returns(expected.confirmEmail);
    const result = instance.locals(req, res);
    result.should.deep.equal(expected);
    });
  });
});
