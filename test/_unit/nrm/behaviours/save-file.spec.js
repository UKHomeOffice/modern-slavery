'use strict';

const expect = chai.expect;
const Behaviour = require('../../../../apps/nrm/behaviours/save-file');
const config = require('../../../../config');

describe("apps/nrm 'save-file' behaviour should ", () => {
  let req;
  let res;
  let next;
  let instance;

  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() { }
    locals() { }
    saveValues() { }
    validateField() { }
  }

  const uploadFiles = {
    'upload-file': {
      name: 'guitar.png',
      encoding: '7bit',
      mimetype: 'png',
      truncated: false,
      size: 144148
    }
  };

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = uploadFiles;
  });

  describe("The save-file ' process ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'process');
      instance = new (Behaviour('upload-file')(Base))();
    });

    it('should be called ', () => {
      instance.process(req);
      expect(Base.prototype.process).to.have.been.called;
    });

    it('should have a file attached to it', () => {
      req.files = uploadFiles;
      instance.process(req);
      expect(req.files).to.eql(uploadFiles);
    });

    it('should add files to form.values', () => {
      req.files.files = uploadFiles;
      instance.process(req);
      expect(req.form.values['upload-file']).to.eql('guitar.png');
    });

    after(() => {
      Base.prototype.process.restore();
    });
  });

  describe("The save-file ' locals ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      instance = new (Behaviour('name')(Base))();
    });

    it('should be called ', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).to.have.been.called;
    });
  });

  describe("The save-file ' saveValues ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      instance = new (Behaviour('name')(Base))();
    });

    it('should be called ', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.calledOnce;
    });

    it('should attach files to the sessionModel ', () => {
      req.sessionModel.set('files', uploadFiles);
      instance.saveValues(req, res, next);
      const sessionModel = req.sessionModel.get('files');
      expect(sessionModel['upload-file'].name).to.eql('guitar.png');
    });

    it('should redirect to /evidence-upload when on evidence upload page', () => {
      req.form.options.route = '/evidence-upload';
      req.sessionModel.set('files', uploadFiles);
      instance.saveValues(req, res, next);
      expect(req.form.options.route).to.eql('/evidence-upload');
    });

    after(() => {
      Base.prototype.saveValues.restore();
    });
  });

  describe("The save-file ' validateField ' method", () => {
    class MockValidationError {
      constructor(key, { key: errorKey, type, redirect }) {
        this.key = errorKey;
        this.type = type;
        this.redirect = redirect;
      }
    }
    beforeEach(() => {
      sinon.stub(Base.prototype, 'validateField').returns(null);
      instance = new (Behaviour('upload-file')(Base))();
      instance.ValidationError = MockValidationError;
      req = {
        body: {},
        sessionModel: {
          get: sinon.stub()
        },
        files: {}
      };
      this.key = 'upload-file';
    });

    afterEach(() => {
      Base.prototype.validateField.restore();
    });

    it('should return a validation error for invalid file size when the file is more than 25MB', function () {
      req.body['upload-file'] = true;
      const fileUpload = {
        data: Buffer.alloc(1024 * 1024 * 10, '.'),
        name: 'guitar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        truncated: false,
        size: 27000000
      };
      req.files = { 'upload-file': fileUpload };
      const key = 'upload-file';
      config.upload = {
        maxFileSize: 25000000,
        allowedMimeTypes: ['image/png', 'image/gif']
      };

      const result = instance.validateField(key, req);

      expect(result).to.be.an.instanceOf(MockValidationError);
      expect(result.type).to.equal('maxFileSize');
    });

    it('should return a validation error for invalid mimetype', function () {
      req.body['upload-file'] = true;
      const fileUpload = {
        data: Buffer.alloc(1024 * 1024 * 10, '.'),
        name: 'guitar.csv',
        encoding: '7bit',
        mimetype: 'text/csv',
        truncated: false,
        size: 10000
      };
      req.files = { 'upload-file': fileUpload };
      const key = 'upload-file';
      config.upload = {
        maxFileSize: 25000000,
        allowedMimeTypes: ['image/png', 'image/gif']
      };

      const result = instance.validateField(key, req);

      expect(result).to.be.an.instanceOf(MockValidationError);
      expect(result.type).to.equal('fileType');
    });

    it('should return a validation error for too many files', function () {
      req.body['upload-file'] = true;
      const fileUpload = {
        data: Buffer.alloc(1024 * 1024 * 10, '.'),
        name: 'guitar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        truncated: false,
        size: 10000
      };
      req.files = { 'upload-file': fileUpload };
      const key = 'upload-file';
      req.sessionModel.get.withArgs('files').returns(new Array(100).fill({}));

      const result = instance.validateField(key, req);

      expect(result).to.be.an.instanceOf(MockValidationError);
      expect(result.type).to.equal('tooMany');
    });

    it('should return null if the file is valid', function () {
      req.body['upload-file'] = true;
      const fileUpload = {
        data: Buffer.alloc(1024 * 1024 * 10, '.'),
        name: 'guitar.png',
        encoding: '7bit',
        mimetype: 'image/png',
        truncated: false,
        size: 10000
      };
      req.files = { 'upload-file': fileUpload };
      const key = 'upload-file';
      req.sessionModel.get.withArgs('files').returns([]);
      config.upload = {
        maxFileSize: 1000000,
        allowedMimeTypes: ['image/jpeg', 'image/png']
      };

      const result = instance.validateField(key, req);

      expect(result).to.equal(null);
    });
  });
});
