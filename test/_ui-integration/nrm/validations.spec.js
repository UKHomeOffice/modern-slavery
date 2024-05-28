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

  describe('User enters their background Validation', () => {
    it('does not pass what is their background page if nothing entered', async () => {
      const URI = '/what-is-their-background';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter the birthplace/)
        .to.match(/Enter the family details/)
        .to.match(/Enter the education history/)
        .to.match(/Enter the employment history/);
    });
  });

  describe('User enters when did the exploitation take place Validation', () => {
    it('does not pass when did the exploitation take place page if nothing entered', async () => {
      const URI = '/when-did-the-exploitation-take-place';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter when the exploitation took place/);
    });
  });

  describe('User enters more than one exploitation situation Validation', () => {
    it('does not pass more than one exploitation situation page if nothing entered', async () => {
      const URI = '/more-than-one-exploitation-situation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter Date\(s\) of exploitation/);
    });
  });

  describe('User enters how did the exploitation start Validation', () => {
    it('does not pass how did the exploitation start page if nothing entered', async () => {
      const URI = '/how-did-the-exploitation-start';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter when the exploitation started/);
    });
  });

  describe('User enters were they taken somewhere Validation', () => {
    it('does not pass where they taken somewhere page if nothing entered', async () => {
      const URI = '/were-they-taken-somewhere-by-their-exploiter';
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

  describe('User enters were they taken somewhere journey details Validation', () => {
    it('does not pass where they taken somewhere page if journey details page if nothing entered', async () => {
      const URI = '/were-they-taken-somewhere-by-their-exploiter';
      await initSession(URI);
      await passStep(URI, {
        'were-they-taken-somewhere-by-their-exploiter': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter the journey's details/);
    });
  });

  describe('User enters how were they treated Validation', () => {
    it('does not pass how were they treated page if nothing entered', async () => {
      const URI = '/how-they-were-treated';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter what were they required to do/)
        .to.match(/Enter how they were treated/)
        .to.match(/Enter why they stayed/);
    });
  });

  describe('User enters how and why did they leave the situation Validation', () => {
    it('does not pass how and why did they leave the situation page if nothing entered', async () => {
      const URI = '/how-why-did-they-leave-the-situation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter how and why they left/);
    });
  });

  describe('User enters is this the first chance to report Validation', () => {
    it('does not pass is this the first chance to report page if nothing entered', async () => {
      const URI = '/is-this-the-first-chance-to-report';
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

  describe('User enters why are they reporting this now Validation', () => {
    it('does not pass why are they reporting this now page if nothing entered', async () => {
      const URI = '/why-report-now';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter reason for reporting/);
    });
  });

  describe('User enters why are you making the referral Validation', () => {
    it('does not pass why are you making the referral page if nothing entered', async () => {
      const URI = '/why-are-you-making-the-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter reason for referral/);
    });
  });

  describe('User enters where and how was the interview carried out Validation', () => {
    it('does not pass where and how was the interview carried out page if nothing entered',
      async () => {
        const URI = '/where-how-interview-carried-out';
        await initSession(URI);
        await passStep(URI, {});

        const res = await getUrl(URI);
        const docu = await parseHtml(res);
        const validationSummary = docu.find('.validation-summary');

        expect(validationSummary.length === 1).to.be.true;
        expect(validationSummary.html())
          .to.match(/Enter details about the interview/);
      });
  });

  describe('User enters are others involved Validation', () => {
    it('does not pass are others involved page if nothing entered', async () => {
      const URI = '/are-others-involved';
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

  describe('User enters are others involved details Validation', () => {
    it('does not pass are others involved page if nothing entered', async () => {
      const URI = '/are-others-involved';
      await initSession(URI);
      await passStep(URI, {
        'are-others-involved': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter other people involved/);
    });
  });

  describe('User enters evidence of dishonesty Validation', () => {
    it('does not pass evidence of dishonesty page if nothing entered', async () => {
      const URI = '/evidence-of-dishonesty';
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

  describe('User enters evidence of dishonesty details Validation', () => {
    it('does not pass evidence of dishonesty page if nothing entered', async () => {
      const URI = '/evidence-of-dishonesty';
      await initSession(URI);
      await passStep(URI, {
        'evidence-of-dishonesty': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter indicators or evidence of dishonesty/);
    });
  });

  describe('User enters what documents or evidence will you submit Validation', () => {
    it('does not pass what documents or evidence will you submit page if nothing entered', async () => {
      const URI = '/what-evidence-you-will-submit';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter list of documents or evidence to be submitted/);
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
    it('does not pass the reported to police page if nothing entered', async () => {
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
