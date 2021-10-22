const launches = new Map();

let latestFlightNumber = 201;

const launch = {
  flightNumber: 201,
  missionName: 'Kepler Exploration T',
  rocketType: 'Explorer IS1',
  launchDate: new Date('January 1, 2025'),
  destinationPlanet: 'Kepler-442 b',
  customers: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
  upcoming: true,
  success:true,
};

launches.set(launch.flightNumber, launch);

function launchExistsWithId(launchId) {
  return launches.has(launchId)
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customers: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
    upcoming: true,
    success:true,

  }));
  
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  launchExistsWithId,
};