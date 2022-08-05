const request = require('request');

const fetchMyIp = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    const data = JSON.parse(body).ip;
    if (!error) {
      callback(null, data);
      return;
    }
    
    // error can be set if invalid domain, user is offline, etc.
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
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);

    if (data.success === false) {
      const msg = `Success status was ${data.success} when fetching IP. Response: ${data.message}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, data);
    // console.log(data);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  let lat = coords.latitude;
  let lon = coords.longitude;
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Success status was ${response.statusCode} when fetching ISS info.`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    
    callback(null, data.response);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, coords) => {
      // console.log('error:', error);
      // console.log('coords:', coords);
  
      fetchISSFlyOverTimes(coords, (error, data) => {
        // console.log('error:', error);
        // console.log('data:', data);
        callback(error, data);
      });
    });
  });
}

module.exports = {
  fetchMyIp,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};