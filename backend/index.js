/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');
const chalk = require('chalk');

const config = require('./config');
const PORT = 3000;
const spotifyApi = new SpotifyWebApi({
  clientId : config.CLIENT_ID,
  clientSecret : config.CLIENT_SECRET,
  redirectUri : `http://localhost:${ PORT }/callback`
});
mongoose.connect(config.MONGODB);
mongoose.connection.on('error', err => {
  console.log(chalk.red('MongoDB error: '));
  console.log(chalk.red(err));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.get('/', (req, res) => {
  res.status(200).end();
});