'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../../apps/nrm/behaviours/supporting-documents');
const UploadModel = require('../../../../apps/nrm/models/file-upload');

describe('/apps/nrm/behaviours/supporting-documents', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  let req;
  let res;
  let next;
  let SupportingDocuments;
  let instance;
  let ValidationError;

  class Base {
    process() {}
    ValidationError() {}
  }

  beforeEach(() => {
    res = reqres.res();
    req = reqres.req();
    req.form = {
      values: {}
    };
    next = sinon.stub();
    SupportingDocuments = Behaviour(Base);
    instance = new SupportingDocuments();
  });

  describe('process()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'process');
      ValidationError = sinon.stub(Base.prototype, 'ValidationError');
      sinon.stub(UploadModel.prototype, 'save');
    });
    afterEach(() => {
      Base.prototype.process.restore();
      Base.prototype.ValidationError.restore();
      UploadModel.prototype.save.restore();
    });

    it('errors when the file is too big i.e. truncated', () => {
      req.files = {
        'supporting-document-upload': {
          truncated: true
        }
      };
      instance.process(req, res, next);
      ValidationError.should.have.been.
        calledWith('supporting-document-upload', {
          type: 'filesize', arguments: ['100mb']
        });
    });

    it('calls next without hitting the upload API when the file is too big', () => {
      req.files = {
        'supporting-document-upload': {
          truncated: true
        }
      };
      instance.process(req, res, next);
      UploadModel.prototype.save.should.not.been.called;
      next.should.not.have.been.calledWithExactly();
      next.should.have.been.calledOnce;
    });

    it('calls next immediately & does not hit the upload API if no file is uploaded', () => {
      req.files = {
        'supporting-document-upload': {
          data: null
        }
      };
      instance.process(req, res, next);
      UploadModel.prototype.save.should.not.been.called;
      next.should.have.been.calledWithExactly();
      next.should.have.been.calledOnce;
    });

    it('saves the file to the uploaded model', () => {
      const result = {
        url: 'www.s3.com/foo'
      };
      UploadModel.prototype.save.resolves(result);

      req.files = {
        'supporting-document-upload': {
          data: 'picture',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };

      instance.process(req, res, next);
      UploadModel.prototype.save.should.been.called;
    });

    it('saves the file data to form values', (done) => {
      const result = {
        url: 'www.s3.com/foo'
      };
      UploadModel.prototype.save.resolves(result);

      req.files = {
        'supporting-document-upload': {
          data: 'some picture',
          name: 'myPhoto.jpg',
          mimetype: 'image/jpg'
        }
      };
      // async issues so process being called with a callback
      instance.process(req, res, () => {
        req.form.values['supporting-document-upload'].should.equal(result.url);
        done();
      });
    });

    it('calls next with an error if the model errors', (done) => {
      const err = new Error('oh noes!');
      UploadModel.prototype.save.rejects(err);

      req.files = {
        'supporting-document-upload': {
          data: 'some picture',
          name: 'myPhoto.jpg',
          mimetype: 'image/jpg'
        }
      };

      instance.process(req, res, (e) => {
        e.should.equal(err);
        done();
      });
    });
  });
});
