const http = require('http');
const app = require('./app');
const { readInPlanets }=require('./models/planetsModel')

const PORT = process.env.PORT || 5000;

//using inbuild nodejs module to create server.
const server = http.createServer(app);

async function startServer() {
  await readInPlanets();
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
}

startServer();



//using express to create the server
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })


