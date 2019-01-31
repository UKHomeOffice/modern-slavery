# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery

# Contents

1. [Install & Run](#install-and-run)
    - [Install & Run on local machine](#install-and-run-on-local-machine)

2. [Email functionality](#email-functionality)

3. [Skip email verify step](#skip-email-verify-step)

4. [Acceptance tests](#acceptance-tests)
    - [Running local acceptance tests](#running-local-acceptance-tests)


## Install & Run <a name="install-and-run"></a>
The application can be run on your local machine

### Install & Run on local machine <a name="install-and-run-on-local-machine"></a>
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


## Acceptance tests  <a name="acceptance-tests"></a>

[Google Puppeteer](https://developers.google.com/web/tools/puppeteer/) is our automated browser testing. It is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.

You can run acceptance tests on your local machine via the [Chrome](#https://www.google.com/chrome/) browser

### Running local acceptance tests  <a name="running-local-acceptance-tests"></a>
[Install & Run](#install-and-run-on-local-machine)  the application locally then you can run the acceptance tests using the command below:

```bash
$ npm run test:local-acceptance
```

This will open up an instance of [Google Chrome](#https://www.google.com/chrome/) on your local machine for each test.

#### Acceptance test scripts
Acceptance scripts
- test:local-acceptance
- test:local-acceptance-demo

The test scripts utilise the environment variable `BROWSER_DEMO` to determine whether the browser runs the file `/modern-slavery/acceptance-test/user-pathways/upload-file/upload-file.test.js` slower for demonstration purposes.

`BROWSER_DEMO`can be left blank so the tests run at normal speed or can be set so the test runs at a slower speed.

These acceptance scripts currently test 1 aspect of the upload functionality; a single file upload. This will be expanded in future to test other functionalities of the application.

The test uses the file `/modern-slavery/acceptance-test/user-pathways/upload-file/images/test.png` to complete the upload action on behalf of the user.

The location of the user pathway tests are currently be in the directory: `/modern-slavery/acceptance-test/user-pathways/`
