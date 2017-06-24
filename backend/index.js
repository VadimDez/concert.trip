/**
 * Created by Vadym Yatsyuk on 24.06.17
 */

const express = require('express');
const app = express();
const server = require('http').Server(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.get('/', (req, res) => {
  res.status(200).end();
});