const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIp((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  fetchCoordsByIP(ip, (error, coords) => {
    // console.log('error:', error);
    // console.log('coords:', coords);

    fetchISSFlyOverTimes(coords, (error, data) => {
      console.log('error:', error);
      console.log('data:', data);
  
    });
  });
});

