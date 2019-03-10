const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const carRoutes = require("./api/routes/cars");
const stationRoutes = require("./api/routes/stations");

mongoose.connect(
  "mongodb+srv://gabriel:" +
    process.env.MONGO_PW +
    "@virtuo-db-dcsxm.mongodb.net/virtuo?retryWrites=true",
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/cars", carRoutes);
app.use("/stations", stationRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found 🧟");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
