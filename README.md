# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery

# Contents

1. [Install & Run](#install-and-run)

2. [Email functionality](#email-functionality)

3. [Skip email verify step](#skip-email-verify-step)

4. [Acceptance Tests](#acceptance-tests)
    - [Running acceptance tests](#running-acceptance-tests)

## Install & Run  <a name="install-and-run"></a>

Install the dependencies and build the project resources
```bash
$ npm install
```

Install [Redis](https://redis.io/) and make sure you have a running redis instance in the background.

```bash
$ redis-server
```

Start the server in development mode
```bash
$ npm run dev
```

Then go to http://localhost:8081

## Email functionality  <a name="email-functionality"></a>

You'll need the test Gov Notify Key called, `NOTIFY_KEY`, to run the email functionality properly. Do NOT use the Production key.

This can be obtained from a developer in the team.  It is recommended to have a `.env` file with the environment variable and then run the app like so

```bash
$ npm run dev -- --env
```

To get an email from gov notify, you'll need to be added to the email list for testing on [gov notify](https://www.notifications.service.gov.uk/sign-in)

## Skip email verify step  <a name="skip-email-verify-step"></a>

On dev, preprod and locally you can skip the email verify step by going to the following url

http://localhost:8081/nrm/start?token=skip


## Acceptance Tests  <a name="acceptance-tests"></a>

[Google Puppeteer](https://developers.google.com/web/tools/puppeteer/) is used to run our end-to end test
scripts for the application. It is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.

### Running Acceptance Tests  <a name="running-acceptance-tests"></a>

[Install & Run](#install-and-run)  the application then you can run the acceptance tests using the command below:

```bash
$ npm run start:local-acceptance
```

This will open up an instance of [Google Chrome](#https://www.google.com/chrome/) on your local machine for each test.
