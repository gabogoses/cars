const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/car");
const Station = require("../models/station");

router.get("/", (req, res, next) => {
  Car.find()
    .select("name availability")
    .populate("station", { cars: 0, _id: 0, __v: 0 })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const station = req.params.id;
  Station.findOne(req.params.id).then(station => {
    const car = new Car({
      _id: new mongoose.Types.ObjectId(),
      station: req.body.station,
      name: req.body.name,
      availability: req.body.availability
    });
    car
      .save()
      .then(result => {
        Station.findOneAndUpdate(
          { _id: result.station },
          {
            $push: {
              cars: result._id
            }
          },
          { returnNewDocument: true }
        ).then(res => console.log(res));
        res.status(201).json({
          message: "Created car successfully 👍🏼",
          createdProduct: {
            name: result.name,
            availability: result.availability,
            _id: result._id,
            station: result.station
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
});

router.get("/:carId", (req, res, next) => {
  const id = req.params.carId;
  Car.findById(id)
    .select("")
    .populate("Station")
    .exec()
    .then(doc => {
      console.log("From DB", doc);
      if (doc) {
        res.status(200).json({
          car: doc
        });
      } else {
        res.status(404).json({ message: "No valid entry for this ID 🙅🏼" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/update/:carId", (req, res, next) => {
  Car.findById(req.params.carId, function(err, cars) {
    if (!cars) res.status(404).send("car is not found");
    else {
      // res.status(404).send(req.body);
      cars.name = req.body.name;
      cars.availability = req.body.availability;
      cars.station = req.body.station;

      cars
        .save()
        .then(cars => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

router.delete("/:carId", (req, res, next) => {
  const station = req.params.id;
  const id = req.params.carId;
  Car.remove({ _id: id })
    .exec()
    .then(result => {
      Station.findOneAndUpdate(
        { _id: result.stations },
        {
          $push: {
            stations: result._id
          }
        },
        { returnNewDocument: true }
      );
    })
    .then(result => {
      res.status(200).json({
        message: "Car deleted 🗑️"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
