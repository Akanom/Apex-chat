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
import ListItemText from "@material-ui/core/ListItemText";
import { values } from "lodash";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import FollowProfileButton from "./FollowProfileButton";
import DeleteUser from "./DeleteUser";
import ProfileTabs from "./ProfileTabs";

// The profile should connect to user information and render the view
const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const photoUrl = values.user._id
    ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";
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
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
      }
    });

    return (cleanup = () => {
      abortController.abort();
    });
  }, [match.params.userId]); //only reruns when the userId updates

  const clickFollowButton = (callApi) => {
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      values.user.id
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, errors: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };
  //determine the value to set in following, the checkFollow method will check if the user exist
  //in the fetch following list, then return a match found, otherwise, it retuns undfined
  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id;
    });
    return match;
  };

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
                <Avatar src={photoUrl} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {/* Users should be able to edit and delete anything on their profile */}
              {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == values.user._id ? (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={values.user._id} />
                </ListItemSecondaryAction>
              ) : (
                //load the follow button inside the view
                <FollowProfileButton
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItem>
                <ListItemText primary={this.state.user.about} />
              </ListItem>
              <ListItemText
                primary={"Joined: " + new Date(user.created).toDateString()}
              />
            </ListItem>
          </List>
        </Typography>
        <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}/>
      </Paper>
    </div>
  );
};

export default Profile;
