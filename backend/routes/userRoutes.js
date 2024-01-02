const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("../passport");
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
  Controllers.userController.getUsers(res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

router.post("/register", async (req, res) => {
  Controllers.userController.registerUser(req, res);
});

router.post(
  "/login",
  function (req, res, next) {
    console.log("userRoutes.js login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username,
      email: req.user.email,
      _id: req.user._id,
      isLoggedIn: true,
    };
    res.send(userInfo);
  }
);

router.post("/logout", function (req, res, next) {
  Controllers.userController.logoutUser(req, res, next);
});

//for updating username and email
router.put("/update/:id", async function (req, res) {
  Controllers.userController.updateUsernameOrEmail(req, res);
});

//for updating password
router.put("/changepassword/:id", async function (req, res) {
  Controllers.userController.updatePassword(req, res);
});

//for deleting user - to be used at Admin page in future
router.delete("/:id", async function (req, res) {
  Controllers.userController.deleteUser(req, res);
});

module.exports = router;
