const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
  planetName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Planet', planetsSchema);

