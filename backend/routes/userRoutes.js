let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken"); //To sign JWT toekn
const User = require("../models/user");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "Drawer",
      sub: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

router.post("/register", async (req, res) => {
  try {
    //Step 1: validae the user input and if there is an error, send 400 res and error message
    console.log("My user post body req::", req.body);

    //step 2: check if user already exists, if yes send res 400
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400)
      // .send("User already exists");
      .json({message: { msgBody: "Username is already taken", msgError: true }})
    }

    //Step 3: enter new user into the database
    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    await user.save();

    //step 4: return the newly added user
    // return res.status(200).send(user);
    return res.status(200)
    .json({ message: { newUser:user, msgError: false } })

  } catch (error) {
    // Report error internally
    return res.status(500)
    // .send(error.message);
    .json({ message: { msgBody: error.message, msgError: true } })
  }
});

// router.post("/register", (req, res) => {
//     //Step 1: validate the user input and if there is an error, send 400 res and error message
//     console.log("My user post body req::", req.body);

//   //const {username, password, role}= req.body;

//   User.findOne({ username: req.body.username })
//     .then((user) => {
//       if (user) {
//         return res
//           .status(400)
//           .json({
//             message: { msgBody: "Username is already taken", msgError: true },
//           });
//       }
//       return;
//     })
//     .then(() => {
//       let newUser = new User({
//         username: "testaccount",
//         password: "123456",
//         role: "user",
//       });
//       return newUser.save();
//     })
//     .then((result) => {
//       return res.status(200).send(result);
//     })
//     .catch((error) =>
//       res
//         .status(500)
//         .json({ message: { msgBody: error.message, msgError: true } })
//     );
// });

// router.post("/register", (req,res)=>{
//   const {username, password, role}= req.body;
//   User.findOne({username}, (error, user) => {
//     if (error) res.status(500).json({message: {msgBody:"Error has occured", msgError:true}});
//     if (user) res.status(400).json({message: {msgBody:"Username is already taken", msgError:true}});
//     else {
//       const newUser = new User({username, password, role});
//       newUser.save(error => {
//         if (error) res.status(500).json({message: {msgBody:"Error has occured", msgError:true}});
//         else res.status(201).json({message: {msgBody:"Account successfully created", msgError:false}});
//       })
//     }
//   })
// })

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    if (req.isAuthenticated()) {
      const { _id, username, email, role } = req.user;
      const token = signToken(_id);
      console.log("LOGIN token", token)
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, email, role } });
    }
    else {
      res.status(500).json({isAuthenticated:false, message:error.message, msgError:true})
    }

    // try {
    //  //Step 1: validae the user input and if there is an error, send 400 res and error message
    //  console.log('My user post body req::', req.body);

    //  //step 2: check if user already exists, if yes send res 400
    //  let user = await User.findOne({ email: req.body.email });
    //  if (user) {
    //    return res.status(400).send('User already exists');
    //  }

    //  //Step 3: enter new user into the database
    //  user = new User({
    //            username: req.body.username,
    //            email: req.body.email,
    //            password: req.body.password,
    //            role:"user"
    //  });
    //  await user.save();

    //  //step 4: return the newly added user
    //  return res.status(200).send(user);
    // } catch(error) {
    //    // Report error internally
    //    return res.status(500).send(error.message);
    // }
  }
);

// router.get('/logout', (req, res) => {
//   console.log("cookie", req.cookies['access_token'])
//   if (req.cookies['access_token']) {
//       res
//       .clearCookie('access_token')
//       .status(200)
//       // .json({
//       //     message: 'You have logged out'
//       // })
//       .json({ user: { username: "", email: "", role: "" }, success: true });
//   } else {
//       res.status(401).json({
//           error: 'Invalid jwt'
//       })
//   }
// })


// /////////////////////////
// router.get(
//   "/logout",
//   passport.authenticate("jwt", { session: false }
//   ),
//   (req, res) => {
//     console.log("cookie", req.cookies['access_token'])
//     if (req.cookies['access_token']){
//       console.log("LOGOUT");
//       res.clearCookie("access_token").json({ user: { username: "", email: "", role: "" }, success: true });
//     } else {
//       res.status(401).json({error:"Invalid JWT"})}
    
//   }
// );

//ORIGINAL that logs better///////////////
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }
  ),
  (req, res) => {
    console.log("LOGOUT");
    res.clearCookie("access_token");
    res.json({ user: { username: "", email: "", role: "" }, success: true });
  }
);

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else {
      res
        .status(403)
        .json({ message: { msgBody: "You are not an admin", msgError: true } });
    }
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, email, role } });
  }
);

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

module.exports = router;
