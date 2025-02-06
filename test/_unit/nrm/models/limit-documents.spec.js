'use strict';

const Behaviour = require('../../../../apps/nrm/behaviours/limit-documents');
const Controller = require('hof').controller;


describe("apps/nrm 'limit-documents' behaviour should ", () => {
  let behaviour;
  let req;
  let res;

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const LimitDocs = Behaviour(Controller);
    behaviour = new LimitDocs({ template: 'index', route: '/index' });
    behaviour._configure(req, res, done);
  });

  describe("The limit-documents '.validate' method", () => {
    it('returns a too many error if 250 files have already been added', () => {
      req.form.values.images = new Array(250);
      req.sessionModel.set('images', req.form.values.images);
      const images = req.sessionModel.get('images');
      req.form.values.image =   {
        name: 'quaver.png',
        encoding: '7bit',
        mimetype: 'png',
        truncated: false,
        size: 144150
      };
      images.push(req.form.values.image);
      behaviour.validate(req, res, err => {
        err.image.should.be.an.instanceof(behaviour.ValidationError);
        err.image.should.have.property('type').and.equal('tooMany');
      });
    });
  });
});
