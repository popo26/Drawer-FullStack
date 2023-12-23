const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("../passport");
// const bodyParser = require('body-parser').json();

router.post("/register", async (req, res) => {
  console.log("user register");

  //const { username, password, email, role } = req.body
  // ADD VALIDATION
  try {
    //Step 1: validae the user input and if there is an error, send 400 res and error message
    console.log("My user post body req::", req.body);

    //step 2: check if user already exists, if yes send res 400
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return (
        res
          .status(400)
          // .send("User already exists");
          .json({
            message: { msgBody: "Email is already taken", msgError: true },
          })
      );
    }

    //Step 3: enter new user into the database
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      isLoggedIn: req.body.isLoggedIn,
    });
    await user.save();

    //step 4: return the newly added user
    // return res.status(200).send(user);
    return res
      .status(200)
      .json({ message: { newUser: user, msgError: false } });
  } catch (error) {
    // Report error internally
    return (
      res
        .status(500)
        // .send(error.message);
        .json({ message: { msgBody: error.message, msgError: true } })
    );
  }
  // User.findOne({ username: username }, (err, user) => {
  //     if (err) {
  //         console.log('UserControllers.js post error: ', err)
  //     } else if (user) {
  //         res.json({
  //             error: `Sorry, already a user with the username: ${username}`
  //         })
  //     }
  //     else {
  //         const newUser = new User({
  //             username: username,
  //             password: password
  //         })
  //         newUser.save((err, savedUser) => {
  //             if (err) return res.json(err)
  //             res.json(savedUser)
  //         })
  //     }
  // })
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

router.get("/", (req, res, next) => {
  // router.get('/register', (req, res, next) => {

  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.send({ msg: "no user to log out" });
    } else res.send({ msg: "logging out" });
  });
});

router.get("/authenticated", (req, res) => {
  //const { username, email, role, isLoggedIn } = req.user;
  res.status(200).json({ isAuthenticated: true, user: req.user });

  //   res.status(200).json({ isAuthenticated: true, user: { username, email, role, isLoggedIn } });
});

//   router.put(
//     '/update/:id',
//     function (req, res, next) {
//         console.log('userRoutes.js UPDATE, req.body: ');
//         console.log(req.body)
//         next()
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('Update', req.user);
//         const userInfo = {
//             username: req.user.username,
//             email: req.user.email,
//             password:req.user.password
//             _id: req.user._id,
//             isLoggedIn: true,
//         };
//         res.send(userInfo);
//     }
// )

router.put("/update/:id", async function (req, res) {
  console.log("req body UPDATE", req.body);

  var name = req.body.name;
  var username = req.body.username;
  let password = req.body.password;
  let _id = req.body._id;

  //let user = await User.findOne({ _id: req.body._id });

  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })

    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
});

module.exports = router;

////ORIGINAL/////////////////////////////////////////////
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
