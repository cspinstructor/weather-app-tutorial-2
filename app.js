
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options('address')
.argv;

const addr = argv.address;
const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyAn7h3tsW_p0md5iISNFzLcJDoRGRgjWPg`;


axios.get(locationReq).then((response) => {
  if (response.data.status === 'ZERO_RESULTS'){
    console.log('Unable to find that address');
  } else {
    const addr = response.data.results[0].formatted_address;
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherReq = `https://api.darksky.net/forecast/a8657815b96e87afa1e337d1fb2329d8/${lat},${lng}`;
    return axios.get(weatherReq);
  }
}).then((response) => {
  console.log(response.data.currently.summary);
})
.catch((error) => {
  console.log(error.code);
});
