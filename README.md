# Modern slavery

An app for a first responder to submit a form for a possible victim of modern slavery

## Install & Run

Install the dependencies and build the project resources
```bash
$ npm install
```

Install [Redis](https://redis.io/) and make sure you have a running redis instance in the background.

Start the server in development mode
```bash
$ npm run dev
```

Then go to http://localhost:8081

## Skip email verify step

On dev, preprod and locally you can skip the email verify step by going to the following url

http://localhost:8081/nrm/start?token=skip
