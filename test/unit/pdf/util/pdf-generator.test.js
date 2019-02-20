'use strict';

const proxyquire = require('proxyquire').noCallThru();

const html2pdfStub = sinon.stub();
const fsStub = {
  createReadStream: sinon.stub(),
  createWriteStream: sinon.stub()
};

const pdfGenerator = proxyquire('../../../../apps/pdf/util/pdf-generator',
  {
    'wkhtmltopdf': html2pdfStub,
    'fs': fsStub
  });

describe('/apps/pdf/util/pdf-generator', () => {
  it('calls wkhtmltopdf', () => {
    fsStub.createReadStream.returns('test');
    pdfGenerator.generate('<html></html>', 'path', 'myfile.pdf');
    html2pdfStub.should.have.been.calledWith('test');
  });

  it('is a promise', () => {
    pdfGenerator.generate('<html></html>', 'path', 'myfile.pdf').should.be.a('Promise');
  });

  describe('Promise', () => {
    it('rejects an error', () => {
      fsStub.createReadStream.yields('err', null);
      const result = pdfGenerator.generate('<html></html>', 'path', 'myfile.pdf');
        result.should.eventually.be.rejected;
    });
  });
});
