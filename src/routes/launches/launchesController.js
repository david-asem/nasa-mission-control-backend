const { getAllLaunches,
addNewLaunch, launchExistsWithId, abortLaunchById} = require('../../models/launchesModel');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (!launch.missionName || !launch.rocketType || !launch.destinationPlanet || !launch.launchDate) {
    return res.status(400).json({
      Error: 'Missing required launch info',
    });
  } else {
    launch.launchDate = new Date(launch.launchDate);
        if (isNaN(launch.launchDate)){
          return res.status(400).json({
        Error: 'Invalid launch date',
        });
        } else {
          addNewLaunch(launch);
  return res.status(201).json(launch);
  }
  
  }

  
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    if (!launchExistsWithId(launchId)) {
      res.status(400).json({
        error:'Launch does not exit',
      })
    }
    else {
      const aborted = abortLaunchById(launchId);
      return res.status(200).json(aborted);
    }
 

}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}