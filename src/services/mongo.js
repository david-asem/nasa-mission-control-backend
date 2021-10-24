const mongoose = require('mongoose');
const MongoDB_URL = process.env.MONGO_URL;


mongoose.connection.once('open', () => {
  console.log('MongoDB connection success')

})
mongoose.connection.on('error', (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MongoDB_URL)
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}