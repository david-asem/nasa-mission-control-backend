const launches = require('./launchesSchema');
const planets = require('./planetsSchema')

const DefaultFlightNumber = 201;

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

async function launchExistsWithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}

async function getAllLaunches() {
  return await launches.find({},
  { '_id':0, '__v':0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    planetName: launch.destinationPlanet,
  });
  if (!planet) {
    throw new Error('No matching planet found');
  }

  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort('-flightNumber');

  if (!latestLaunch) {
    return DefaultFlightNumber;
  }
  return latestLaunch.flightNumber;
}


async function scheduleNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber() + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    sponsors: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
    flightNumber:newFlightNumber,
  });

  await saveLaunch(newLaunch)
}


async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });

  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  getAllLaunches,
  abortLaunchById,
  launchExistsWithId,
  scheduleNewLaunch,
};