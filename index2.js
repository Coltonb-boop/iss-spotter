const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = (passTimes) => {
  for (let pass of passTimes) {
    let date = pass.risetime;
    date = new Date();

    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });