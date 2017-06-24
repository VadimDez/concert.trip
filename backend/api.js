/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const passport = require('passport');
const Router = require('express').Router;
const SpotifyWebApi = require('spotify-web-api-node');
const chalk = require('chalk');
const request = require('request');

const config = require('./config');
const authService = require('./auth.service');
const spotifyApi = new SpotifyWebApi({
  clientId : config.spotify.CLIENT_ID,
  clientSecret : config.spotify.CLIENT_SECRET,
  redirectUri : `http://localhost:${ config.PORT }/callback`
});

let router = new Router();

router.get('/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
    showDialog: true
  }),
  function(req, res){
    res.status(400).end();
  });

router.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  authService.setTokenCookie
);

router.get('/api/getOffers', (req, res) => {
  spotifyApi.setAccessToken(req.user.spotifyAccessToken);
  spotifyApi.getMyTopArtists().then(function(data) {
    data.body.items.forEach((item) => {
      console.log(item.name);
    });
  }, function(err) {
    console.error(err);
  });
});

/**
 * Get transport prices, routes, etc...
 *
 * @param originCity - Origin display name
 * @param originPosition - Origin latitude,longitude (comma separated)
 * @param destinationCity - Destination display name
 * @param destinationPosition - Destination latitude,longitude (comma separated)
 * @param currency
 */
function getTransport(originCity, originPosition, destinationCity, destinationPosition, currency) {
  currency = currency || 'EUR';
  let url = `https://rome2rio12.p.mashape.com/Search?currency=${ currency }&dKind=City&oKind=City`;
  const args = ['oName', 'oPos', 'dName', 'dPos'];
  originCity = encodeURIComponent(originCity) || null;
  destinationCity = encodeURIComponent(destinationCity) || null;

  // add query params dynamically
  args.forEach((value, index) => {
    if (arguments[index]) {
      url += `&${ value }=${ arguments[index] }`;
    }
  });

  const options = {
    url: url,
    headers: {
      'X-Mashape-Key': 'popMmKAzdQmshoMEn4fhbUmGcGxDp1SbSidjsn3U3dEDruOfp1',
      'Accept': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body);
        resolve(json);
      } else {
        reject(error);
      }
    });
  });
}

router.get('/transport', (req, res) => {
  getTransport('Zurich', null, 'Munich')
    .then((response) => {
      res.status(200).json(response).end();
    })
    .catch(err => {
      console.log(chalk.red(err));
      res.status(400).end();
    });
});

router.get('/users/me', (req, res) => {
  const status = req.isAuthenticated() ? 200 : 401;
  res.status(status).end();
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).end();
}

module.exports = router;