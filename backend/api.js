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

let booking = new Booking(config.booking.username, config.booking.password);
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
  spotifyApi.getMyTopArtists().then(spotify_artists => {
    return Promise.all(spotify_artists.body.items.map(spotify_artist => {
      return eventfulApi.search_performers({ keywords: spotify_artist.name }).then(performers => {
        if (performers.total_items != 0 && performers.performers && performers.performers.performer) {
          let artist = null;
          if (performers.total_items == 1) {
            artist = performers.performers.performer;
          } else {
            artist = performers.performers.performer[0];
          }
          return eventfulApi.get_performer_events({ id: artist.id }).then(performer_events => {
            if (performer_events.event_count != 0) {
              // start building offer from here (has events)
              let artist_offer = { name: spotify_artist.name, offers: [] };
              return Promise.all(performer_events.event.map(p_event => {
                return eventfulApi.get_event({ id: p_event.id }).then(event_details => {
                  if (event_details.price) {
                    let default_end_time = new Date(event_details.start_time);
                    default_end_time.setHours(default_end_time.getHours() + 8);
                    let event_offer = {
                      trip: {},
                      accommodation: {},
                      concert: {
                        title: event_details.title,
                        venue_name: event_details.venue_name,
                        address: event_details.address,
                        city: event_details.city,
                        country: event_details.country,
                        start_time: event_details.start_time,
                        end_time: event_details.end_time || default_end_time,
                        price: eventfulApi.parsePrice(event_details.price),
                        tickets_url: eventfulApi.getTicketURL(event_details)
                      }
                    };
                    return event_offer;
                  }
                });
              })).then(event_offers => {
                artist_offer.offers = event_offers;
                return artist_offer;
              });
            }
          });
        }
      });
    }));
  }).then((offers) => {
    res.status(200).json(offers);
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

router.get('/trip', (req, res) => {
  const origin = 'Munich';
  const destination = 'Zurich';

  Promise.all([
    getTransport(origin, null, destination),
    booking.getBookingFor(destination)
  ]).then((data) => {
    const transport = data[0];
    const bookings = data[1];

    res.status(200).json({
      transport,
      bookings
    }).end();
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
