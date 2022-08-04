
describe('validation checks of the feedback journey', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;

  const SUBAPP = 'feedback';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  describe('Feedback Validations', () => {
    it('does not pass the Feedback page if nothing entered', async () => {
      const URI = '/start';
      await initSession(URI);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Please select an option/);
      expect(validationSummary.html())
        .to.match(/Please enter feedback/);
    });
  });

  describe('Improvements Validations', () => {
    it('does not pass the Feedback page if the text is more than 1200 characters', async () => {
      const URI = '/start';
      await initSession(URI);
      await passStep(URI, {
        feedback: 'very-satisfied',
        improvements: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Praesent pellentesque semper rhoncus. In hac habitasse platea dictumst. 
          Nam fringilla auctor consectetur. Phasellus a faucibus enim, vitae posuere nibh. 
          Ut placerat elementum arcu, a dignissim ante fermentum in. Pellentesque tempus imperdiet nulla ut facilisis. 
          Ut arcu sem, venenatis non turpis non, luctus finibus libero. 
          Pellentesque enim diam, sagittis at malesuada sed, maximus nec magna. 
          Aenean risus mi, malesuada eget ullamcorper et, molestie sit amet massa. 
          Cras eu semper dolor. Sed pulvinar nisl ut erat vulputate mattis. 
          Nam odio diam, faucibus a sollicitudin non, posuere in velit. 
          Maecenas risus ligula, condimentum ut risus ut, porttitor malesuada tellus. 
          Nunc nec est at lectus eleifend euismod. Proin nec risus ut velit facilisis tincidunt. 
          Duis eget pulvinar lorem. Sed rhoncus porta urna eu imperdiet. Sed sit amet posuere eros. 
          Pellentesque in lacinia sapien, a dapibus velit. 
          Nunc leo massa, accumsan ac nulla id, vestibulum rhoncus velit. Morbi scelerisque congue eleifend. 
          Aenean porta lacinia porttitor. Proin magna magna, ultrices ac ex eget, iaculis ultricies lorem.
          Donec consequat augue non tortor commodo luctus. Vivamus maximus ut tortor sed laoreet.`,
        email: 'test@test.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');
      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Please enter fewer than 1200 characters/);
    });
  });

  describe('Email Validations', () => {
    it('does not pass the feedback page if an email is invalid', async () => {
      const URI = '/start';
      await initSession(URI);
      await passStep(URI, {
        feedback: 'very-satisfied',
        improvements: 'Lorem ipsum',
        email: 'invalid email'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.validation-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Please enter a valid email/);
    });
  });
});
