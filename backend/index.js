/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);
const SpotifyWebApi = require('spotify-web-api-node');

const config = require('./config');
const PORT = 3000;
var spotifyApi = new SpotifyWebApi({
  clientId : config.CLIENT_ID,
  clientSecret : config.CLIENT_SECRET,
  redirectUri : `http://localhost:${ PORT }/callback`
});

server.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.get('/', (req, res) => {
  res.status(200).end();
});