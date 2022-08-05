const request = require('request-promise-native');


const fetchMyIp = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (ip) => {
  return request(`https://ipwho.is/${JSON.parse(ip).ip}`);
}

const fetchISSFlyOverTimes = (body) => {
  let { longitude, latitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const { response } = JSON.parse(body);
    return response;
  })
}

module.exports = { 
  nextISSTimesForMyLocation
};