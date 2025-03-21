/* eslint-disable max-len */

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

  it('goes to the what-is-their-background page when user enters selects not sure under age at time of exploitation', async () => {
    const URI = '/pv-under-age-at-time-of-exploitation';
    await initSession(URI);
    const response = await passStep(URI, {
      'pv-under-age-at-time-of-exploitation': 'not-sure'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/what-is-their-background');
  });

  it('goes to the when-did-the-exploitation-take-place page when user enters their background', async () => {
    const URI = '/what-is-their-background';
    await initSession(URI);
    const response = await passStep(URI, {
      birthplace: 'Test',
      family: 'Test',
      education: 'Test',
      'employment-history': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/when-did-the-exploitation-take-place');
  });

  it('goes to the more-than-one-exploitation-situation page when user enters Date(s) of exploitation', async () => {
    const URI = '/when-did-the-exploitation-take-place';
    await initSession(URI);
    const response = await passStep(URI, {
      'when-did-the-exploitation-take-place': '2000-01-01'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/more-than-one-exploitation-situation');
  });

  it('goes to the how-did-the-exploitation-start page when user enters more exploitation details', async () => {
    const URI = '/more-than-one-exploitation-situation';
    await initSession(URI);
    const response = await passStep(URI, {
      'more-than-one-exploitation-situation': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/how-did-the-exploitation-start');
  });

  it('goes to the were-they-taken-somewhere-by-their-exploiter page when user enters how they came to be exploited', async () => {
    const URI = '/how-did-the-exploitation-start';
    await initSession(URI);
    const response = await passStep(URI, {
      'how-did-the-exploitation-start': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/were-they-taken-somewhere-by-their-exploiter');
  });

  it('goes to the how-they-were-treated page when user was taken & enters details', async () => {
    const URI = '/were-they-taken-somewhere-by-their-exploiter';
    await initSession(URI);
    const response = await passStep(URI, {
      'were-they-taken-somewhere-by-their-exploiter': 'yes',
      'were-they-taken-somewhere-by-their-exploiter-journey-details': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/how-they-were-treated');
  });

  it('goes to the how-why-did-they-leave-the-situation page when user enters how were they treated during their exploitation',
    async () => {
      const URI = '/how-they-were-treated';
      await initSession(URI);
      const response = await passStep(URI, {
        'what-were-they-required-to-do': 'Test',
        'how-they-were-treated': 'Test',
        'why-they-stayed': 'Test'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/how-why-did-they-leave-the-situation');
    });

  it('goes to the when-last-contact page when user enters how and why did they leave the situation',
    async () => {
      const URI = '/how-why-did-they-leave-the-situation';
      await initSession(URI);
      const response = await passStep(URI, {
        'how-why-did-they-leave-the-situation': 'Test'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/when-last-contact');
    });

  it('goes to the details-last-contact page when user selects within the last week',
    async () => {
      const URI = '/when-last-contact';
      await initSession(URI);
      const response = await passStep(URI, {
        'when-last-contact': 'within-the-last-week'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/details-last-contact');
    });

  it('goes to the is-this-the-first-chance-to-report page when user enters optional details of last contact',
    async () => {
      const URI = '/details-last-contact';
      await initSession(URI);
      const response = await passStep(URI, {
        'details-last-contact': 'optional text'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/is-this-the-first-chance-to-report');
    });

  it('goes to the why-report-now page when user selects no', async () => {
    const URI = '/is-this-the-first-chance-to-report';
    await initSession(URI);
    const response = await passStep(URI, {
      'is-this-the-first-chance-to-report': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/why-report-now');
  });

  it('goes to the why-are-you-making-the-referral page when user enters why are they reporting this now?', async () => {
    const URI = '/why-report-now';
    await initSession(URI);
    const response = await passStep(URI, {
      'why-report-now': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/why-are-you-making-the-referral');
  });

  it('goes to the where-how-interview-carried-out page when user enters why are you making the referral?', async () => {
    const URI = '/why-are-you-making-the-referral';
    await initSession(URI);
    const response = await passStep(URI, {
      'why-are-you-making-the-referral': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/where-how-interview-carried-out');
  });

  it('goes to the are-others-involved page when user enters where and how the interview was carried out',
    async () => {
      const URI = '/where-how-interview-carried-out';
      await initSession(URI);
      const response = await passStep(URI, {
        'where-how-interview-carried-out': 'Test'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/are-others-involved');
    });

  it('goes to the evidence-of-dishonesty page when user selects others were involved and enter details', async () => {
    const URI = '/are-others-involved';
    await initSession(URI);
    const response = await passStep(URI, {
      'are-others-involved': 'yes',
      'are-others-involved-details': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/evidence-of-dishonesty');
  });

  it('goes to the what-evidence-you-will-submit page when user selects there was evidence of dishonesty and enters details', async () => {
    const URI = '/evidence-of-dishonesty';
    await initSession(URI);
    const response = await passStep(URI, {
      'evidence-of-dishonesty': 'yes',
      'evidence-of-dishonesty-details': 'Test'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/what-evidence-you-will-submit');
  });

  it('goes to the where-exploitation-happened page when user user enters details', async () => {
    const URI = '/what-evidence-you-will-submit';
    await initSession(URI);
    const response = await passStep(URI, {
      'what-evidence-you-will-submit': 'Test'
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
  it('goes to the exploiters-location page when user enters who-exploited-pv', async () => {
    const URI = '/who-exploited-pv';
    await initSession(URI);
    const response = await passStep(URI, {
      'who-exploited-pv': 'Ronald Testman'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/exploiters-location');
  });

  it('goes to the are-exploiters-in-the-uk page when user knows exploiters location', async () => {
    const URI = '/exploiters-location';
    await initSession(URI);
    const response = await passStep(URI, {
      'exploiters-location': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/are-exploiters-in-the-uk');
  });

  it('goes to the exploiters-current-location-details page when user selects exploiters are in the uk', async () => {
    const URI = '/are-exploiters-in-the-uk';
    await initSession(URI);
    const response = await passStep(URI, {
      'are-exploiters-in-the-uk': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/exploiters-current-location-details');
  });

  it('goes to the types-of-exploitation page when user enters exploiters current location details', async () => {
    const URI = '/exploiters-current-location-details';
    await initSession(URI);
    const response = await passStep(URI, {
      'exploiters-current-location-details': 'Some details where actual exploiters location is'
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

  it('goes to the future-exploitation page when user enters any other potential victims', async () => {
    const URI = '/any-other-pvs';
    await initSession(URI);
    const response = await passStep(URI, {
      'any-other-pvs': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/future-exploitation');
  });

  it('goes to the concerns-future-exploitation page when user choose yes option', async () => {
    const URI = '/future-exploitation';
    await initSession(URI);
    const response = await passStep(URI, {
      'future-exploitation-concerns': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/concerns-future-exploitation');
  });

  it('goes to the reported-to-police page when user provide reason', async () => {
    const URI = '/concerns-future-exploitation';
    await initSession(URI);
    const response = await passStep(URI, {
      'future-exploitation-reasons': 'some reasons of future exploitation'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/reported-to-police');
  });

  it('goes to the authorities-cooperation page when user reported to police', async () => {
    const URI = '/reported-to-police';
    await initSession(URI);
    const response = await passStep(URI, {
      'reported-to-police': 'yes',
      'reported-to-police-police-forces': ' City of London Police',
      'reported-to-police-crime-reference': '123'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/authorities-cooperation');
  });

  it('goes to the authorities-cooperation page when user did not report to police', async () => {
    const URI = '/reported-to-police';
    await initSession(URI);
    const response = await passStep(URI, {
      'reported-to-police': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /nrm/authorities-cooperation');
  });

  it('goes to the pv-want-to-submit-nrm page when user will cooperate with authorities', async () => {
    const URI = '/authorities-cooperation';
    await initSession(URI);
    const response = await passStep(URI, {
      'authorities-cooperation': 'yes',
      'authorities-cooperation-details': 'some co-operation details'
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

    it('goes to the /pv-phone-number page when user enters pv needs support', async () => {
      const URI = '/does-pv-need-support';
      await initSession(URI);
      const response = await passStep(URI, {
        'does-pv-need-support': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-phone-number');
    });

    it('goes to the pv-name-referral page when user enters pv phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'yes',
        'pv-phone-number-yes': '01234567890'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-referral');
    });

    it('goes to the pv-name-referral page when user enters an alternative pv phone number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'pv-alternative-number',
        'pv-phone-number-alternative': '01234567891',
        'alternative-number-relation-to-pv': 'Friend'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-referral');
    });

    it('goes to the pv-name-referral page when user selects no contact details number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-phone-number': 'no',
        'no-contact-details': 'Do not have a phone'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/pv-name-referral');
    });

    it('goes to the /pv-name-referral page when user enters pv does not needs support', async () => {
      const URI = '/does-pv-need-support';
      await initSession(URI);
      const response = await passStep(URI, {
        'does-pv-need-support': 'no'
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

    it('goes to the fr-details page when user enters pv contact detatils', async () => {
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

      expect(response.text).to.contain('Found. Redirecting to /nrm/fr-details');
    });

    it('goes to the someone-else page when user enters who-contact', async () => {
      const URI = '/who-contact';
      await initSession(URI);
      const response = await passStep(URI, {
        'who-contact': 'someone-else'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/someone-else');
    });

    it('goes to the fr-details page when user enters someone-else-details', async () => {
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

    it('goes to the confirm page when user selects nationality', async () => {
      const URI = '/pv-nationality-dtn';
      await initSession(URI);
      const response = await passStep(URI, {
        'pv-nationality': 'French'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/confirm');
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
