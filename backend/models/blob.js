//Feature for future
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blobSchema = new Schema({
  preview: String,
});

module.exports = mongoose.model("blob", blobSchema);
