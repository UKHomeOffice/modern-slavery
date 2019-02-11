'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();

const pdfGeneratorStub = {
  generate: sinon.stub()
};

const Behaviour = proxyquire('../../../../apps/pdf/behaviours/pdf',
  { '../util/pdf-generator': pdfGeneratorStub});

describe('/apps/pdf/behaviours/pdf', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  let req;
  let res;
  let PdfBehaviour;
  let instance;

  class Base {
    saveValues() {}
  }

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    PdfBehaviour = Behaviour(Base);
    instance = new PdfBehaviour();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    it('calls pdf generator', (done) => {
      instance.saveValues(req, res, () => {
        pdfGeneratorStub.generator.should.have.been.called;
        done();
      });
    });
  });
});
