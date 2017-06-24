/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const connectMongo = require('connect-mongo');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoStore = connectMongo(session);
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const User = require('./models/user');

const config = require('./config');

module.exports = (app) => {
  passport.serializeUser(function(user, done) {
    console.log('======');
    console.log('user');
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    console.log('======');
    console.log('obj');
    console.log(obj);
    done(null, obj);
  });
  //
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  //
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());
  // app.use(methodOverride());
  // app.use(cookieParser());
  // app.use(passport.initialize());
  // passport.use(new SpotifyStrategy.Strategy(
  //   {
  //     clientID: config.spotify.CLIENT_ID,
  //     clientSecret: config.spotify.CLIENT_SECRET,
  //     callbackURL: `http://localhost:${ 3000 }/auth/spotify/callback`
  //   },
  //   function(accessToken, refreshToken, profile, done) {
  //     // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
  //       return done(null, profile);
  //     // });
  //   }
  // ));
  // app.use(session({
  //   secret: config.secrets.session,
  //   saveUninitialized: true,
  //   resave: false,
  //   // store: new mongoStore({
  //   //   mongooseConnection: mongoose.connection,
  //   //   db: 'concert-trip'
  //   // })
  // }));

  passport.use(new SpotifyStrategy(
    {
      clientID: config.spotify.CLIENT_ID,
      clientSecret: config.spotify.CLIENT_SECRET,
      callbackURL: `http://localhost:${ 3000 }/auth/spotify/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(function () {
        return done(null, profile);
      });
    })
  );

  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: config.secrets.session }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

};