'use strict';

const proxyquire = require('proxyquire').noCallThru();
const stream = require('stream');
const Readable = stream.Readable;
const Writable = stream.Writable;
let html2pdfStub = sinon.stub();
const fsStub = {
  createReadStream: sinon.stub(),
  createWriteStream: sinon.stub()
};
const pdfGenerator = proxyquire('../../../../apps/pdf/util/pdf-generator',
    {
      'fs': fsStub,
      'wkhtmltopdf': html2pdfStub
    });

describe('/apps/pdf/util/pdf-generator', () => {
  it('promise should be rejected', () => {
    html2pdfStub
    // yields calls the first callback with the arguments in the parenthesis
      .yields('err', null);
    const result = pdfGenerator.generate('nohtml', './path/', 'myfile.pdf');
    // always return with chai-as-promised for assertion
    // https://github.com/domenic/chai-as-promised/issues/238
    expect(result).to.be.a('Promise');
    return expect(result).to.be.rejected;
  });

  // need to create read and write streams for this test
  // so we can get the right response for the subsequent functions to work
  it('promise should be fulfilled', () => {
    const readStream = new Readable();
    readStream.push('your text here');
    readStream.push(null);
    const writeStream = new Writable();
    // https://stackoverflow.com/questions/21491567/how-to-implement-a-writable-stream
    // eslint-disable-next-line no-underscore-dangle
    writeStream._write = (chunk, encoding, done) => done();
    fsStub.createReadStream.returns(readStream);
    fsStub.createWriteStream.returns(writeStream);
    html2pdfStub.
      yields(null, readStream);
    // chai-promise requires a `return` in assertions for mocha to pick them up
    // https://github.com/domenic/chai-as-promised/issues/238
    const result = pdfGenerator.generate('<html></html>', 'path', 'myfile.pdf');
    expect(result).to.be.a('Promise');
    return expect(result).to.be.fulfilled;
  });
});
