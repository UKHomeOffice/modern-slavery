describe('validation checks of verify', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;

  const SUBAPP = 'verify';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  describe('Email Validations', () => {
    it('does not pass the verify page if no email is entered', async () => {
      const URI = '/who-do-you-work-for';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a valid email address/);
    });

    it('does not pass the verify page if an email is invalid', async () => {
      const URI = '/who-do-you-work-for';
      await initSession(URI);
      await passStep(URI, {
        email: 'test@.com'
      });
      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a valid email address/);
    });
  });
});
