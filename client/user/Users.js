import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React, { useState } from "react";

const Users = () => {
  //declare state vairiable users,  which can be used to invoke setUsers
  const [users, setUsers] = useState([]);
  //Interacting with the backend
  //Perform side effect to pull out user data from the backend by using the useEffect hook function
  useEffect(() => {
    const abortController = new AbortController();
    const signal = stopController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    //cleanup funtion that aborts the fetch funtion when the components unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Paper className={classes.root} elevation={5}>
        <Typography variant="h5" className={classes.title}>
          All Users
        </Typography>
        <List dense>
          {users.map((item, j) => {
            //iterate through the array of users in the state using the map function
            return (
              <link to={"/user/" + item.id} key={j}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </link>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default Users;
