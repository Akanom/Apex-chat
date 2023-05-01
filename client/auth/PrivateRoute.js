//Declare protected routes for the frontend to restrict view access based on users auth
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = ({ component: Component, ...others }) => (
  <Route
    {...others}
    render={(props) =>
      auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
