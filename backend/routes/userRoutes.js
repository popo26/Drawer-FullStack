let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken"); //To sign JWT toekn
const User = require("../models/user");

router.post('/register', async (req, res) => {
  try {
   //Step 1: validae the user input and if there is an error, send 400 res and error message
   console.log('My user post body req::', req.body);

   //step 2: check if user already exists, if yes send res 400
   let user = await User.findOne({ email: req.body.email });
   if (user) {
     return res.status(400).send('User already exists');
   }
 
   //Step 3: enter new user into the database
   user = new User({
             username: req.body.username,
             email: req.body.email,
             password: req.body.password,
             role:"user"
   });
   await user.save();
 
 
   //step 4: return the newly added user
   return res.status(200).send(user);
  } catch(error) {
     // Report error internally
     return res.status(500).send(error.message);
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
