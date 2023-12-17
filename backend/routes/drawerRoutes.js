
// ////JWT///////////////////////////////////////////////////
// let express = require("express");
// let router = express.Router();
// let Controllers = require("../controllers"); //index.js

// //added - experiment
// const passport = require("passport");
// const passportConfig = require("../passport");
// const JWT = require("jsonwebtoken"); //To sign JWT toekn

// router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
//   Controllers.drawerController.getDrawers(res);
// });

// router.post("/create", passport.authenticate("jwt", { session: false }),(req, res) => {
//   Controllers.drawerController.createDrawer(req.body, res);
// });

// router.put("/:id", passport.authenticate("jwt", { session: false }),(req, res) => {
//   Controllers.drawerController.updateDrawer(req, res);
// });

// router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
//   Controllers.drawerController.deleteDrawer(req, res);
// });

// module.exports = router;




//ORIGINAL////////////////////////////////////////////////
let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
  Controllers.drawerController.getDrawers(res);
});

router.post("/create", (req, res) => {
  Controllers.drawerController.createDrawer(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.drawerController.updateDrawer(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.drawerController.deleteDrawer(req, res);
});

module.exports = router;