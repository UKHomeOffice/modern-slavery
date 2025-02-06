'use strict';

const expect = chai.expect;
const Behaviour = require('../../../../apps/nrm/behaviours/save-file');

describe("apps/nrm 'save-file' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
    locals() {}
    saveValues() {}
  }

  let req;
  let res;
  let next;

  let instance;

  const imageFiles = {
    file: {
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
    req.files = imageFiles;
  });

  describe("The save-file ' process ' method", () => {
    before(() => {
      sinon.stub(Base.prototype, 'process');
      instance = new (Behaviour('file')(Base))();
    });

    it('should be called ', () => {
      instance.process(req);
      expect(Base.prototype.process).to.have.been.called;
    });

    it('should have a file attached to it', () => {
      req.files = imageFiles;
      instance.process(req);
      expect(req.files).to.eql(imageFiles);
    });

    it('should add files to form.values', () => {
      req.files.files = imageFiles;
      instance.process(req);
      expect(req.form.values.file).to.eql('guitar.png');
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
      req.sessionModel.set('files', imageFiles);
      instance.saveValues(req, res, next);
      const sessionModel = req.sessionModel.get('files');
      expect(sessionModel.file.name).to.eql('guitar.png');
    });

    it('should redirect to /evidence-upload when on evidence upload page', () => {
      req.form.options.route = '/evidence-upload';
      req.sessionModel.set('files', imageFiles);
      instance.saveValues(req, res, next);
      expect(req.form.options.route).to.eql('/evidence-upload');
    });

    after(() => {
      Base.prototype.saveValues.restore();
    });
  });
});
