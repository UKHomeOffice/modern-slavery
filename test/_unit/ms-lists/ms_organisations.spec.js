const organisations = require('../../../ms-lists/ms_organisations');

describe('ms_organisations', () => {
  it('should return an array of organisations', () => {
    expect(organisations).to.be.an('array').that.is.not.empty;
    expect(organisations).to.have.lengthOf(527);
  });

  it('should expose organisation entries as value/label pairs', () => {
    organisations.slice(0, 5).forEach(organisation => {
      expect(organisation).to.have.property('value').that.is.a('string');
      expect(organisation).to.have.property('label').that.is.a('string');
      expect(organisation.value).to.equal(organisation.label);
    });
  });

  it('should contain known organisations', () => {
    expect(organisations).to.deep.include({
      value: 'Home Office - UK Border Force UKBF',
      label: 'Home Office - UK Border Force UKBF'
    });
    expect(organisations).to.deep.include({
      value: 'Home Office - Immigration Enforcement IE - DET Heathrow',
      label: 'Home Office - Immigration Enforcement IE - DET Heathrow'
    });
  });

  it('should not contain UK Visas and Immigration UKVI and Immigration Enforcement IE', () => {
    const organisationValues = organisations.map(
      organisation => organisation.value
    );

    expect(organisationValues).to.not.include(
      'Home Office - UK Visas and Immigration UKVI'
    );
    expect(organisationValues).to.not.include(
      'Home Office - Immigration Enforcement IE'
    );
  });
});
