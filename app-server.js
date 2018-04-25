
const axios = require('axios');
const express = require('express');

const server = express();

// function ignoreFavicon(req, res, next) {
//   if (req.originalUrl === '/favicon.ico') {
//     res.status(204).json({nope: true});
//   } else {
//     next();
//   }
// }

// server.use(ignoreFavicon);

server.get('/', (req, res) => {
  //const addr = req.params.addr;   /:addr
  const addr = req.query.addr; //  /?addr=
  console.log(addr);
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyAn7h3tsW_p0md5iISNFzLcJDoRGRgjWPg`;

  axios.get(locationReq).then((response) => {
    if (response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find that address');
      res.send('Unable to find that address');
    } else {
      const addr = response.data.results[0].formatted_address;
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;
      const weatherReq = `https://api.darksky.net/forecast/a8657815b96e87afa1e337d1fb2329d8/${lat},${lng}`;
      return axios.get(weatherReq);
    }
  }).then((response) => {
    res.send({
      address: addr,
      summary: response.data.currently.summary,
      temperature: (response.data.currently.temperature-32)*0.5556,
    });
  })
  .catch((error) => {
    console.log('ERROR: ', error.message);
    res.send(error.message);
    //res.send(error.message);
  });
});

server.listen(3000);
