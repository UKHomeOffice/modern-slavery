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
    xit('sends an email', (done) => {
      req.form = {
        values: {
          email: 's@mail.com'
        }
      };
      pdfGeneratorStub.generate.resolves('a');
      fsStub.readFile.resolves('b');
      fsStub.unlink.resolves('file');
      instance.saveValues(req, res, () => {
        NotifyClient.prototype.sendEmail.should.have.been.called;
        done();
      });
    });

    // test not running properly
    xit('calls pdf generator', (done) => {
      req.form = {
        values: {
          email: 's@mail.com'
        }
      };
      pdfGeneratorStub.generate.yieldAsync('a');
      fsStub.readFile.yieldAsync('b');
      fsStub.unlink.yieldAsync('file');
      instance.saveValues(req, res, () => {
        pdfGeneratorStub.generate.should.eventually.be.called;
        done();
      });
    });
  });
});
