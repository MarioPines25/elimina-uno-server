'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level='debug';

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const hostname = '127.0.0.1';
const port = 7070;

const query = require('./db/queries/query.js');

// ROUTES
const fillDBRouter = require('./routes/fill_db.js');


app.use('/filldb', fillDBRouter);

app.get('/', async function (req,res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo\n');
});

// WAY 1
var server = http.createServer(app).listen(port, function(){ });
logger.info('****************** eliminauno SERVER STARTED ************************');
logger.info('***************  http://%s  ******************', hostname + ':'+ port);
server.timeout = 240000;


module.exports = app;