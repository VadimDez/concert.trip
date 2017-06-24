/**
 * Created by Vadym Yatsyuk on 24.06.17
 */
const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports.signToken = (id) => {
  return jwt.sign({ _id: id }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}