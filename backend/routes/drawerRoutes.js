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