'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../../apps/nrm/behaviours/remove-file');

describe("apps/nrm 'remove-file' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    constructor() {}
    configure() {}
  }

  let req;
  let res;
  let instance;
  const next = 'foo';

  const images = [
    {
      name: 'violin.png',
      mimetype: 'image/png',
      id: 'a1',
      url: 'http://s3.com/foo/0.4283270873546463'
    },
    {
      name: 'piano.png',
      mimetype: 'image/png',
      id: 'b2',
      url: 'http://s3.com/foo/0.4283270873546463'
    }
  ];

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });
  describe("The 'configure' method ", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'configure').returns(req, res, next);
      instance = new (Behaviour(Base))();
    });

    it('should be called even if no images are to be removed', () => {
      instance.configure(req, res, next);
      expect(Base.prototype.configure).to.have.been.called;
      expect(req.sessionModel.get('images'));
    });

    it('should remove a file if an ID is passed to it', () => {
      req.sessionModel.set('images', images);
      req.query.delete = images[0].id;
      instance.configure(req, res, next);
      const remainginImages = req.sessionModel.get('images');
      remainginImages.map(image => {
        expect(image.id).to.not.equal(images[0].id);
      });
    });

    it('should redirect if a file is removed', () => {
      req.sessionModel.set('images', images);
      req.query.delete = images[0].id;
      instance.configure(req, res, next);
      expect(res.redirect).to.be.called;
    });
    afterEach(() => {
      Base.prototype.configure.restore();
    });
  });
});
