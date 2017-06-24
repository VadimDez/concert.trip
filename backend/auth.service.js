/**
 * Created by Vadym Yatsyuk on 24.06.17
 */
const jwt = require('jsonwebtoken');
const config = require('./config');

function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}
module.exports.signToken = signToken;

/**
 * Set token cookie directly for oAuth strategies
 */
module.exports.setTokenCookie = (req, res) => {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }

  var token = signToken(req.user._id);
  res.cookie('token', token);
  res.redirect('/');
};