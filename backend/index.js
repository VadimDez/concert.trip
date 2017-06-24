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
const chalk = require('chalk');
const passport = require('passport');
const passportLocal = require('passport-local');
const jwt = require('jsonwebtoken');

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

function localAuthenticate(User, email, password, done) {
  User.findOneAsync({
    email: email.toLowerCase()
  })
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is not correct.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

passport.use(new passportLocal.Strategy({
  usernameField: 'email',
  passwordField: 'password' // this is the virtual field on the model
}, function(email, password, done) {
  return localAuthenticate(User, email, password, done);
}));

app.post('/auth', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id);
    res.json({ token });
  })(req, res, next)
});

app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.saveAsync()
    .spread(user => {
      console.log('user:');
      console.log(user);
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch((res, statusCode) => {
      console.log('error');
      statusCode = statusCode || 422;
      return err => {
        res.status(statusCode).json(err);
      }
    });
});

app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){
    res.status(400).end();
  });

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  authService.setTokenCookie
);


server.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.get('/', (req, res) => {
  console.log(req.isAuthenticated());
  res.json({test: 'ok'}).status(200).end();
});