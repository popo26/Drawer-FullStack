"use strict";
let Models = require("../models"); //matches index.js

const getDrawers = (res) => {
  //finds all users
  Models.Drawer.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });

};
const createDrawer = (data, res) => {
  //creates a new user using JSON data POSTed in request body
  console.log(data);
  new Models.Drawer(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });


};

const updateDrawer = (req, res) => {
  //updates the user matching the ID from the param using JSON data POSTed in request body
  console.log(req.body);
  Models.Drawer.findByIdAndUpdate(req.params.idd, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const deleteDrawer = (req, res) => {
  //deletes the user matching the ID from the param
  Models.Drawer.findByIdAndDelete(req.params.idd, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getDrawers,
  createDrawer,
  updateDrawer,
  deleteDrawer,
};
