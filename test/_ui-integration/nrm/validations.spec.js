/* eslint-disable max-len */

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter the birthplace/)
        .to.match(/Enter the family details/)
        .to.match(/Enter the education history/)
        .to.match(/Enter the employment history/);
    });
  });

  describe('User enters potential victim more than one exploitation situation Validation', () => {
    it('does not pass potential victim more than one exploitation situation page if nothing entered', async () => {
      const URI = '/potential-victim-exploitative-situation-multiple';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Select if the potential victim been in more than one exploitative situation/);
    });
  });

  describe('User enters when did the exploitation take place Validation', () => {
    it('does not pass when did the exploitation take place page if nothing entered', async () => {
      const URI = '/when-did-the-exploitation-take-place';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter when the exploitation happened/);
    });
  });

  describe('User enters when did the exploitations take place Validation', () => {
    it('does not pass when did the exploitations take place page if nothing entered', async () => {
      const URI = '/when-did-the-exploitation-take-place-multiple';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Explain when the exploitations happened/);
    });

    it('does not pass when did the exploitations take place page if nothing entered', async () => {
      const URI = '/when-did-the-exploitation-take-place-multiple';
      await initSession(URI);
      await passStep(URI, {
        'when-did-the-exploitation-take-place-multiple': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Details when the exploitations happened must be 15000 characters or less/);
    });
  });

  describe('User enters how did the exploitation start Validation', () => {
    it('does not pass how did the exploitation start page if nothing entered', async () => {
      const URI = '/how-did-the-exploitation-start';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter what were they had to do/)
        .to.match(/Enter how they were treated/)
        .to.match(/Enter their living conditions/);
    });
  });

  describe('User enters is the potential victim still in an exploitative situation Validation', () => {
    it('does not pass is the potential victim still in an exploitative situation page if nothing selected', async () => {
      const URI = '/is-the-potential-victim-still-in-an-exploitative-situation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Select if the potential victim is still in an exploitative situation/);
    });
  });

  describe('User enters what is keeping the potential victim in the exploitative situation Validation', () => {
    it('does not pass what is keeping the potential victim in the exploitative situation page if nothing entered', async () => {
      const URI = '/reasons-preventing-potential-victim-from-leaving';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Explain what is keeping the potential victim in the situation/);
    });
  });

  describe('User enters what is keeping the potential victim in the exploitative situation Validation', () => {
    it('does not pass what is keeping the potential victim in the exploitative situation page if nore than 15000 characters entered', async () => {
      const URI = '/reasons-preventing-potential-victim-from-leaving';
      await initSession(URI);
      await passStep(URI, {
        'what-is-keeping-them-in-situation': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Reasons about what is keeping the potential victim in the situation must be 15000 characters or less/);
    });
  });

  describe('User enters how did they leave the situation Validation', () => {
    it('does not pass how did they leave the situation page if nothing entered', async () => {
      const URI = '/how-why-did-they-leave-the-situation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter how they left/);
    });
  });

  describe('First Responder exploiters last in contact Validation', () => {
    it('does not pass the when-last-contact page if nothing entered', async () => {
      const URI = '/when-last-contact';
      await initSession(URI);
      await passStep(URI, {});
      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us when they were last in contact/);
    });
  });

  describe('User enters is this the first chance to report Validation', () => {
    it('does not pass is this the first chance to report page if nothing entered', async () => {
      const URI = '/is-this-the-first-chance-to-report';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter anything that prevented the potential victim from reporting this sooner/);
    });
  });

  describe('User enters modern slavery indicators Validation', () => {
    it('does not pass the modern slavery indicators page if nothing entered', async () => {
      const URI = '/modern-slavery-indicators';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Select if you identified any modern slavery indicators/);
    });

    it('does not pass the modern slavery indicators page if more than 15000 entered', async () => {
      const URI = '/modern-slavery-indicators';
      await initSession(URI);
      await passStep(URI, {
        'modern-slavery-indicators': 'yes',
        'modern-slavery-indicators-details': ''
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter details of modern slavery indicators/);
    });

    it('does not pass the modern slavery indicators page if more than 15000 entered', async () => {
      const URI = '/modern-slavery-indicators';
      await initSession(URI);
      await passStep(URI, {
        'modern-slavery-indicators': 'yes',
        'modern-slavery-indicators-details': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Details of modern slavery indicators must be 15000 characters or less/);
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
        const validationSummary = docu.find('.govuk-error-summary');

        expect(validationSummary.length === 1).to.be.true;
        expect(validationSummary.html())
          .to.match(/Enter details about the interview/);
      });

    it('does not pass where and how was the interview carried out page if nothing entered',
      async () => {
        const URI = '/where-how-interview-carried-out';
        await initSession(URI);
        await passStep(URI, {
          'where-how-interview-carried-out': 'a'.repeat(15001)
        });

        const res = await getUrl(URI);
        const docu = await parseHtml(res);
        const validationSummary = docu.find('.govuk-error-summary');

        expect(validationSummary.length === 1).to.be.true;
        expect(validationSummary.html())
          .to.match(/Enter no more than 15,000 characters/);
      });
  });

  describe('User enters professional insight Validation', () => {
    it('does not pass professional insight page if nothing entered',
      async () => {
        const URI = '/professional-insight';
        await initSession(URI);
        await passStep(URI, {});

        const res = await getUrl(URI);
        const docu = await parseHtml(res);
        const validationSummary = docu.find('.govuk-error-summary');

        expect(validationSummary.length === 1).to.be.true;
        expect(validationSummary.html())
          .to.match(/Enter details of your professional insight/);
      });

    it('does not pass professional insight page if more 15000 characters entered',
      async () => {
        const URI = '/professional-insight';
        await initSession(URI);
        await passStep(URI, {
          'professional-insight': 'a'.repeat(15001)
        });

        const res = await getUrl(URI);
        const docu = await parseHtml(res);
        const validationSummary = docu.find('.govuk-error-summary');

        expect(validationSummary.length === 1).to.be.true;
        expect(validationSummary.html())
          .to.match(/Details of your professional insight must be 15000 characters or less/);
      });
  });

  describe('User enters evidence of dishonesty Validation', () => {
    it('does not pass evidence of dishonesty page if nothing entered', async () => {
      const URI = '/evidence-of-dishonesty';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });
  });

  describe('User enters evidence of dishonesty details Validation', () => {
    it('does not pass evidence of dishonesty page if yes selected but no additional details entered', async () => {
      const URI = '/evidence-of-dishonesty';
      await initSession(URI);
      await passStep(URI, {
        'evidence-of-dishonesty': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter concerns of credibility/);
    });

    it('does not pass evidence of dishonesty page if nore than 15000 characters entered ', async () => {
      const URI = '/evidence-of-dishonesty';
      await initSession(URI);
      await passStep(URI, {
        'evidence-of-dishonesty': 'yes',
        'evidence-of-dishonesty-details': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter no more than 15,000 characters/);
    });
  });

  describe('User enters are others involved Validation', () => {
    it('does not pass are others involved page if nothing entered', async () => {
      const URI = '/are-others-involved';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter other people involved/);
    });
  });

  describe('User enters what documents or evidence will you submit Validation', () => {
    it('does not pass what documents or evidence will you submit page if nothing entered', async () => {
      const URI = '/what-evidence-you-will-submit';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us about the documents you uploaded/);
    });
  });

  describe('User enters more than 15000 characters when describing evidence submitted Validation', () => {
    it('does not pass what evidence will you submit page if more than 15000 charcters entered', async () => {
      const URI = '/what-evidence-you-will-submit';
      await initSession(URI);
      await passStep(URI, {
        'what-evidence-you-will-submit': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Document descriptions cannot be more than than 15000 characters/);
    });
  });

  describe('Where Exploitation Happened Validation', () => {
    it('does not pass the where-exploitation-happened page if nothing entered', async () => {
      const URI = '/where-exploitation-happened';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter details about the exploiter\(s\)/);
    });
  });

  describe('Have information about exploiters current location Validation', () => {
    it('does not pass the information exploiters location page if nothing entered', async () => {
      const URI = '/exploiters-location';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if you have information about where the exploiters are/);
    });
  });

  describe('Are exploiters in the Uk Validation', () => {
    it('does not pass the are exploiters in the UK page if nothing entered', async () => {
      const URI = '/are-exploiters-in-the-uk';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if the exploiters are in the UK/);
    });
  });

  describe('Details about exploiters current location Validation', () => {
    it('does not pass what information you have exploiters current location page if nothing entered', async () => {
      const URI = '/exploiters-current-location-details';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us what information you have about the exploiters' location/);
    });
  });

  describe('Types of Exploitation Validations', () => {
    it('does not pass the types of exploitation page if nothing entered', async () => {
      const URI = '/types-of-exploitation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select an option/);
    });

    const testFieldValidation = async (field, value, errorMessage) => {
      const URI = '/any-other-pvs';
      await initSession(URI);
      const stepData = { 'any-other-pvs': field.includes('yes') ? 'yes' : 'not-sure', [field]: value };
      await passStep(URI, stepData);
      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');
      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html()).to.match(new RegExp(errorMessage));
    };
    it('does not pass the  any other pvss page if more than 15000 entered', async () => {
      await testFieldValidation('other-potential-victims-yes-details', 'a'.repeat(15001), 'Details of other potential victims must be 15000 characters or less');
    });
    it('does not pass the  any other pvs page if more than 15000 entered', async () => {
      await testFieldValidation('other-potential-victims-not-sure-details', 'a'.repeat(15001), 'Details of other potential victims must be 15000 characters or less');
    });
  });

  describe('Reported to Police Validations', () => {
    it('does not pass the reported to police page if nothing entered', async () => {
      const URI = '/reported-to-police';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must enter a crime or CAD reference/);
    });
  });

  describe('Authorities co-operation', () => {
    it('does not pass the Authorities Co-operation page if no option is selected', async () => {
      const URI = '/authorities-cooperation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if the potential victim will co-operate with public authorities/);
    });
  });

  describe('PV Want to Submit NRM Validation', () => {
    it('does not pass the pv want to submit nrm page if nothing entered', async () => {
      const URI = '/pv-want-to-submit-nrm';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select if support is required/);
    });
  });

  describe('Support Provider Contact Validation', () => {
    it('does not pass the does pv-phone-number page if nothing entered', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Select how the support provider can contact the potential victim/);
    });
  });

  describe('PV Phone Number Validation', () => {
    it('does not pass the does pv-phone-number page if pv number is selected but no number entered', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'yes',
        'pv-phone-number-yes': ''
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter the potential victim's telephone number/);
    });
  });

  describe('PV Phone Number Validation', () => {
    it('does not pass the does pv-phone-number page if invalid number', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'yes',
        'pv-phone-number-yes': '01234567890123456789'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a real telephone number/);
    });
  });

  describe('PV Alternative Phone Number Validation', () => {
    it('does not pass the does pv-phone-number page if pv alternative number is selected but no number entered', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'pv-alternative-number',
        'pv-phone-number-alternative': '',
        'alternative-number-relation-to-pv': 'Friend'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter an alternative telephone number/);
    });
  });

  describe('PV Alternative Phone Number Validation', () => {
    it('does not pass the does pv-phone-number page if pv alternative number is selected but no number entered', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'pv-alternative-number',
        'pv-phone-number-alternative': '012345678913456789',
        'alternative-number-relation-to-pv': 'Friend'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a real telephone number/);
    });
  });

  describe('Alternative Number Relationship to PV Validation', () => {
    it('does not pass the does pv-phone-number page if pv alternative number is selected but no relationship entered', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'pv-alternative-number',
        'pv-phone-number-alternative': '01234567891',
        'alternative-number-relation-to-pv': ''
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter the relationship to potential victim/);
    });
  });

  describe('Alternative Number Relationship to PV Validation', () => {
    it('does not pass the does pv-phone-number page if pv alternative number relationship is more than 250 chracters', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'pv-alternative-number',
        'pv-phone-number-alternative': '01234567891',
        'alternative-number-relation-to-pv': 'a'.repeat(251)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Relationship to potential victim must be 250 characters or less/);
    });
  });


  describe('No Contact Details Validation', () => {
    it('does not pass the does pv-phone-number page if no contact details is selected but no explanation given', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'no',
        'no-contact-details': ''
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Explain why you cannot provide contact details/);
    });
  });

  describe('No Contact Details Validation', () => {
    it('does not pass the does pv-phone-number page if no contact details explanation os more than 15000 characters', async () => {
      const URI = '/pv-phone-number';
      await initSession(URI);
      await passStep(URI, {
        'pv-phone-number': 'no',
        'no-contact-details': 'a'.repeat(15001)
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Reason why you cannot provide contact details must be 15000 characters or less/);
    });
  });

  describe('PV Name Referral Validations', () => {
    it('does not pass the pv name referral page if pv first name and last name entered', async () => {
      const URI = '/pv-name-referral';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Make sure the potential victim has given you permission to send the decision to this person/);
    });
  });

  describe('First Responder Contact Details Validations', () => {
    it('does not pass the fr details page if nothing is entered', async () => {
      const URI = '/fr-details';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

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
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/You must select the potential victim's nationality from the list/);
    });
  });

  describe('User enters more than one exploitation situation Validation', () => {
    it('does not pass more than one exploitation situation page if nothing entered', async () => {
      const URI = '/more-than-one-exploitation-situation';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter Date\(s\) of exploitation/);
    });
  });
});
