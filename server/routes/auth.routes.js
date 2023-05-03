//To restrict user to view, update, or delete profile, JWT will be used
import express from "express";
import authCtrl from "../controllers/auth.controllers";

const router = express.Router();

//authenticate POST request with users emails and password
router.route("/auth/signin").post(authCtrl.signin);

//GET request to clear cookies containing a JWT that was set after sign-in
router.route("/auth/signout").get(authCtrl.signout);

export default router;
