const { getAllLaunches,
  scheduleNewLaunch,
  launchExistsWithId,
  abortLaunchById } = require('../../models/launchesModel');
const { getPagination} = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

 async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (!launch.missionName || !launch.rocketType || !launch.destinationPlanet || !launch.launchDate) {
    return res.status(400).json({
      Error: 'Missing required launch info',
    });
  } 
    launch.launchDate = new Date(launch.launchDate);
        if (isNaN(launch.launchDate)){
          return res.status(400).json({
        Error: 'Invalid launch date',
        });
        } 
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  
  

  
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
  const launchExists = await launchExistsWithId(launchId);
  
  if (!launchExists) {
    return res.status(400).json({
      error: 'Launch does not exit',
    });
    }
  
    const aborted = await abortLaunchById(launchId);
    
      if (aborted) {
      return res.status(400).json({
        error: 'Launch not aborted',
      });
      }
    return res.status(200).json({
      ok: true,
    });
    
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}