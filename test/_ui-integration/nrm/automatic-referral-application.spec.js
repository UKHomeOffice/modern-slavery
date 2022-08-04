describe('the journey of a nrm automatic referral application', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'nrm';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  it('goes to the reports page', async () => {
    const URI = '/start?token=skip';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /nrm/reports');
  });

  it('goes to the reference page', async () => {
    const URI = '/reports';
    await initSession(URI);
    const response = await passStep(URI, {});
    expect(response.text).to.contain('Found. Redirecting to /nrm/reference');
  });

  it('goes to the organisation page when user enters a reference', async () => {
    const URI = '/reference';
    await initSession(URI);
    const response = await passStep(URI, {
      reference: '123'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/organisation');
  });

  it('goes to the fr-location page when user enters an organisation', async () => {
    const URI = '/organisation';
    await initSession(URI);
    const response = await passStep(URI, {
      'user-organisation': 'Aberdeen City Council'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/fr-location');
  });

  it('goes to the pv-under-age page when user enters a first responder location', async () => {
    const URI = '/fr-location';
    await initSession(URI);
    const response = await passStep(URI, {
      'fr-location': 'england'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-under-age');
  });

  it('goes to the local-authority-contacted-about-child page when user selects the pv is under age', async () => {
    const URI = '/pv-under-age';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-under-age': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/local-authority-contacted-about-child');
  });

  it('goes to the local-authority-contacted-about-child page when user selects not sure pv is under age', async () => {
    const URI = '/pv-under-age';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-under-age': 'not-sure'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/local-authority-contacted-about-child');
  });

  it('goes to the what-happened page when user enters details of local authority contacted', async () => {
    const URI = '/local-authority-contacted-about-child';
    await initSession(URI);
    const response = await passStep(URI, {
      'local-authority-contacted-about-child-local-authority-name': 'The Aberdeen City Council',
      'local-authority-contacted-about-child-local-authority-phone': '07550130130',
      'local-authority-contacted-about-child-local-authority-email': 'test@test.com',
      'local-authority-contacted-about-child-local-authority-first-name': 'Ronald',
      'local-authority-contacted-about-child-local-authority-last-name': 'Testman'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/what-happened');
  });

  it('goes to the where-exploitation-happened page when user enters what happened', async () => {
    const URI = '/what-happened';
    await initSession(URI);
    const response = await passStep(URI, {
      'what-happened': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/where-exploitation-happened');
  });

  it('goes to the where-exploitation-happened-uk page when user selects UK', async () => {
    const URI = '/where-exploitation-happened';
    await initSession(URI);
    const response = await passStep(URI, {
      'where-exploitation-happened': 'uk'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/where-exploitation-happened-uk');
  });

  it('goes to the where-exploitation-happened-overseas page when user selects overseas', async () => {
    const URI = '/where-exploitation-happened';
    await initSession(URI);
    const response = await passStep(URI, {
      'where-exploitation-happened': 'overseas'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/where-exploitation-happened-overseas');
  });

  it('goes to the current-pv-location page when user enters an where exploitation happened', async () => {
    const URI = '/where-exploitation-happened-uk';
    await initSession(URI);
    const response = await passStep(URI, {
      'where-exploitation-happened-uk-city-1': 'Aberdeen'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/current-pv-location');
  });

  it('goes to the who-exploited-pv page when user enters current-pv-location', async () => {
    const URI = '/current-pv-location';
    await initSession(URI);
    const response = await passStep(URI, {
      'current-pv-location-uk-city': 'London',
      'current-pv-location-uk-region': 'Greater London'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/who-exploited-pv');
  });

  it('goes to the types-of-exploitation page when user enters who-exploited-pv', async () => {
    const URI = '/who-exploited-pv';
    await initSession(URI);
    const response = await passStep(URI, {
      'who-exploited-pv': 'Ronald Testman'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/types-of-exploitation');
  });

  it('goes to the any-other-pvs page when user enters the type of exploitation', async () => {
    const URI = '/types-of-exploitation';
    await initSession(URI);
    const response = await passStep(URI, {
      'types-of-exploitation-forced-to-work': true,
      'types-of-exploitation-wages-taken': true,
      'types-of-exploitation-forced-to-commit-fraud': true,
      'types-of-exploitation-prostitution': true,
      'types-of-exploitation-child-exploitation': true,
      'types-of-exploitation-taken-somewhere': true,
      'types-of-exploitation-forced-to-commit-crime': true,
      'types-of-exploitation-organs-removed': true,
      'types-of-exploitation-unpaid-household-work': true,
      'types-of-exploitation-other': true,
      'other-exploitation-details': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/any-other-pvs');
  });

  it('goes to the reported-to-police page when user enters any other potential victims', async () => {
    const URI = '/any-other-pvs';
    await initSession(URI);
    const response = await passStep(URI, {
      'any-other-pvs': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/reported-to-police');
  });

  it('goes to the reported-to-police page when user enters no other potential victims', async () => {
    const URI = '/any-other-pvs';
    await initSession(URI);
    const response = await passStep(URI, {
      'any-other-pvs': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/reported-to-police');
  });

  it('goes to the reported-to-police page when user enters not sure of any other potential victims', async () => {
    const URI = '/any-other-pvs';
    await initSession(URI);
    const response = await passStep(URI, {
      'any-other-pvs': 'not-sure'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/reported-to-police');
  });

  it('goes to the pv-want-to-submit-nrm page when user enters reported-to-police', async () => {
    const URI = '/reported-to-police';
    await initSession(URI);
    const response = await passStep(URI, {
      'reported-to-police': 'yes',
      'reported-to-police-police-forces': ' City of London Police',
      'reported-to-police-crime-reference': '123'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-want-to-submit-nrm');
  });

  it('goes to the pv-want-to-submit-nrm page when user enters reported-to-police', async () => {
    const URI = '/reported-to-police';
    await initSession(URI);
    const response = await passStep(URI, {
      'reported-to-police': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-want-to-submit-nrm');
  });

  it('goes to the /pv-name-referral page after the pv-want-to-submit-nrm', async () => {
    const URI = '/pv-want-to-submit-nrm';
    await initSession(URI, { 'automatic-referral': true });
    const response = await passStep(URI, {});

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-referral');
  });

  it('goes to the pv-dob page when user enters an pv-name-referral', async () => {
    const URI = '/pv-name-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-name-first-name': 'Ronald',
      'pv-name-last-name': 'Testman',
      'pv-name-nickname': 'Ron'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-dob');
  });

  it('goes to the pv-gender-referral page when user enters pv-dob', async () => {
    const URI = '/pv-dob';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-dob': '2000-02-01'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-gender-referral');
  });

  it('goes to the does-pv-have-children page when user enters an pv-gender', async () => {
    const URI = '/pv-gender-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-gender': 'male'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/does-pv-have-children');
  });

  it('goes to the does-pv-have-children page when user enters an pv-gender', async () => {
    const URI = '/pv-gender-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-gender': 'female'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/does-pv-have-children');
  });

  it('goes to the does-pv-have-children page when user enters an pv-gender', async () => {
    const URI = '/pv-gender-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-gender': 'unknown'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/does-pv-have-children');
  });

  it('goes to the pv-nationality-referral page when user enters pv does not have children', async () => {
    const URI = '/does-pv-have-children';
    await initSession(URI);
    const response = await passStep(URI, {
      'does-pv-have-children': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-nationality-referral');
  });

  it('goes to the pv-nationality-referral page when user enters pv has children', async () => {
    const URI = '/does-pv-have-children';
    await initSession(URI);
    const response = await passStep(URI, {
      'does-pv-have-children': 'yes',
      'does-pv-have-children-yes-amount': '2'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-nationality-referral');
  });

  it('goes to the pv-interpreter-requirements page when user enters pv nationality', async () => {
    const URI = '/pv-nationality-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-nationality': 'British',
      'pv-nationality-second': 'Jamaican'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-interpreter-requirements');
  });

  it('goes to the pv-other-help-with-communication page when user selects interpreter requirements', async () => {
    const URI = '/pv-interpreter-requirements';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-interpreter-requirements': 'yes',
      'pv-interpreter-requirements-language': 'Spanish'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-other-help-with-communication');
  });

  it('goes to the pv-other-help-with-communication page when user selects no interpreter requirements', async () => {
    const URI = '/pv-interpreter-requirements';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-interpreter-requirements': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-other-help-with-communication');
  });

  it('goes to the pv-ho-reference page when user selects no other communication help', async () => {
    const URI = '/pv-other-help-with-communication';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-other-help-with-communication': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-ho-reference');
  });

  it('goes to the pv-ho-reference page when user selects other communication help', async () => {
    const URI = '/pv-other-help-with-communication';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-other-help-with-communication': 'yes',
      'pv-other-help-with-communication-aid': 'Hearing aid'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-ho-reference');
  });

  it('goes to the fr-details page when user selects home office reference', async () => {
    const URI = '/pv-ho-reference';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-ho-reference': 'yes',
      'pv-ho-reference-type': '123'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/fr-details');
  });

  it('goes to the fr-alternative-contact page when user enters an first responder details', async () => {
    const URI = '/fr-details';
    await initSession(URI);
    const response = await passStep(URI, {
      'fr-details-first-name': 'Ronald',
      'fr-details-last-name': 'Testman',
      'fr-details-role': 'Alternate',
      'fr-details-phone': '012345678901'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/fr-alternative-contact');
  });

  it('goes to the confirm page when user enters an first responder alternative contact', async () => {
    const URI = '/fr-alternative-contact';
    await initSession(URI);
    const response = await passStep(URI, {
      'fr-alternative-contact': 'test@test.com'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/confirm');
  });
});
