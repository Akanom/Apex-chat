import {
  Avatar,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Paper,
  Typography,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import ListItemText from "@material-ui/core";

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

  return (
    <div>
      <Paper className={classes.root} elevation={5}>
        <Typography>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {/* Users should be able to edit and delete anything on their profile */}
              {auth.isAuthenticated().user &&
                auth.isAuthenticated().user._id == user._id && (
                  <ListItemSecondaryAction>
                    <Link to={"/user/edit/" + user._id}>
                      <IconButton aria-label="Edit" color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                  </ListItemSecondaryAction>
                )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={"Joined: " + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>
        </Typography>
      </Paper>
    </div>
  );
};

export default Profile;
