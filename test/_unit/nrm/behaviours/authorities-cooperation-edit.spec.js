'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/authorities-cooperation-edit');

describe('/apps/nrm/behaviours/authorities-cooperation-edit', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    saveValues() { }
  }

  let req;
  let res;
  let instance;
  let authoritiesCooperationEdit;

  const saveValues = {};
  describe('saveValues()', () => {
    beforeEach(() => {
      req = reqres.req();
      res = reqres.res();
      req.form = {
        values: {
          'authorities-cooperation': 'yes'
        },
        options: {
          steps: {
            '/authorities-cooperation': {
              behaviours: [Array],
              fields: [Array],
              next: '/pv-want-to-submit-nrm'
            }
          }
        }
      };
      authoritiesCooperationEdit = Behaviour(Base);
      instance = new authoritiesCooperationEdit();
      sinon.stub(Base.prototype, 'saveValues').returns(saveValues);
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    it('sets continueOnEdit to true if authorities-cooperation value is yes', () => {
      instance.saveValues(req, res);
      Base.prototype.saveValues.should.have.been.calledWith(req, res);
      req.form.options.continueOnEdit.should.equal(true);
      req.form.options.steps['/authorities-cooperation'].continueOnEdit.should.equal(true);
    });
  });
});
