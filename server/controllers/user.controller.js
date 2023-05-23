import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";
import formidable from "formidable";
import fs from "fs";
import profileImage from "./../../client/assets/images/puppy.jpg";

//Profile photo url's
const photo = (req, res, next) => {
  if (res.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage);
};

//Creating a new user using POST req defined at /api/users
const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    //trys to save the new user in the mongoose database
    await user.save();
    return res.status(200).json({
      message: "You have signed-up successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//Listing a new user using GET req defined at ./api/users
const list = async (req, res, next) => {
  try {
    //finds all the users from the database and populate only the name, email,created and updated
    let users = await User.find().select("name email updated created");
    //return the list user as a json file
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//Loading a user by id whenever a request is made that contain the userId
//The userByID controller function uses the value in the userId parameter to query the
//database by _id and load the user details
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
      .populate("followers", "_id name")
      .populate("following", "_id name")
      .exec();
    if (!user) {
      return res.status("400").json({
        error: "The user is not found.",
      });
    }
    req.profile = user;
    next();
  } catch (err) {
    res.status("400").json({
      error: "The user cannot be retreived.",
    });
  }
};

//Reading single user data
const read = async (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//Updating a user
const update = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = trueform.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    let user = req.profile;
    user = extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    try {
      await user.save();
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    } catch (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
  });
};

//Deleting a user by id
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//Add following controller
const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { following: req.body.followId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//Add follower controller
const addFollower = async (req, res, next) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.followId,
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

//Add remove follower controller
const removeFollower = async (req, res, next) => {
  try {
    let result = await User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


//Add remove following controller
const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { following: req.body.followId },
    });
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  userByID,
  read,
  remove,
  list,
  update,
  photo,
  defaultPhoto,
  addFollowing,
  addFollower,
  removeFollower,
  removeFollowing
};
