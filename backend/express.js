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

const config = require('./config');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'concert-trip'
    })
  }));

};