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

const Menu = withRouter(({ history }) => {
  const isAuthenticated = auth.isAuthenticated();

  console.log('isAuthenticated:', isAuthenticated);

  return (
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
        {!isAuthenticated ? (
          <span>
            <Link to="/signin">
              <Button style={isActive(history, "/signin")}>Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button style={isActive(history, "/signup")}>Sign Up</Button>
            </Link>
          </span>
        ) : (
          isAuthenticated.user?._id && (
            <span>
              <Link to={`/user/${isAuthenticated.user._id}`}>
                <Button
                  style={isActive(history, `/user/${isAuthenticated.user._id}`)}
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
        )}
      </Toolbar>
    </AppBar>
  );
});

const isActive = (history, path) => {
  return history.location.pathname === path
    ? { color: "#f783ac" }
    : { color: "#ffffff" };
};

export default Menu;
