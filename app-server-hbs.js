
const axios = require('axios');
const express = require('express');
const hbs = require('hbs');

const server = express();
const bodyParser = require('body-parser');
const filemgr = require('./filemgr');

const port = process.env.PORT || 3000;


server.use(bodyParser.urlencoded({ extended: true}));
server.use(express.static(__dirname + '/public'));
server.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

var weatherdata;
hbs.registerHelper('list', (items, options) => {
 items = weatherdata;
 console.log('from register helper...');
 //console.log(items);
 var out = "<tr><th>Address</th><th>Summary</th><th>Temp</th></tr>";

 const length = items.length;

 for(var i=0; i<length; i++){
   out = out +  options.fn(items[i]);
   //console.log(options.fn(items[i]));
 }
 console.log(out);
 return out;
});

server.get('/', (req, res) => {
  console.log('render home.hbs');
  res.render('home.hbs');
});

server.get('/home', (req, res) => {
  res.render('home.hbs');
});

server.get('/form', (req, res) => {
  res.render('form.hbs');
});

server.get('/historical', (req, res) => {
  filemgr.getAllData().then((result) => {

    weatherdata = result;
    res.render('historical.hbs');
  }).catch((errorMessage) => {
    console.log(errorMessage)
  });

});

server.post('/form', (req,res) => {
  console.log('from button Get-Started rendering form.hbs');
  //res.redirect('/');
  res.render('form.hbs');
});

server.post('/gohome', (req, res) => {
  console.log('from button Home, rendering home.hbs');
  res.render('home.hbs');
});

server.post('/delete', (req, res) => {
  console.log('from delete button in historical.hbs, rendering historical.hbs');

  filemgr.deleteAll().then((result) => {
    weatherdata = result;
    console.log('deleteall reached here');
    res.render('historical.hbs');
  }).catch((errorMessage) => {
    console.log('error in deleteall');
  });

});

server.post('/getweather', (req, res) => {
  console.log('from button Send, rendering result.hbs');
  const addr = req.body.address;
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

    let temperature = (response.data.currently.temperature-32)*0.5556;
    temperature = temperature.toFixed(2);
    const result = {
      address: addr,
      summary: response.data.currently.summary,
      temperature: `${temperature} C`,
    }
    filemgr.saveData(result);
    res.render('result.hbs', result);
  })
  .catch((error) => {
    console.log('ERROR: ', error.message);
    //res.send(error.message);
    res.render('error.hbs', {
      errorMsg: error.message,
    });
    //res.send(error.message);
  });
});

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
