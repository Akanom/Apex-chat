import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";
import { withRouter, Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import auth from "./../auth/auth-helper";

const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h5" color="inherit">
        Apex Chat
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon />
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {/* Allow sign in, sign up, my profile, and signout to appear on the menu based 
      on wheather the user is signed in or not */}
      {
        //sign in and sign up
        !auth.isAuthenticated() && (
          <span>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign Up</Button>
            </Link>
          </span>
        )
      }
      {
        //my profile and sign out
        auth.isAuthenticated() &&
          auth.isAuthenticated().user &&
          auth.isAuthenticated().user._id && (
            <span>
              <Link to={"/user/" + auth.isAuthenticated()?.user?._id}>
                <Button
                  style={isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sign Out
              </Button>
            </span>
          )
      }
    </Toolbar>
  </AppBar>
));

//change the color conditionally
const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#f783ac" };
  else return { color: "ffffff" };
};

export default Menu;
