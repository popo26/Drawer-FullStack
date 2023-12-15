const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 50,
    trim: true,
  },
  email: {
    type: String,
    min: 6,
    max: 50,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) return next(error);
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, callBack) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) return callBack(error);
    else {
      if (!isMatch) return callBack(null, isMatch);
      return callBack(null, this);
    }
  });
};

module.exports = mongoose.model("user", userSchema);
