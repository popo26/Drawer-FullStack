const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scribbleSchema = new Schema({
  rootDrawerId: { type: String },
  drawerId: { type: String },
  title: { type: String, trim: true },
  content: { type: String },
  type: { type: String, trim: true, required: true },
  stray: { type: Boolean, required: true },
  level: { type: Number, required: true },

  userId: { type: String, required: true }, //Forein key
  files: [
    {
      path: String,
      name: String,
      preview: String,
      size: Number,
      format: String,
    },
  ],

  attachment: { type: Boolean, required: true },
});

module.exports = mongoose.model("scribble", scribbleSchema);
