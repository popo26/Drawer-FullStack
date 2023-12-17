
// ///JWT///////////////////////////////////////////////////
// let express = require("express");
// let router = express.Router();
// let Controllers = require("../controllers"); //index.js

// //added - experiment
// const passport = require("passport");
// const passportConfig = require("../passport");
// const JWT = require("jsonwebtoken"); //To sign JWT toekn

// router.get("/", passport.authenticate("jwt", { session: false }),(req, res) => {
//   Controllers.scribbleController.getScribbles(res);
// });

// router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
//   Controllers.scribbleController.createScribble(req.body, res);
// });

// router.put("/:id", passport.authenticate("jwt", { session: false }),(req, res) => {
//   Controllers.scribbleController.updateScribble(req, res);
// });

// router.delete("/:id",passport.authenticate("jwt", { session: false }), (req, res) => {
//   Controllers.scribbleController.deleteScribble(req, res);
// });

// module.exports = router;




//ORIGINAL/////////////////////////////////////////
let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
  Controllers.scribbleController.getScribbles(res);
});

router.post("/create", (req, res) => {
  Controllers.scribbleController.createScribble(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.scribbleController.updateScribble(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.scribbleController.deleteScribble(req, res);
});

module.exports = router;