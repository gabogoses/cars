const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Car = require("../models/car");
const Station = require("../models/station");

router.get("/", (req, res, next) => {
  Car.find()

    .select("name availability")
    .populate("station")
    .exec()
    .then(docs => {
      console.log(docs);
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

router.patch("/:carId", (req, res, next) => {
  const id = req.params.carId;
  const updateOp = {};
  for (const op of req.body) {
    updateOp[op.propName] = op.value;
  }
  Car.update({ _id: id }, { $set: updateOp })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Car updated 👌🏼"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:carId", (req, res, next) => {
  const station = req.params.id;
  const id = req.params.carId;
  Car.remove({ _id: id })
    .exec()
    .then(result => {
      Station.findOneAndUpdate(
        { _id: result.station },
        {
          $push: {
            station: result._id
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
