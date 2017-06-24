/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const chalk = require('chalk');
const mongoose = require('mongoose');
const Promise = require('bluebird');

const config = require('./config');

mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);


mongoose.connect(config.MONGODB);
mongoose.connection.on('error', err => {
  console.log(chalk.red('MongoDB error: '));
  console.log(chalk.red(err));
});

// configure app
require('./express')(app);

app.use('/', require('./api'));

server.listen(config.PORT, () => {
  console.log(chalk.green.underline(`Listening on port ${ config.PORT }...`));
});

