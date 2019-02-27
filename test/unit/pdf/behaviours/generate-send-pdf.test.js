'use strict';

const reqres = require('reqres');
const proxyquire = require('proxyquire').noCallThru();
const NotifyClient = require('notifications-node-client').NotifyClient;
const pdfGeneratorStub = {
  generate: sinon.stub()
};
const fsStub = {
  readFile: sinon.stub(),
  unlink: sinon.stub()
};

const Behaviour = proxyquire('../../../../apps/pdf/behaviours/generate-send-pdf',
  {
    '../util/pdf-generator': pdfGeneratorStub,
    'fs': fsStub
  }
);

describe('/apps/pdf/behaviours/generate-send-pdf', () => {
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
    req.form = {
      values: {
        email: 's@mail.com'
      }
    };
    res = reqres.res();
    PdfBehaviour = Behaviour(Base);
    instance = new PdfBehaviour();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      pdfGeneratorStub.generate.resolves('file');
      fsStub.readFile.yields(null, 'file');
      fsStub.unlink.yields(null);
      sinon.stub(Base.prototype, 'saveValues');
      sinon.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
      NotifyClient.prototype.sendEmail.restore();
    });

    // `async` functions makes it easier to manage multiple async functions.
    // Easier to read and write
    it('sends an email', async() => {
      await instance.saveValues(req, res, ()=> {});
      expect(NotifyClient.prototype.sendEmail).to.have.been.called;
    });

    it('calls pdf generator', async() => {
      await instance.saveValues(req, res, () => {});
      expect(pdfGeneratorStub.generate).to.have.been.called;
    });

    it('calls the callback in super', async() => {
      const spy = sinon.spy();
      await instance.saveValues(req, res, spy);
      expect(Base.prototype.saveValues).to.have.been.called;
    });
  });
});
