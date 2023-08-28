import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../config/config";

// handling and providing JWT to sign-in and signout to enable authentication
// and authorization
const signin = async (req, res) => {
  try {
    //the post req receives the password and email in the request body
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status("401").json({ error: "The user is not found!" });
    }
    if (!authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "The email and password does not match!" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "You cannot sign in" });
  }
};
//The signout function clears the cookies containing the signed JWT
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "you are signed out",
  });
};
//requireSignin uses express-jwt to verify that the incoming request has a valid
//JWT in the authorization header.
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});
//Check if the authenticated user has the authorization to perform CRUD
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "You are not authorized to perform this operation!",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
