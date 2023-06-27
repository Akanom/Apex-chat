import {
  Avatar,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";

const findPeople = () => {
  const classes = useStyles();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    findPeople(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, user: data });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const clickFollow = (user, index) => {
    follow(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      user._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let toFollow = values.users;
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`,
        });
      }
    });
  };
  return (
    <div>
      <Paper className={classes.root} elevation={5}>
        <Typography type="title" className={classes.title}>
          Who to Follow
        </Typography>
        <List>
          {values.users.map((item, j) => {
            return (
              <span key={j}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={"/api/users/photo/" + item._id} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + item._id}>
                      <IconButton
                        variant="contained"
                        color="secondary"
                        className={classes.viewButton}>
                        <ViewIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        clickFollow(item, j);
                      }}>
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={8000}
        message={<span className={classes.snack}>{values.followMessage}</span>}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: "#E5E5E5",
    height: "100vh",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
  },
}));

export default findPeople;
