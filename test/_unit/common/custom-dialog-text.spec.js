'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../apps/common/behaviours/custom-dialog-text');

describe('/apps/common/behaviours/custom-dialog-text', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() { }
  }

  let req;
  let res;
  let instance;
  let CustomDialogText;

  const locals = {};

  describe('locals()', () => {
    beforeEach(() => {
      req = reqres.req();
      res = reqres.res();
      CustomDialogText = Behaviour(Base);
      req.translate = sinon.stub();
      instance = new CustomDialogText();
      sinon.stub(Base.prototype, 'locals').returns(locals);
    });
    afterEach(() => {
      Base.prototype.locals.restore();
    });

    it('returns dialogText as undefined if route is not reports, continue-report or are-you-sure', async () => {
      locals.route = 'start';
      const expected = {
        route: 'start'
      };
      const result = instance.locals(req, res);
      expect(result.dialogText).to.be.undefined;
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with dialogText set to true route is reports', async () => {
      locals.route = 'reports';
      const expected = {
        route: 'reports',
        dialogText: true
      };

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with dialogText set to true if route is continue-report', async () => {
      locals.route = 'continue-report';
      const expected = {
        route: 'continue-report',
        dialogText: true
      };

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });

    it('returns an extended locals with dialogText set to true if route is are-you-sure', async () => {
      locals.route = 'are-you-sure';
      const expected = {
        route: 'are-you-sure',
        dialogText: true
      };

      const result = instance.locals(req, res);
      result.should.deep.equal(expected);
    });
  });
});
