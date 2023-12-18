const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drawerSchema = new Schema({
  rootId: { type: String },
  drawerId: { type: String },
  name: { type: String, trim: true, required: true },
  type: { type: String, trim: true, required: true},
  subDrawer: { type: Boolean, required: true },
  root: { type: Boolean },
  level: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
    required: true,
  },

});

// PRE MIDDLEWARE
// drawerSchema.pre('save', function (next) {
//   this.rootId = this._id;
//   next();
// })

module.exports = mongoose.model("drawer", drawerSchema);
