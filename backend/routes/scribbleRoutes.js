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