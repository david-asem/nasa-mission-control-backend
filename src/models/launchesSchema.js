const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true
  },
  missionName: {
    type: String,
    required: true,
  },
  rocketType: {
    type: String,
    required: true,
  },
  destinationPlanet: {
    type: String,
    required: true,
  },
  sponsors: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Launch', launchesSchema);