import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // remove whitespace character, null, and specified characters
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "This email already exists",
    match: [/.+\@.+\...+/, "Please fill in a valid email"],
    required: "Your email is required",
  },
  hashed_password: {
    type: String,
    required: "This password is required!",
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

//Password is not stored in the user document but handled as a virtual string
UserSchema.virtual("password")
  .set(function (password) {
    console.log("Setting password", password);
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
      const hashed_password = crypto
        .createHmac("sha1", "this.salt") // use "sha1" instead of "shal"
        .update(password)
        .digest("hex");
      console.log("Setting hashed_password:", hashed_password);
      return hashed_password;
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
  if (!this.hashed_password) {
    this.invalidate("password", "password is required");
  }
  if (this.hashed_password && this.hashed_password.length < 10) {
    this.invalidate("password", "Password must be at least 10 characters!");
  }
}, null);

export default mongoose.model("User", UserSchema);
