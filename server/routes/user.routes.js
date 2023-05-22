// The API will allow the frontend perform CRUD operations on documents
//generated. The API will be declared using the Express router and mouting
//it on the Express App in express.js

import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controllers";

const router = express.Router();

// /api/users will list users with GET and create new users with POST
router.route("/api/users").get(userCtrl.list).post(userCtrl.create);

// /api/users/:userId will fetch users with GET, update users with PUT, and delete users with DELETE
//Authorization and authentication of read,updaate and delete
router
  .route("/api/users/:userId")
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .get(authCtrl.requireSignin, userCtrl.read);

//This allows the userId to handle routes by executing the userByID controller functions
router.param("userId", userCtrl.userByID);

//routes to retreive photos stored in the database and also fetch default photos if users has not uploaded any
router
  .route("/api/users/photo/:userId")
  .get(userCtrl.photo, userCtrl.defaultPhoto);
router.route("/api/users/defaultphoto").get(userCtrl.defaultPhoto);

export default router;
