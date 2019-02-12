'use strict';

const proxyquire = require('proxyquire').noCallThru();

const html2pdfStub = sinon.stub();
const fsStub = {
  createReadStream: sinon.stub()
};

const pdfGenerator = proxyquire('../../../../apps/pdf/util/pdf-generator',
  {
    'wkhtmltopdf': html2pdfStub,
    'fs': fsStub
  });

describe('/apps/pdf/util/pdf-generator', () => {
  it('calls wkhtmltopdf', () => {
    fsStub.createReadStream.returns('test');
    pdfGenerator.generate('<html></html>', './path/', 'myfile.pdf');
    html2pdfStub.should.have.been.calledWith('test', { output: './path//myfile.pdf'});
  });
});
