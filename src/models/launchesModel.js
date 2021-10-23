const launchesdb = require('./launchesSchema');
const planets = require('./planetsSchema')
const launches = new Map();

let latestFlightNumber = 201;

const launch = {
  flightNumber: 201,
  missionName: 'Kepler Exploration T',
  rocketType: 'Explorer IS1',
  launchDate: new Date('January 1, 2025'),
  destinationPlanet: 'Kepler-442 b',
  sponsors: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
  upcoming: true,
  success:true,
};

saveLaunch(launch)

function launchExistsWithId(launchId) {
  return launches.has(launchId)
}

async function getAllLaunches() {
  return await launchesdb.find({},
  { '_id':0, '__v':0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    planetName: launch.destinationPlanet,
  });
  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launchesdb.updateOne({
    flightNumber:launch.flightNumber,
  }, launch,{
      upsert:true,
  })
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, {
    flightNumber: latestFlightNumber,
    sponsors: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
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