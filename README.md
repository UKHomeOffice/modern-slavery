# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery

# Contents

1. [Install & Run](#install-and-run)
    - [Install & Run on local machine](#install-and-run-on-local-machine)
    - [Install & Run on docker container](#install-and-run-on-docker-container)

2. [Email functionality](#email-functionality)

3. [Skip email verify step](#skip-email-verify-step)

4. [Acceptance tests](#acceptance-tests)
    - [Running local acceptance tests](#running-local-acceptance-tests)
    - [Running acceptance tests inside a docker container ](#running-acceptance-tests-inside-a-docker-container)


## Install & Run <a name="install-and-run"></a>
The application can either be run on your local machine or built inside a docker container using [docker-compose](https://docs.docker.com/compose/)

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

### Install & Run on docker container <a name="install-and-run-on-docker-container"></a>

Build the docker containers containing an instance of the Chrome browser `chrome-browser` the Node JS application `app` and an instance of Redis `redis`
```bash
$ docker-compose up -d --build chrome-browser app redis
```


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

[Google Puppeteer](https://developers.google.com/web/tools/puppeteer/) is used to run our end-to end test
scripts for the application. It is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.

You can run acceptance tests either on your local machine via the [Chrome](#https://www.google.com/chrome/) browser or within a docker container

### Running local acceptance tests  <a name="running-local-acceptance-tests"></a>
[Install & Run](#install-and-run-on-local-machine)  the application locally then you can run the acceptance tests using the command below:

```bash
$ npm run test:local-acceptance
```

This will open up an instance of [Google Chrome](#https://www.google.com/chrome/) on your local machine for each test.



### Running acceptance tests inside a docker container  <a name="running-acceptance-tests-inside-a-docker-container"></a>

[Install & Run](#install-and-run-on-docker-container)  the application within a docker conatiner then you can run the acceptance tests using the commands below:


Enter into the docker container with the Node JS application running
```bash
$ docker exec -i -t modern-slavery-app /bin/bash
```

Run acceptance tests
```bash
$ npm run test:docker-acceptance
```

#### Acceptance test scripts
Acceptance scripts
- test:docker-acceptance
- test:local-acceptance
- test:local-acceptance-demo

The test scripts utilise the environment variables `BROWSER_TYPE` & `BROWSER_DEMO` to determine what the file `/modern-slavery/acceptance-test/user-pathways/upload-files/upload-files.test.js` uses as its browser and whether the browser runs slower for demonstration purposes.

In order to run the test successfully ensure you have a test image `e.g.test.png` in the directory `/modern-slavery/public/images/`

`BROWSER_TYPE` can be left blank or set to `local` for local machine browser testing. This variable can be set to `remote` for remote browser testing

`BROWSER_DEMO`can be left blank so the tests run at normal speed or can be set so the test runs at a slower speed.

These acceptance scripts currently test 1 aspect of the upload functionality; a single file upload. This will be expanded in future to test other functionalities of the application.

The location of the user pathway tests are currently be in the directory: `/modern-slavery/acceptance-test/user-pathways/`
