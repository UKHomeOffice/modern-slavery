'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/pv-under-age');

describe('/apps/nrm/behaviours/pv-under-age', () => {
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
  let PvUnderAge;

  let superLocals = {
    route: 'pv-under-age',
  };

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      PvUnderAge = Behaviour(Base);
      instance = new PvUnderAge();
      sinon.stub(Base.prototype, 'locals').returns(superLocals);
    });
    afterEach(() => {
      superLocals = {
        route: 'pv-under-age',
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with the isNo variable', async() => {
      const expected = {
        route: 'pv-under-age',
        isNo: true,
      };

      req.sessionModel.get.withArgs('pv-under-age').returns('no');

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the isYes variable', async() => {
      const expected = {
        route: 'pv-under-age',
        isYes: true,
      };

      req.sessionModel.get.withArgs('pv-under-age').returns('yes');

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the isNotSure variable', async() => {
      const expected = {
        route: 'pv-under-age',
        isNotSure: true,
      };

      req.sessionModel.get.withArgs('pv-under-age').returns('not-sure');

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

  });
});
