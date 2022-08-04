describe('Footer links', () => {
  let testApp;
  let getUrl;
  let initSession;
  let parseHtml;

  const SUBAPP = 'common';
  const SUBAPP_PATH = '';

  beforeEach(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
    initSession = testApp.initSession;
  });

  it('should mount the cookies page on the app', async () => {
    const URI = '/cookies';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('header h1');

    header.html().should.match(/Cookies/);
  });

  it('should mount the terms page on the app', async () => {
    const URI = '/terms-and-conditions';
    await initSession(URI);
    await getUrl(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('header h1');

    header.html().should.match(/Terms and conditions/);
  });

  it('should mount the accessibility page on the app', async () => {
    const URI = '/accessibility';
    await initSession(URI);
    await getUrl(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('header h1');

    header.html().should.match(/Accessibility statement/);
  });
});
