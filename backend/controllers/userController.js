"use strict";
let Models = require("../models"); //matches index.js
const passport = require("../passport");
//const express = require("express");

const getUsers = (res) => {
  //finds all users
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteUser = (req, res) => {
  //deletes the user matching the ID from the param
  Models.User.findByIdAndDelete(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const registerUser = async (req, res) => {
  console.log("user register");

  // ADD VALIDATION
  try {
    //Step 1: validae the user input and if there is an error, send 400 res and error message
    console.log("My user post body req::", req.body);

    //step 2: check if user already exists, if yes send res 400
    let user = await Models.User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: { msgBody: "Email is already taken", msgError: true },
      });
    }

    //Step 3: enter new user into the database
    user = new Models.User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      isLoggedIn: req.body.isLoggedIn,
    });
    await user.save();

    //step 4: return the newly added user
    return res
      .status(200)
      .json({ message: { newUser: user, msgError: false } });
  } catch (error) {
    // Report error internally
    return res
      .status(500)
      .json({ message: { msgBody: error.message, msgError: true } });
  }
};

const updateUsernameOrEmail = (req, res) => {
  console.log("req body UPDATE", req.body);
  Models.User.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updatePassword = async (req, res) => {
  console.log("req body Password", req.body);
  let user = await Models.User.findOne({ _id: req.body._id });
  console.log("found user", user);
  user.password = req.body.password;
  console.log("after password set", user);
  user.save();
  console.log("after saving user", user);
};

const logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      res.send({ msg: "no user to log out" });
    } else res.send({ msg: "logging out" });
  });
};

module.exports = {
  getUsers,
  deleteUser,
  registerUser,
  updateUsernameOrEmail,
  updatePassword,
  logoutUser,
};

//////ORIGINAL///////////////////////////////////////
// "use strict";
// let Models = require("../models"); //matches index.js

// const getUsers = (res) => {
//   //finds all users
//   Models.User.find({})
//     .then((data) => res.send({ result: 200, data: data }))
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };
// const createUser = (data, res) => {
//   //creates a new user using JSON data POSTed in request body
//   console.log(data);
//   new Models.User(data)
//     .save()
//     .then((data) => res.send({ result: 200, data: data }))
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// const updateUser = (req, res) => {
//   //updates the user matching the ID from the param using JSON data POSTed in request body
//   console.log(req.body);
//   Models.User.findByIdAndUpdate(req.params.id, req.body, {
//     useFindAndModify: false,
//   })
//     .then((data) => res.send({ result: 200, data: data }))
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };
// const deleteUser = (req, res) => {
//   //deletes the user matching the ID from the param
//   Models.User.findByIdAndDelete(req.params.id, req.body, {
//     useFindAndModify: false,
//   })
//     .then((data) => res.send({ result: 200, data: data }))
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// };

// module.exports = {
//   getUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// };
