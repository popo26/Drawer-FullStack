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

// router.get("/", (req, res, next) => {
//   console.log("===== user!!======");
//   console.log(req.user);
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });

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

module.exports = router;

////LATEST ORIGINAL
// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const passport = require("../passport");

// router.post("/register", async (req, res) => {
//   console.log("user register");

//   // ADD VALIDATION
//   try {
//     //Step 1: validae the user input and if there is an error, send 400 res and error message
//     console.log("My user post body req::", req.body);

//     //step 2: check if user already exists, if yes send res 400
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res.status(400).json({
//         message: { msgBody: "Email is already taken", msgError: true },
//       });
//     }

//     //Step 3: enter new user into the database
//     user = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role,
//       isLoggedIn: req.body.isLoggedIn,
//     });
//     await user.save();

//     //step 4: return the newly added user
//     return res
//       .status(200)
//       .json({ message: { newUser: user, msgError: false } });
//   } catch (error) {
//     // Report error internally
//     return res
//       .status(500)
//       .json({ message: { msgBody: error.message, msgError: true } });
//   }
// });

// router.post(
//   "/login",
//   function (req, res, next) {
//     console.log("userRoutes.js login, req.body: ");
//     console.log(req.body);
//     next();
//   },
//   passport.authenticate("local"),
//   (req, res) => {
//     console.log("logged in", req.user);
//     var userInfo = {
//       username: req.user.username,
//       email: req.user.email,
//       _id: req.user._id,
//       isLoggedIn: true,
//     };
//     res.send(userInfo);
//   }
// );

// router.get("/", (req, res, next) => {
//   console.log("===== user!!======");
//   console.log(req.user);
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.json({ user: null });
//   }
// });

// router.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       res.send({ msg: "no user to log out" });
//     } else res.send({ msg: "logging out" });
//   });
// });

// // //Not in use
// // router.get("/authenticated", (req, res) => {
// //   res.status(200).json({ isAuthenticated: true, user: req.user });
// // });

// //for updating username and email
// router.put("/update/:id", async function (req, res) {
//   console.log("req body UPDATE", req.body);

//   User.findByIdAndUpdate(req.params.id, req.body)
//     .then((data) => res.send({ result: 200, data: data }))
//     .catch((err) => {
//       console.log(err);
//       res.send({ result: 500, error: err.message });
//     });
// });

// //for updating password
// router.put("/changepassword/:id", async function (req, res) {
//   console.log("req body Password", req.body);
//   let user = await User.findOne({ _id: req.body._id });
//   console.log("found user", user);
//   user.password = req.body.password;
//   console.log("after password set", user);
//   user.save();
//   console.log("after saving user", user);
// });

// module.exports = router;

////VERY ORIGINAL/////////////////////////////////////////////
// let express = require("express");
// let router = express.Router();
// let Controllers = require("../controllers"); //index.js

// router.get("/", (req, res) => {
//   Controllers.userController.getUsers(res);
// });

// router.post("/create", (req, res) => {
//   Controllers.userController.createUser(req.body, res);
// });

// router.put("/:id", (req, res) => {
//   Controllers.userController.updateUser(req, res);
// });

// router.delete("/:id", (req, res) => {
//   Controllers.userController.deleteUser(req, res);
// });

// module.exports = router;
