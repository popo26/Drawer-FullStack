const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scribbleSchema = new Schema({
  rootDrawerId: { type: String },
  drawerId: { type: String },
  //ids: { type: Number, trim: true, required: true, unique: true },
  title: { type: String, trim: true },
  content: { type: String },
  type: { type: String, trim: true, required: true },
  stray: { type: Boolean, required: true },
  level: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }, //Forein key
});

module.exports = mongoose.model("scribble", scribbleSchema);
