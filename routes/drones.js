const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((listOfDrones) => {
      console.log("Retrieved the list of drones from DB", listOfDrones);
      res.render("drones/list", { dronesList: listOfDrones });
    })
    .catch((err) => {
      console.log("Error while getting the Drones from the DB", err);
      next(err);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { droneName, dronePropellers, droneSpeed } = req.body;
  Drone.collection
    .insertOne({
      name: droneName,
      propellers: dronePropellers,
      maxSpeed: droneSpeed,
    })
    .then(() => {
      console.log("created");
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Error while inserting the new drone into DB", err);
      next(err);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  Drone.findById(req.params.id).then((d) => {
    console.log(d);
    res.render("drones/update-form", { d });
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { droneName, dronePropellers, droneSpeed } = req.body;
  const updateDrone = {
    name: droneName,
    propellers: dronePropellers,
    maxSpeed: droneSpeed,
  };
  Drone.findByIdAndUpdate(req.params.id, updateDrone)
    .then(() => {
      console.log("updated");
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Error while updating drone details", err);
      next(err);
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  Drone.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("deleted");
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log("Error while deleting the drone", err);
      next(err);
    });
});

module.exports = router;
