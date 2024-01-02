"use strict";
const fs = require("fs");
let Models = require("../models"); //matches index.js

//Feature for future - file conversion
function convertBase64ToFile(file) {
  let base64Data = file.base64.split(",")[1];
  fs.writeFile(
    `${__dirname}/../../scribbles/${file.fileName}`,
    base64Data,
    "base64",
    function (err) {
      return err.message;
    }
  );
  // Other actions...
}

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
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateScribble = (req, res) => {
  //updates the user matching the ID from the param using JSON data POSTed in request body
  console.log(req.body);
  Models.Scribble.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteScribble = (req, res) => {
  //deletes the user matching the ID from the param
  Models.Scribble.findByIdAndDelete(req.params.id, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getScribbles,
  createScribble,
  updateScribble,
  deleteScribble,
};
