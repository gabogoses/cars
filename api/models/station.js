const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stationName: {
    type: String,
    required: true,
    unique: true
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"
    }
  ]
});

module.exports = mongoose.model("Station", stationSchema);
