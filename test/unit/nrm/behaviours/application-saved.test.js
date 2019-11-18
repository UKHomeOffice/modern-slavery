'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/application-saved');

describe('/apps/nrm/behaviours/application-saved', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
    getValues() {}
  }

  let sessionModel;
  let req;
  let res;
  let instance;
  let ApplicationSaved;

  let superLocals = {
    route: 'application-saved',
  };

  describe('locals()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      ApplicationSaved = Behaviour(Base);
      instance = new ApplicationSaved();
      sinon.stub(Base.prototype, 'locals').returns(superLocals);
    });
    afterEach(() => {
      superLocals = {
        route: 'application-saved',
      };

      Base.prototype.locals.restore();
    });

    it('returns an extended locals with the applicationSavedSuccessfully variable', async() => {
      const expected = {
        route: 'application-saved',
        applicationSavedSuccessfully: true,
      };

      req.sessionModel.get.withArgs('application-id').returns(true);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with the applicationNotSaved variable', async() => {
      const expected = {
        route: 'application-saved',
        applicationNotSaved: true,
      };

      req.sessionModel.get.withArgs('application-id').returns(undefined);

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

  });

  describe('getValues()', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub(),
        unset: sinon.stub(),
        toJSON: sinon.stub(),
      };
      req = reqres.req({ sessionModel });
      res = reqres.res();
      ApplicationSaved = Behaviour(Base);
      instance = new ApplicationSaved();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    it('should set application-id and unset application-save-error if no error is thrown', async() => {
        await instance.getValues(req, res, ()=> {});
        expect(sessionModel.set).to.have.been.calledWith('application-id');
        expect(sessionModel.unset).to.have.been.calledWith('application-save-error');
    });
  });
});
