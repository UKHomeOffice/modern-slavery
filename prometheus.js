'use strict';

const config = require('./config');
const http = require('http');
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 });

const server = http.createServer((req, res) => {
    res.end(client.register.metrics());
});

server.listen(config.prometheusPort);
