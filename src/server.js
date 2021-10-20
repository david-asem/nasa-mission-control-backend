const http = require('http');
const app=require('./app');
const PORT = process.env.PORT || 5000;

//using inbuild nodejs module to create server.
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})


//using express to create the server
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })


