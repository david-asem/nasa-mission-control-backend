const axios = require('axios');
const launches = require('./launchesSchema');
const planets = require('./planetsSchema');

const DefaultFlightNumber = 201;

const API_URL = process.env.SPACEX_API_URL;

async function populateLaunches() {
  const res = await axios.post(API_URL, {
    query: {},
    options: {
      pagination:false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
          {
            path: 'payloads',
            select: {
              'customers':1
            }
          }
        
      ]
    }
  });

  if (res.status !== 200) {
    return res.status(404).json({
      Error:'Problem downloading Launch data',
    })
  }

  const launchDocs = res.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const sponsors = payloads.flatMap((payload) => {
      return payload['customers'];
    })
    const launch = {
      flightNumber: launchDoc['flight_number'],
      missionName: launchDoc['name'],
      rocketType: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      sponsors,
    };

    //console.log(`${launch.flightNumber} ${launch.missionName}`);

    await saveLaunch(launch);
  }
}


async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocketType: 'Falcon 1',
    missionName: 'FalconSat',
  });
  await populateLaunches(firstLaunch);
  
}
  async function findLaunch(filter) {
    return await launches.findOne(filter);
  }

  async function launchExistsWithId(launchId) {
    return await findLaunch({
      flightNumber: launchId,
    });
  }

  async function getAllLaunches(skip, limit) {
    return await launches.find({},
      { '_id': 0, '__v': 0 })
      .skip(skip)
      .sort({flightNumber: 1})
      .limit(limit);
  }

  async function saveLaunch(launch) {
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
    
const planet = await planets.findOne({
    planetName: launch.destinationPlanet,
    });
    if (!planet) {
      throw new Error('No matching planet found');
    }

    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
      upcoming: true,
      success: true,
      sponsors: ['SPACEX', 'NASA', 'ESA', 'ROSCOSMOS', 'BLUE ORIGIN', 'VIRGIN GALACTIC'],
      flightNumber: newFlightNumber,
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
    loadLaunchesData,
  };