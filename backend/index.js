/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const SpotifyWebApi = require('spotify-web-api-node');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
Promise.promisifyAll(mongoose);
const chalk = require('chalk');
const passport = require('passport');

const User = require('./models/user');
const authService = require('./auth.service');
const config = require('./config');
const PORT = 3000;
const spotifyApi = new SpotifyWebApi({
  clientId : config.CLIENT_ID,
  clientSecret : config.CLIENT_SECRET,
  redirectUri : `http://localhost:${ PORT }/callback`
});
// Promise.promisifyAll(mongoose);
mongoose.connect(config.MONGODB);
mongoose.connection.on('error', err => {
  console.log(chalk.red('MongoDB error: '));
  console.log(chalk.red(err));
});

require('./express')(app);

app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-top-read'], showDialog: true}),
  function(req, res){
    res.status(400).end();
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  authService.setTokenCookie
);

app.get('/api/getOffers', (req, res) => {
  spotifyApi.setAccessToken(req.user.spotifyAccessToken);
  spotifyApi.getMyTopArtists().then(function(data) {
    data.body.items.forEach((item) => {
      console.log(item.name);
    });
  }, function(err) {
    console.error(err);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.get('/users/me', (req, res) => {
  const status = req.isAuthenticated() ? 200 : 401;
  res.status(status).end();
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}
