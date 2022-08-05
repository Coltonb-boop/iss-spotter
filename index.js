const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  for (let pass of passTimes) {
    let date = pass.risetime;
    date = new Date();

    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }

  
});

// Practice from node repl
// > date = new Date()
// > date.toString()
// 'Thu Aug 04 2022 17:54:07 GMT-0600 (Mountain Daylight Time)'