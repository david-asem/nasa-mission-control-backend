const launches = new Map();

let latestFlightNumber = 201;

const launch = {
  flightNumber: 201,
  missionName: 'Kepler Exoplanet Exploration T',
  rocketType: 'Explorer IS1',
  launchDate: new Date('January 1, 2025'),
  destinationPlanet: 'Kepler-442 b',
  customer: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
  upcoming: true,
  success:true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
    upcoming: true,
    success:true,

  }));
  
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};