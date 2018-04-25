const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Home</h1>
        <a href="/about">About</a>
      </body>
    </html>
    `);
});

server.get('/about', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>About page</h1>
        <a href="/">Home</a>
      </body>
    </html>
    `);
});

server.get('/getaddr', (req, res) => {
  const address = req.query.address;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  res.send({
    addr: address,
    lat: latitude,
    lng: longitude,
  });
});
server.listen(80);
