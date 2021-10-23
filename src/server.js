const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { readInPlanets }=require('./models/planetsModel')

const PORT = process.env.PORT || 5000;

const MONGO_URI='mongodb+srv://nasa-api-developer:i7QYmcWuYMcNfBCq@nasa-api.aj7bp.mongodb.net/nasaMissionControl?retryWrites=true&w=majority'

//using inbuild nodejs module to create server.
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection success')

})
mongoose.connection.on('error', (error) => {
  console.error(error);
})

async function startServer() {
  await mongoose.connect(MONGO_URI)
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


