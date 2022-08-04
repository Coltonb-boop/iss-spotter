const { fetchMyIp, fetchCoordsByIP } = require('./iss');

fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  fetchCoordsByIP(ip, (error, data) => {
    console.log('error:', error);
    console.log('data:', data);
  });

  console.log("It worked! Returned IP:", ip);
});
