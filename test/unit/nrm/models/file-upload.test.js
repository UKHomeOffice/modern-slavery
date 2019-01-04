'use strict';

const Model = require('../../../../apps/nrm/models/file-upload');
const config = require('../../../../config');

describe('/apps/nrm/models/file-upload', () => {

  beforeEach(function() {
    config.upload.hostname = 'http://test.example.com/file/upload';
    sinon.stub(Model.prototype, 'request').yieldsAsync(null, {
      api: 'response',
      url: '/file/1234/?foo=bar'
    });

    sinon.stub(Model.prototype, 'auth').returns(new Promise((resolve) => {
      resolve({bearer: 'testbearertoken'});
    }));
  });

  afterEach(() => {
    Model.prototype.request.restore();
    Model.prototype.auth.restore();
  });

  describe('save', () => {
    it('returns a promise', () => {
      const model = new Model();
      const response = model.save();
      response.should.to.be.an.instanceOf(Promise);
    });

    it('calls the file upload api', () => {
      const model = new Model();
      const response = model.save();
      return response.then(() => {
        model.request.should.have.been.calledOnce;
        model.request.should.have.been.calledWith(sinon.match({
          method: 'POST',
          host: 'test.example.com',
          path: '/file/upload',
          protocol: 'http:'
        }));
      });
    });

    it('resolves with a response from the api endpoint', () => {
      const model = new Model();
      const response = model.save();
      return response.should.eventually.deep.equal({
        api: 'response',
        url: '/vault/1234/?foo=bar&token=testbearertoken'
      });
    });

    it('rejects if api call fails', () => {
      const model = new Model();
      const err = new Error('test error');
      model.request.yieldsAsync(err);
      const response = model.save();
      return response.should.to.be.rejectedWith(err);
    });

    it('adds a formData property to api request with the uploaded file', () => {
      const model = new Model({
        data: 'foo',
        name: 'test.png',
        mimetype: 'image/png'
      });
      const response = model.save();
      return response.then(() => {
        model.request.should.have.been.calledWith(sinon.match({
          formData: {
            document: {
              options: {
                contentType: 'image/png', filename: 'test.png' }, value: 'foo'
            }
          }
        }));
      });
    });
  });
});

