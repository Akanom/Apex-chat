import React, { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Paper,
  Typography,
  List,
  Divider,
} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { Edit } from "@material-ui/icons";
import { read } from "./api-user"; 
import FollowProfileButton from "./FollowProfileButton";
import DeleteUser from "./DeleteUser";
import ProfileTabs from "./ProfileTabs";
import auth from "./../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    backgroundColor: "#F0F2F5",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: "#3B5998",
    fontSize: "24px",
    fontWeight: "bold",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    backgroundColor: "#F7F9FA",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      padding: "10px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
    },
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
    borderRadius: "20px",
    padding: "10px 30px",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));



const Profile = ({ match }) => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const [values, setValues] = useState({ following: false }); // Define your values state

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();

    // Use the read function from your api-user to fetch user data
    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignIn(true);
      } else {
        let following = checkFollow(data, jwt);
        setValues({ ...values, user: data, following: following });
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user, jwt) => {
    return user.followers.some((follower) => follower._id === jwt.user._id);
  };

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
                <Avatar src={user.photo} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id === user._id ? (
                <ListItemSecondaryAction>
                  <Link to={`/user/edit/${user._id}`}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id} />
                </ListItemSecondaryAction>
              ) : (
                <FollowProfileButton
                  following={values.following}
                  onButtonClick={clickFollowButton}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={user.about} />
              <ListItemText
                primary={`Joined: ${new Date(user.created).toDateString()}`}
              />
            </ListItem>
          </List>
        </Typography>
        <ProfileTabs user={user} />
      </Paper>
    </div>
  );
};

export default Profile;