# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery

## Install & Run

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

## Email functionality

You'll need the test Gov Notify Key called, `NOTIFY_KEY`, to run the email functionality properly. Do NOT use the Production key.

This can be obtained from a developer in the team.  It is recommended to have a `.env` file with the environment variable and then run the app like so

```bash
$ npm run dev -- --env
```

To get an email from gov notify, you'll need to be added to the email list for testing on [gov notify](https://www.notifications.service.gov.uk/sign-in)

## Skip email verify step

On dev, preprod and locally you can skip the email verify step by going to the following url

http://localhost:8081/nrm/start?token=skip
