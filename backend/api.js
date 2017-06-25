/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const passport = require('passport');
const Router = require('express').Router;
const SpotifyWebApi = require('spotify-web-api-node');
const chalk = require('chalk');
const request = require('request');
const Eventful = require('./eventful');

const Booking = require('./booking-com');
const getTransport = require('./transportation');
const config = require('./config');
const authService = require('./auth.service');

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.CLIENT_ID,
  clientSecret: config.spotify.CLIENT_SECRET,
  redirectUri: `http://localhost:${config.PORT}/callback`
});

const eventfulApi = new Eventful(config.eventful.APP_KEY);

let booking = new Booking('b_munich_hackers17', 'f7u@9prYLjCZq,w]2Gd[');
let router = new Router();

router.get('/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
    showDialog: true
  }),
  function (req, res) {
    res.status(400).end();
  });

router.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  authService.setTokenCookie
);

router.get('/api/getOffers', (req, res) => {
  spotifyApi.setAccessToken(req.user.spotifyAccessToken);

  spotifyApi.getMyTopArtists().then((spotify_artists) => {
    spotify_artists.body.items.forEach((spotify_artist) => {
      eventfulApi.search_performers({ keywords: spotify_artist.name }).then((performers) => {
        if (performers.total_items != 0 && performers.performers && performers.performers.performer) {
          let artist = null;
          if (performers.total_items == 1) {
            artist = performers.performers.performer;
          } else {
            artist = performers.performers.performer[0];
          }
          eventfulApi.get_performer_events({ id: artist.id }).then((performer_events) => {
            if (performer_events.event_count != 0) {
              performer_events.event.forEach((p_event) => {
                eventfulApi.get_event({ id: p_event.id }).then((event_details) => {
                  if (event_details.price) {
                    console.log('Artist "' + spotify_artist.name + '" has concert "' + event_details.title + '" '
                      + 'at ' + event_details.address + ' (' + event_details.city + ', ' + event_details.country + ') '
                      + ' that costs "' + event_details.price + '"');
                  }
                });
              });
            }
          });
        }
      });
    });
  }, function(err) {
    console.error(err);
  });
});

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

router.get('/asd', (req, res) => {
  // booking.autocomplete('New York')
  // booking.getCities('Munich')
  // booking.getHotels('-3875389')
  // booking.getHotels('20088325')
  booking.getHotelAvailabilityV2(null, null, '20088325')
    .then((data) => {
      res.status(200).json(data).end();
    })
    .catch((err) => {
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
