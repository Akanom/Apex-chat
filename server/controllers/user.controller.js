import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";

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
    let user = await User.findById(id);
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
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
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

export default { create, userByID, read, remove, list, update };
