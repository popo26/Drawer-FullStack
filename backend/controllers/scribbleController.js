"use strict";
let Models = require("../models"); //matches index.js

const getScribbles = (res) => {
  //finds all users
  Models.Scribble.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
const createScribble = (data, res) => {
  //creates a new user using JSON data POSTed in request body
  console.log(data);
  new Models.Scribble(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateScribble = (req, res) => {
  //updates the user matching the ID from the param using JSON data POSTed in request body
  console.log(req.body)
  Models.Scribble.findByIdAndUpdate(req.params.id, req.body, {
  useFindAndModify: false })
  .then(data => res.send({result: 200, data: data}))
  .catch(err => {
  console.log(err);
  res.send({result: 500, error: err.message})
  })
  }
  const deleteScribble = (req, res) => {
  //deletes the user matching the ID from the param
  Models.Scribble.findByIdAndRemove(req.params.id, req.body, {
  useFindAndModify: false })
  .then(data => res.send({result: 200, data: data}))
  .catch(err => {
  console.log(err);
  res.send({result: 500, error: err.message})
  })
  }


module.exports = {
  getScribbles,
  createScribble,
  updateScribble,
  deleteScribble,
};
