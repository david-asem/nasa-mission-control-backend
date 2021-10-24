require('dotenv').config({ path: './.env' });
const { mongoConnect }=require('./services/mongo');
const http = require('http');
const app = require('./app');
const { readInPlanets }=require('./models/planetsModel')
const { loadLaunchesData }= require('./models/launchesModel')
const PORT = process.env.PORT || 8000;

//using inbuild nodejs module to create server.
const server = http.createServer(app);


async function startServer() {
  await mongoConnect();
  await readInPlanets();
  await loadLaunchesData();
  
  server.listen(PORT, () => {
    
    console.log(`listening on port ${PORT}...`);
    
  });
}
startServer();

