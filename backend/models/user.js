const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

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
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  //added - experiement
  // drawers:[{type: mongoose.Schema.Types.ObjectId, ref: "drawer"}],
  // scribbles:[{type: mongoose.Schema.Types.ObjectId, ref: "scribble"}]
});

//In order to auhenticate email as username for passport
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();
//   bcrypt.hash(this.password, 10, (error, passwordHash) => {
//     if (error) return next(error);
//     this.password = passwordHash;
//     next();
//   });
// });

// userSchema.methods.comparePassword = function (password, callBack) {
//   bcrypt.compare(password, this.password, (error, isMatch) => {
//     if (error) return callBack(error);
//     else {
//       if (!isMatch) return callBack(null, isMatch);
//       return callBack(null, this);
//     }
//   });
// };

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre("save", function (next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});

module.exports = mongoose.model("user", userSchema);

////ORIGINAL/////////////////////////////////
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   firstName: { type: String, trim: true, required: true },
//   lastName: { type: String, trim: true, required: true },
//   emailId: { type: String, trim: true, required: true, unique: true },
//   password: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   //userId: { type: Number, required: true}, //Forein key
// });

// module.exports = mongoose.model("user", userSchema);
