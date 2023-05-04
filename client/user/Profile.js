import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";

// The profile should connect to user information and render the view
const Profile = () => {
  const [user, setUser] = useState({});
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  //   Use useEffect to perform side effects
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        //if user is not authenticated, redirect to signin
        setRedirectToSignIn(true);
        //otherwise update with user information
      } else {
        setUser(data);
      }
    });

    return (cleanup = () => {
      abortController.abort();
    });
  }, [match.params.userId]); //only reruns when the userId updates

  //if the user is not authenticated, redirect to signin
  if (redirectToSignIn) {
    return <Redirect to="/signin" />;
  }

  return <div>Profile</div>;
};

export default Profile;
