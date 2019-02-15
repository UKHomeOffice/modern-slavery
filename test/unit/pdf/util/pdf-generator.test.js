'use strict';

const proxyquire = require('proxyquire').noCallThru();

let html2pdfStub = sinon.stub();
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
  it('is a function', () => (typeof pdfGenerator.generate).should.equal('function'));

    it('promise should be rejected', () => {
      fsStub.createReadStream
        .yields('err', null);
      const result = pdfGenerator.generate('nohtml', './path/', 'myfile.pdf');
      result.should.be.a('Promise');
      result.should.eventually.be.rejected;
    });

    it('promise should be fulfilled', () => {
      html2pdfStub = {
        pipe: {
          on: sinon.stub
        }
      };
      fsStub.createWriteStream
        .yields(null, 'finish');
      const result = pdfGenerator.generate('<html><html>', './path/', 'myfile.pdf');
      result.should.be.a('Promise');
      result.should.eventually.be.fulfilled;
    });

    it('promise should be fulfilled', () => {
    const streamStub = {
        pipe: sinon.stub()
      };
      const onStub = sinon.stub();
      onStub.yields('finish');
      streamStub.pipe.yields(onStub);
      fsStub.createReadStream.yields(null, streamStub);
      const result = pdfGenerator.generate('<html></html>', 'path', 'myfile.pdf');
      result.should.eventually.be.fulfilled;
    });


  // describe('when it errors', () => {
  //   // getResponsesStub
  //   //   .withArgs('survey1', sinon.match.any)
  //   //   .yields(null, response);
  //   // result = SurveyApi.getData({surveyID: 'survey1'});
  //   let result;

  //   before(() => {
  //     fsStub.createReadStream
  //       .withArgs('<blah><blah>')
  //       .yields('error', null);
  //     result = pdfGenerator.generate('<blah></blah>', './path/', 'myfile.pdf');
  //   });
  //     it('rejects', () => result.should.eventually.be.rejected);
  //   after(() => {
  //     fsStub.reset();
  //   });
  // });


  // it('returns an error when it can not read a file', (done) => {
  //   // const err = new Error('test error');
  //   fsStub.createReadStream.returns(undefined);
  //   pdfGenerator.generate('<blah></blah>', './path/', 'myfile.pdf')
  //     .then((result) => {
  //       console.log('>>>>>', result);
  //       done();
  //     })
  //     .catch(err=> console.log(err));
  // });


  xit('calls wkhtmltopdf', () => {
    fsStub.createReadStream.returns('test');
    pdfGenerator.generate('<html></html>', './path/', 'myfile.pdf');
    html2pdfStub.should.have.been.calledWith('test', { output: './path//myfile.pdf'});
  });
});

// it('returns a promise', () => {
//     const response = pdfGenerator.generate('<html></html>', './path/', 'myfile.pdf');
//     response.should.to.be.an.instanceOf(Promise);
//   });

  
