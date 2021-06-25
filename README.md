# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery.

When the environment variable `WRITE_TO_CASEWORK` is true the app will post cases to an SQS queue for later processing by the casework resolver service.


# Contents

1. [Install & Run](#install-and-run)
    - [Environment variables](#env-vars)
    - [Install & Run on local machine](#install-and-run-on-local-machine)
    - [Install & Run on docker container](#install-and-run-on-docker-container)

2. [Email functionality](#email-functionality)

3. [Skip email verify step](#skip-email-verify-step)

4. [Acceptance tests](#acceptance-tests)
    - [Running local acceptance tests](#running-local-acceptance-tests)
    - [Running acceptance tests inside a docker container](#running-acceptance-tests-inside-a-docker-container)
        - [Running acceptance tests as part of Drone CI](#running-acceptance-tests-as-part-of-drone-ci)
    - [Acceptance test scripts](#acceptance-test-scripts)
        - [Uploading files](#uploading-files)

5. [Coverage Reporting](#coverage-reporting)

6. [Release Guidelines](#release-guidelines)

## Install & Run <a name="install-and-run"></a>
The application can either be run on your local machine or built inside a docker container using [docker-compose](https://docs.docker.com/compose/)

### Environment variables <a name="env-vars"></a>

You'll need to set the following env vars to run the application:

```
NOTIFY_KEY            | Your GOV.UK notify key
AWS_SQS               | AWS SQS URL
AWS_SECRET_ACCESS_KEY | AWS Secret Access Key
AWS_ACCESS_KEY_ID     | AWS Access Key ID
WRITE_TO_CASEWORK     | Enable/Disable sending the case to iCasework (defaults to false)
AUDIT_DATA            | Enable/Disable sending audit data to postgres (defaults to false)
AUDIT_DB_HOST         | Postgres host for audit data
AUDIT_DB_USER         | Postgres audit user
AUDIT_DB_PASS         | Postgres audit password
AUDIT_DB_NAME         | Postgres database name for audit data (writes to table named hof)
```

Please note if you are using IP whitelisting in the iCasework backend you will also need to add your public IP!

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

We use [Gov Notify](https://notifications.service.gov.uk/sign-in) to send emails. We have two accounts:

1. Modern slavery for our Live service. This is on our production environment
2. Modern slavery test for testing. This is on our dev, uat and preprod environments

In order to run the email functionality, you'll need the API Gov Notify Key called, `NOTIFY_KEY` for the Modern slavery test service. Do NOT use the Production key.

This can be obtained from a developer in the team.  It is recommended to have a `.env` file with the environment variable and then run the app like so:

```bash
$ npm run dev -- --env
```

## Skip email verify step  <a name="skip-email-verify-step"></a>

On dev, preprod and locally you can skip the email verify step by going to the following url

http://localhost:8081/nrm/start?token=skip

## Acceptance tests  <a name="acceptance-tests"></a>

[Google Puppeteer](https://developers.google.com/web/tools/puppeteer/) is our automated browser testing. It is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium.

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

#### Running acceptance tests as part of Drone CI  <a name="running-acceptance-tests-as-part-of-drone-ci"></a>

We use [Drone CI](#https://drone.io/) for our continious integration testing. For each Push and Pull Request to the Github repository we run our acceptance tests using a docker image with docker-compose pre-installed. The configuration can be found within the `drone.yml` file.

### Acceptance test scripts   <a name="acceptance-test-scripts"></a>
Acceptance scripts
- test:docker-acceptance
- test:local-acceptance
- test:local-acceptance-demo

The location of the user pathway tests are in the directory: `/modern-slavery/acceptance-test/user-pathways/`

The test scripts utilise the environment variables `BROWSER_TYPE` & `BROWSER_DEMO` to determine what the test files within the directory `/modern-slavery/acceptance-test/user-pathways/` uses as its browser and whether the browser runs slower for demonstration purposes.

`BROWSER_TYPE` can be left blank or set to `local` for local machine browser testing. This variable can be set to `remote` for remote browser testing.

`BROWSER_DEMO`can be left blank so the tests run at normal speed or can be set so the test runs at a slower speed.

#### Uploading files   <a name="uploading-files"></a>

The acceptance script `/modern-slavery/acceptance-test/user-pathways/upload-file/upload-file.test.js` currently tests 1 aspect of the upload functionality; a single file upload. This will be expanded in future to test other functionalities of the application.

This test suite uses the file `/modern-slavery/acceptance-test/user-pathways/upload-file/images/test.png` to complete the upload action on behalf of the user for local browser acceptance tests. The file `/modern-slavery/browsers/chrome/test.png` is used for remote browser acceptance tests.


## Coverage Reporting <a name="coverage-reporting"></a>
For unit test coverage reporting we use the Istanbul `nyc' npm module. To generate a report run the following command:


```bash
$ npm run test:coverage

```

## Release Guidelines <a name="release-guidelines"></a>
<a href="https://github.com/UKHomeOffice/modern-slavery/tree/master/documents/release-guidelines.md">More Details</a>

