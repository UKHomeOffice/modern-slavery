'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/confirmation');

describe('/apps/nrm/behaviours/confirmation', () => {
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
  let Confirmation;

  let superLocals = {
    route: 'confirmation',
  };

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      Confirmation = Behaviour(Base);
      instance = new Confirmation();
      sinon.stub(Base.prototype, 'locals').returns(superLocals);
    });
    afterEach(() => {
      superLocals = {
        route: 'confirmation',
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with the isDtn variable', async() => {
      const expected = {
        route: 'confirmation',
        isDtn: true,
      };

      req.sessionModel.get.withArgs('pv-want-to-submit-nrm').returns('no');

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the isNrm variable', async() => {
      const expected = {
        route: 'confirmation',
        isNrm: true,
      };

      req.sessionModel.get.withArgs('pv-want-to-submit-nrm').returns('yes');

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

  });
});
