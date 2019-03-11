const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  },
  station: {
    type: Schema.Types.ObjectId,
    ref: "Station",
    required: true
  }
});

module.exports = mongoose.model("Car", carSchema);
