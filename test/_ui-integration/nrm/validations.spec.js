describe('validation checks of the nrm journey', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;

  const SUBAPP = 'nrm';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  describe('Reports Validation', () => {
    it('does not pass the reports page if nothing entered', async () => {
      const URI = '/reports';
      await initSession(URI);
      const response = await passStep(URI, {});

      expect(response.text).to.contain('Found. Redirecting to /nrm/reference');
    });
  });

  describe('Reference Validation', () => {
    it('does not pass the reference page if nothing entered', async () => {
      const URI = '/reference';
      await initSession(URI);
      await passStep(URI, {});
      const result = await getUrl(URI);
      const docu = await parseHtml(result);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a reference/);
    });
  });

  describe('Organisation Validation', () => {
    it('does not pass the organisation page if nothing entered', async () => {
      const URI = '/organisation';
      await initSession(URI);
      await passStep(URI, {});
      const result = await getUrl(URI);
      const docu = await parseHtml(result);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the organisation/);
    });
  });

  describe('First Responder Location Validation', () => {
    it('does not pass the fr-location page if nothing entered', async () => {
      const URI = '/fr-location';
      await initSession(URI);
      await passStep(URI, {});
      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a region/);
    });
  });

  describe('Potential Victim Under Age Validation', () => {
    it('does not pass the potential victim under age page if nothing entered', async () => {
      const URI = '/pv-under-age';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('Local Authority Contacted About Child Validation', () => {
    it('does not pass the local authority contacted about child page if nothing entered', async () => {
      const URI = '/local-authority-contacted-about-child';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the local authority from the list/)
        .to.match(/You must enter a phone number/)
        .to.match(/Enter a valid email address/);
    });
  });

  describe('Potential Victim Under Age At Time Validation', () => {
    it('does not pass the potential victim under age at the time page if nothing entered', async () => {
      const URI = '/pv-under-age-at-time-of-exploitation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('What Happened Validation', () => {
    it('does not pass the what happened page if nothing entered', async () => {
      const URI = '/what-happened';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter details of the exploitation/);
    });
  });

  describe('Where Exploitation Happened Validation', () => {
    it('does not pass the where-exploitation-happened page if nothing entered', async () => {
      const URI = '/where-exploitation-happened';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('Where Exploitation Happened UK Validation', () => {
    it('does not pass the where-exploitation-happened-uk page if nothing entered', async () => {
      const URI = '/where-exploitation-happened-uk';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select a city or town from the list/);
    });
  });

  describe('Where Exploitation Happened Overseas Validation', () => {
    it('does not pass the where-exploitation-happened-overseas page if nothing entered', async () => {
      const URI = '/where-exploitation-happened-overseas';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select a country from the list/);
    });
  });

  describe('Current PV Validations', () => {
    it('does not pass the current pv location page if nothing entered', async () => {
      const URI = '/current-pv-location';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select a city from the list/);
      expect(validationSummary.html())
        .to.match(/You must select a region from the list/);
    });
  });

  describe('Who Exploited PV Validation', () => {
    it('does not pass the who exploited pv page if nothing entered', async () => {
      const URI = '/who-exploited-pv';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter details about the exploiter\(s\)/);
    });
  });

  describe('Types of Exploitation Validations', () => {
    it('does not pass the types of exploitation page if nothing entered', async () => {
      const URI = '/types-of-exploitation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an exploitation type/);
    });
  });

  describe('Any Other PVs Validations', () => {
    it('does not pass the any other pvs page if nothing entered', async () => {
      const URI = '/any-other-pvs';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('Reported to Police Validations', () => {
    it('does not pass the reported to policee page if nothing entered', async () => {
      const URI = '/reported-to-police';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });

    it('does not pass the reported to police page if a police force is not selected entered', async () => {
      const URI = '/reported-to-police';
      await initSession(URI);
      await passStep(URI, {
        'reported-to-police': 'yes',
        'reported-to-police-crime-reference': '123'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select a police force from the list/);
    });

    it('does not pass the reported to police page if a crime or CAD reference is not entered force', async () => {
      const URI = '/reported-to-police';
      await initSession(URI);
      await passStep(URI, {
        'reported-to-police': 'yes',
        'reported-to-police-police-forces': ' City of London Police'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a crime or CAD reference/);
    });
  });

  describe('PV Want to Submit NRM Validation', () => {
    it('does not pass the pv want to submit nrm page if nothing entered', async () => {
      const URI = '/pv-want-to-submit-nrm';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter the NRM decision/);
    });
  });

  describe('Does PV Need Support Validation', () => {
    it('does not pass the does pv need support page if nothing entered', async () => {
      const URI = '/does-pv-need-support';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select if support is required/);
    });
  });

  describe('PV Name Referral Validations', () => {
    it('does not pass the pv name referral page if pv first name and last name entered', async () => {
      const URI = '/pv-name-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter the potential victim's first name/)
        .to.match(/You must enter the potential victim's last name/);
    });
  });

  describe('PV Dob Validation', () => {
    it('does not pass the pv dob page if date is not valid', async () => {
      const URI = '/pv-dob';
      await initSession(URI);
      await passStep(URI, {
        'pv-dob': '2000-02-31'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a valid date/);
    });
  });

  describe('PV Gender Referral Validation', () => {
    it('does not pass the pv gender referral page if nothing is selected', async () => {
      const URI = '/pv-gender-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the potential victim's gender/);
    });
  });

  describe('Does PV Have Children Validations', () => {
    it('does not pass the does pv have children page if nothing is selected', async () => {
      const URI = '/does-pv-have-children';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });

    it('does not pass the does-pv-have-children page if yes selected but number of children not entered', async () => {
      const URI = '/does-pv-have-children';
      await initSession(URI);
      await passStep(URI, {
        'does-pv-have-children': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter the number of children/);
    });
  });

  describe('Does PV Nationality Referral Validation', () => {
    it('does not pass the pv nationality referral page if nothing is selected', async () => {
      const URI = '/pv-nationality-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the potential victim's nationality from the list/);
    });
  });

  describe('PV Interpreter Validations', () => {
    it('does not pass the pv interpreter page if yes is selected but no language is entered', async () => {
      const URI = '/pv-interpreter-requirements';
      await initSession(URI);
      await passStep(URI, {
        'pv-interpreter-requirements': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a language/);
    });

    it('does not pass the pv interpreter page if nothing is selected', async () => {
      const URI = '/pv-interpreter-requirements';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('PV Other Help Validations', () => {
    it('does not pass the pv other help page if nothing is selected', async () => {
      const URI = '/pv-other-help-with-communication';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });

    it('does not pass the pv other help page if yes is selected but no communication aid is entered', async () => {
      const URI = '/pv-other-help-with-communication';
      await initSession(URI);
      await passStep(URI, {
        'pv-other-help-with-communication': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter the communication aid/);
    });
  });

  describe(' Does PV HO Reference Validations', () => {
    it('does not pass the does pv ho reference page if nothing entered', async () => {
      const URI = '/pv-ho-reference';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });

    it('does not pass the does pv ho reference page if nothing entered', async () => {
      const URI = '/pv-ho-reference';
      await initSession(URI);
      await passStep(URI, {
        'pv-ho-reference': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a reference number/);
    });
  });

  describe('Who Contact Validation', () => {
    it('does not pass the who contact page if nothing is selected', async () => {
      const URI = '/who-contact';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('PV Contact Details Validations', () => {
    it('does not pass the pv contact details page if nothing is entered', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      await passStep(URI, {

      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select one or more of the contact methods listed/);
    });

    it('does not pass the pv contact details page if email is selected but email is not valid', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      await passStep(URI, {
        'pv-contact-details': [
          'email'
        ],
        'pv-contact-details-email-input': 'test@.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a valid email address/);
    });

    it('does not pass the pv contact details page if email is entered but safe to contact is not checked', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      await passStep(URI, {
        'pv-contact-details': [
          'email'
        ],
        'pv-contact-details-email-input': 'test@test.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Make sure it is safe to contact the potential victim at this email address/);
    });

    it('does not pass the pv contact details page if post is selected but address details not entered', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      await passStep(URI, {
        'pv-contact-details': [
          'post'
        ]
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a building or street/)
        .to.match(/You must enter a town or city/)
        .to.match(/You must enter the postcode/);
    });

    it('does not pass the pv contact details page if post is selected but safe to contact is not checked', async () => {
      const URI = '/pv-contact-details-referral';
      await initSession(URI);
      await passStep(URI, {
        'pv-contact-details': [
          'post'
        ],
        'pv-contact-details-street': '1 Street',
        'pv-contact-details-town': 'Funky Town',
        'pv-contact-details-county': 'Greater London',
        'pv-contact-details-postcode': 'PC1 1PC'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Make sure it is safe to contact the potential victim at this address/);
    });
  });

  describe('Someone Else Contact Details Validations', () => {
    it('does not pass the someone else page if nothing is entered', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select one or more of the contact methods listed/);
    });

    it('does not pass the someone else page if email is selected but email is not valid', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      await passStep(URI, {
        'someone-else': [
          'email'
        ],
        'someone-else-email-input': 'test@.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a valid email address/);
    });

    it('does not pass the someone else page if email is entered but permission is not checked', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      await passStep(URI, {
        'someone-else': [
          'email'
        ],
        'someone-else-email-input': 'test@test.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Make sure the potential victim has given you permission to send the decision to this person/);
    });

    it('does not pass the someone else page if post is selected but address details are not entered', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      await passStep(URI, {
        'someone-else': [
          'post'
        ]
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a building or street/)
        .to.match(/You must enter a town or city/)
        .to.match(/You must enter the postcode/);
    });

    it('does not pass the someone else page if post is selected but permission is not checked', async () => {
      const URI = '/someone-else';
      await initSession(URI);
      await passStep(URI, {
        'someone-else': [
          'post'
        ]
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Make sure the potential victim has given you permission to send the decision to this person/);
    });
  });

  describe('Cooperate with Police Referral Validation', () => {
    it('does not pass the cooperate with police referral page if nothing is selected', async () => {
      const URI = '/co-operate-with-police-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('First Responder Contact Details Validations', () => {
    it('does not pass the fr details page if nothing is entered', async () => {
      const URI = '/fr-details';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter your first name/)
        .to.match(/You must enter your last name/)
        .to.match(/You must enter your role/)
        .to.match(/You must enter a phone number/);
    });
  });

  describe('PV Gender Dtn Validation', () => {
    it('does not pass the pv gender dtn page if nothing is selected', async () => {
      const URI = '/pv-gender-dtn';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the potential victim's gender/);
    });
  });

  describe('Does PV Nationality Dtn Validation', () => {
    it('does not pass the pv nationality dtn page if nothing is selected', async () => {
      const URI = '/pv-nationality-dtn';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the potential victim's nationality from the list/);
    });
  });

  describe('Cooperate with Police Dtn Validation', () => {
    it('does not pass the cooperate with police dtn page if nothing is selected', async () => {
      const URI = '/co-operate-with-police-dtn';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });
});
