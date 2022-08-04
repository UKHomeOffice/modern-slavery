describe('verify journey', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'verify';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  describe('Verify', () => {
    it('goes to not recognised page after an unrecognised email has been entered', async () => {
      const URI = '/who-do-you-work-for';
      await initSession(URI);
      const response = await passStep(URI, {
        'user-email': 'test@test.com'
      });

      expect(response.text).to.contain('Found. Redirecting to email-not-recognised');
    });

    it('goes to start page after a recognised email has been entered', async () => {
      const URI = '/who-do-you-work-for';
      await initSession(URI);
      const response = await passStep(URI, {
        'user-email': 'sas-hof-test@digital.homeoffice.gov.uk'
      });

      expect(response.text).to.contain('Found. Redirecting to /nrm/start?token=skip');
    });
  });
});
