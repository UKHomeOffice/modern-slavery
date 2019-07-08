'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/confirmation');

describe('/apps/nrm/behaviours/confirmation', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
  }

  let sessionModel;
  let req;
  let res;
  let instance;
  let next;
  let Confrimation;

  describe('process()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      next = sinon.stub();
      Confrimation = Behaviour(Base);
      instance = new Confrimation();
      sinon.stub(Base.prototype, 'process');
    });
    afterEach(() => {
      Base.prototype.process.restore();
    });

    it('calls the parent method after updating the page locals', async() => {
      req.sessionModel.get.withArgs('pv-want-to-submit-nrm').returns('no');

      await instance.process(req, res, next);
      expect(Base.prototype.process).to.have.been.called;
    });
  });
});
