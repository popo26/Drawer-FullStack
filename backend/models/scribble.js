const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//import blobSchema from "./blob";

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
  files: [
    {
      path: String,
      name: String,
      preview: String,
      // preview: { base64: String },
      size: Number,
      format: String,
      // test:String,
    },
  ],

  attachment: { type: Boolean, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },
});

module.exports = mongoose.model("scribble", scribbleSchema);
