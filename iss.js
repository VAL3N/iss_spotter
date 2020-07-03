const request = require('request');

const fetchMyIP = (callback) => {

  request(`https://api.ipify.org/?format=json`, function(error,response,body) {
    
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });

};

const fetchCoordsByIP = (ip, callback) => {

  request(`https://ipvigilante.com/${ip}`, function(error,response,body) {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode === 400) {
      const msg = `It didn't work! Error: Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    const coordinates = {
      "latitude": data.data.latitude,
      "longitude": data.data.longitude
    };

    callback(null, coordinates);
  });

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP };