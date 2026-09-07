'use strict';

const { updateAutomaticReferral } = require('../../../../apps/nrm/util/update-auto-referral.js');

describe('update automatic referral', () => {
  let req;
  let sessionModel;

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub(),
      unset: sinon.stub()
    };
    req = { sessionModel };
  });

  it('does nothing when the age value is undefined', () => {
    updateAutomaticReferral(req, undefined);

    sessionModel.set.should.not.have.been.called;
    sessionModel.unset.should.not.have.been.called;
  });

  it('sets auto referral for potential victim thats underage', () => {
    sessionModel.get.withArgs('steps').returns([]);

    updateAutomaticReferral(req, 'yes');

    sessionModel.set.should.have.been.calledWithExactly('automatic-referral', true);
    sessionModel.set.should.have.been.calledWithExactly('pv-want-to-submit-nrm', 'yes');
    sessionModel.set.should.have.been.calledWithExactly('is-referral', true);
    sessionModel.unset.should.have.been.calledWithExactly('does-pv-need-support');
  });

  it('clears referral values when the victim isnt underage and hasnt answered', () => {
    sessionModel.get.withArgs('steps').returns([]);

    updateAutomaticReferral(req, 'no');

    sessionModel.set.should.have.been.calledWithExactly('automatic-referral', false);
    sessionModel.unset.should.have.been.calledWithExactly('pv-want-to-submit-nrm');
    sessionModel.unset.should.have.been.calledWithExactly('is-referral');
  });

  it('preserves referral vals when the NRM question was already answered', () => {
    sessionModel.get.withArgs('steps').returns(['/pv-want-to-submit-nrm']);

    updateAutomaticReferral(req, 'no');

    sessionModel.set.should.have.been.calledWithExactly('automatic-referral', false);

    sessionModel.unset.should.not.have.been.called;
  });

  it('treats missing steps as no previous answer', () => {
    sessionModel.get.withArgs('steps').returns(undefined);

    updateAutomaticReferral(req, 'no');
    sessionModel.unset.should.have.been.calledWith('is-referral');
  });
});
