import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,// remove whitespace character, null, and specified characters
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "This email already exists",
    match: [/.+\@.+\...+/, "Please fill in a valid email"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "The password is required!",
  },
  salt: String,
});

//Password is not stored in the user document but handled as a virtual string
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//used to encrypt the user provided password string into hashed_password with randomly generated salt value
UserSchema.methods = {
  //authenticate verifies the sign-in attempts by matching the user-provided password
  //with the hashed password stored in the database
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  //encrypted password is used to generate an encrypted hash from the plain-text password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("shal", "this.salt")
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  //this generates a unique and random salt value using the current timestamp
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

//password validation
UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 10) {
    this.invalidate("password", "Password must be at least 10 characters!");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "password is required");
  }
}, null);

export default mongoose.model("User", UserSchema);
