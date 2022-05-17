describe('the journey of a nrm application', () => {
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

  it('goes to the pv-under-age-at-time-of-exploitation page when user selects the pv is not under age', async () => {
    const URI = '/pv-under-age';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-under-age': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/pv-under-age-at-time-of-exploitation');
  });

  it('goes to the what-happened page when user enters selects not sure under age at time of exploitation', async () => {
    const URI = '/pv-under-age-at-time-of-exploitation';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-under-age-at-time-of-exploitation': 'not-sure'
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

  context('wants to submit nrm', () => {
    it('goes to the does-pv-need-support page when user wants to submit nrm', async () => {
      const URI = '/pv-want-to-submit-nrm';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-want-to-submit-nrm': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/does-pv-need-support');
    });

    it('goes to the /pv-name-referral page when user enters pv needs support', async () => {
      const URI = '/does-pv-need-support';
      await initSession(URI);
      const response = await passStep(URI, {
        'does-pv-need-support': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-referral');
    });

    it('goes to the /pv-name-referral page when user enters pv does not needs support', async () => {
      const URI = '/does-pv-need-support';
      await initSession(URI);
      const response = await passStep(URI, {
        'does-pv-need-support': 'yes'
      });

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

    it('goes to the who-contact page when user selects home office reference', async () => {
      const URI = '/pv-ho-reference';
      await initSession(URI, { 'pv-under-age': 'no' });
      const response = await passStep(URI, {
        'pv-ho-reference': 'yes',
        'pv-ho-reference-type': '123'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/who-contact');
    });

    it('goes to the who-contact page when user selects no home office reference', async () => {
      const URI = '/pv-ho-reference';
      await initSession(URI, { 'pv-under-age': 'no' });
      const response = await passStep(URI, {
        'pv-ho-reference': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/who-contact');
    });

    it('goes to the pv-contact-details-referral page when user enters who-contact', async () => {
      const URI = '/who-contact';
      await initSession(URI);
      const response = await passStep(URI, {
        'who-contact': 'potential-victim'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-contact-details-referral');
    });

    it('goes to the pv-phone-number page when user enters pv contact detatils', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-contact-details': [
          'email',
          'post'
        ],
        'pv-contact-details-email-input': 'test@test.com',
        'pv-contact-details-email-check': 'pv-contact-details-email-check',
        'pv-contact-details-street': '1 Street',
        'pv-contact-details-town': 'Funky Town',
        'pv-contact-details-county': 'Greater London',
        'pv-contact-details-postcode': 'PC1 1PC',
        'pv-contact-details-post-check': 'pv-contact-details-post-check'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-phone-number');
    });

    it('goes to the co-operate-with-police-referral page when user selects no phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/co-operate-with-police-referral');
    });

    it('goes to the co-operate-with-police-referral page when user enters pv phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'yes',
        'pv-phone-number-yes': '01234567890'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/co-operate-with-police-referral');
    });

    it('goes to the someone-else page when user enters who-contact', async () => {
      const URI = '/who-contact';
      await initSession(URI);
      const response = await passStep(URI, {
        'who-contact': 'someone-else'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/someone-else');
    });

    it('goes to the pv-phone-number page when user enters someone-else-details', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      const response = await passStep(URI, {
        'someone-else': [
          'email',
          'post'
        ],
        'someone-else-first-name': 'Ronald',
        'someone-else-last-name': 'Testman',
        'someone-else-email-input': 'test@test.com',
        'someone-else-street': ' 1 Street',
        'someone-else-town': 'Funky Town',
        'someone-else-county': 'Greater London',
        'someone-else-postcode': 'PC1 1PC',
        'someone-else-permission-check': 'someone-else-permission-check'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-phone-number');
    });

    it('goes to the co-operate-with-police-referral page when user selects no phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/co-operate-with-police-referral');
    });

    it('goes to the co-operate-with-police-referral page when user enters pv phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'yes',
        'pv-phone-number-yes': '01234567890'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/co-operate-with-police-referral');
    });

    it('goes to the fr-details page when user selects yes cooperate-with-police-referral', async () => {
      const URI = '/co-operate-with-police-referral';
      await initSession(URI);
      const response = await passStep(URI, {
        'co-operate-with-police': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/fr-details');
    });

    it('goes to the fr-details page when user selects not to cooperate-with-police-referral', async () => {
      const URI = '/co-operate-with-police-referral';
      await initSession(URI);
      const response = await passStep(URI, {
        'co-operate-with-police': 'no'
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

  context('does not want to submit nrm', () => {
    it('goes to the refuse-nrm page when user does not want to submit nrm', async () => {
      const URI = '/pv-want-to-submit-nrm';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-want-to-submit-nrm': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/refuse-nrm');
    });

    it('goes to the pv-gender-dtn page when user enters nrm refusal details', async () => {
      const URI = '/refuse-nrm';
      await initSession(URI);
      const response = await passStep(URI, {
        'refuse-nrm': 'Test'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-gender-dtn');
    });

    it('goes to the pv-nationality-dtn page when user selects gender', async () => {
      const URI = '/pv-gender-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-gender': 'female'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-nationality-dtn');
    });

    it('goes to the pv-nationality-dtn page when user selects gender', async () => {
      const URI = '/pv-gender-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-gender': 'male'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-nationality-dtn');
    });

    it('goes to the pv-nationality-dtn page when user selects gender', async () => {
      const URI = '/pv-gender-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-gender': 'unknown'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-nationality-dtn');
    });

    it('goes to the co-operate-with-police-dtn page when user selects nationality', async () => {
      const URI = '/pv-nationality-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-nationality': 'French'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/co-operate-with-police-dtn');
    });

    it('goes to the confirm page when user selects not to co-operate-with-police', async () => {
      const URI = '/co-operate-with-police-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'co-operate-with-police': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/confirm');
    });

    it('goes to the pv-name-dtn page when user selects to co-operate-with-police', async () => {
      const URI = '/co-operate-with-police-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'co-operate-with-police': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-dtn');
    });

    it('goes to the pv-contact-details-dtn page when user enters an organisation', async () => {
      const URI = '/pv-name-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-name-first-name': 'Ronald',
        'pv-name-last-name': 'Testman',
        'pv-name-nickname': 'Ron'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-contact-details-dtn');
    });

    it('goes to the confirm page when user enters an organisation', async () => {
      const URI = '/pv-contact-details-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-contact-details': [
          'email',
          'post'
        ],
        'pv-contact-details-email-input': 'test@test.com',
        'pv-contact-details-email-check': 'pv-contact-details-email-check',
        'pv-contact-details-street': '1 Street',
        'pv-contact-details-town': 'Funky Town',
        'pv-contact-details-county': 'Greater London',
        'pv-contact-details-postcode': 'PC1 1PC',
        'pv-contact-details-post-check': 'pv-contact-details-post-check'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/confirm');
    });
  });
});
