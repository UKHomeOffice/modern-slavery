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
    res = reqres.res();
    PdfBehaviour = Behaviour(Base);
    instance = new PdfBehaviour();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues');
      sinon.stub(NotifyClient.prototype, 'sendEmail').resolves('email sent');
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
      NotifyClient.prototype.sendEmail.restore();
    });

    // test not running properly
    xit('sends an email', () => {
      req.form = {
        values: {
          email: 's@mail.com'
        }
      };
      pdfGeneratorStub.generate.resolves('file');
      fsStub.readFile.yields(null, 'file');
      fsStub.unlink.yields(null);
      instance.saveValues(req, res, () => {
        return expect(NotifyClient.prototype.sendEmail).to.have.been.called;
      });
    });

    // test not running properly
    xit('calls pdf generator', () => {
      req.form = {
        values: {
          email: 's@mail.com'
        }
      };
            pdfGeneratorStub.generate.resolves('file');
      fsStub.readFile.yields(null, 'file');
      fsStub.unlink.yields(null);
      instance.saveValues(req, res, () => {
        return expect(pdfGeneratorStub.generate).to.be.called;
      });
    });
  });
});
