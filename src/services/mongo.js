const mongoose = require('mongoose');

const MONGO_URI='mongodb+srv://nasa-api-developer:i7QYmcWuYMcNfBCq@nasa-api.aj7bp.mongodb.net/nasaMissionControl?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
  console.log('MongoDB connection success')

})
mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URI)
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}