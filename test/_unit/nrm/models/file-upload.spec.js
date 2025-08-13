const Model = require('../../../../apps/nrm/models/file-upload');
const config = require('../../../../config');
const FormData = require('form-data');

describe('File Upload Model', () => {
  let sandbox;

  beforeEach(function () {
    config.upload.hostname = 'http://file-upload.example.com/file/upload';
    sandbox = sinon.createSandbox();
    sandbox.stub(Model.prototype, 'request').returns({
      api: 'response',
      url: '/file/12341212132123?foo=bar'
    });
    sandbox.stub(Model.prototype, 'auth').returns(new Promise(resolve => {
      resolve({ bearer: 'myaccesstoken' });
    }));
  });

  afterEach(() => sandbox.restore());

  describe('save', () => {
    it('returns a promise', () => {
      const model = new Model();
      const response = model.save();
      expect(response).to.be.an.instanceOf(Promise);
    });

    it('makes a call to file upload api', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      await model.save();
      expect(model.request).to.have.been.calledOnce;
      expect(model.request).to.have.been.calledWith(sinon.match({
        method: 'POST',
        host: 'file-upload.example.com',
        path: '/file/upload',
        protocol: 'http:'
      }));
    });

    it('resolves with response from api endpoint', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const response = await model.save();
      expect(response.attributes.url).to.equal('/file/12341212132123?foo=bar');
    });

    it('rejects if api call fails', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const err = new Error('test error');
      model.request.rejects(err);
      try {
        await model.save();
      } catch (e) {
        expect(e).to.equal(err);
      }
    });

    it('rejects if api call triggers callback with error', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const err = new Error('test error');

      // Causes the stub to call the first callback it receives with the provided arguments
      model.request.yields(err);
      try {
        await model.save();
      } catch (e) {
        expect(e).to.equal(err);
      }
    });

    it('throws error if response does not have a URL', async () => {
      const model = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const dataNoUrl = {
        api: 'response'
      };
      model.request.resolves(dataNoUrl);
      try {
        await model.save();
      } catch (e) {
        expect(e.message).to.equal('Did not receive a URL from file-vault');
      }
    });

    it('adds a formData property to api request with details of uploaded file', async () => {
      const uploadedFile = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      await uploadedFile.save();
      expect(uploadedFile.request).to.have.been.calledWith(sinon.match({
        data: sinon.match.instanceOf(FormData)
      }));
    });
  });
});
