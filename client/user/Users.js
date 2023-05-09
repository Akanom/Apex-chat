import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
  makeStyles
} from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import React, { useState, useEffect } from "react";
import { list } from "./api-user.js";
import Person from "@material-ui/icons/Person";

const Users = () => {
  const classes=useStyles()
  //declare state vairiable users,  which can be used to invoke setUsers
  const [users, setUsers] = useState([]);
  //Interacting with the backend
  //Perform side effect to pull out user data from the backend by using the useEffect hook function
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
    //cleanup funtion that aborts the fetch funtion when the components unmounts
    return (cleanup = () => {
      abortController.abort();
    });
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
              <Link to={"/user/" + item.id} key={j}>
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
              </Link>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#F0F2F5', 
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'},
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: '#3B5998', 
    fontSize: '24px', 
    fontWeight: 'bold'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    backgroundColor: '#F7F9FA', 
    borderRadius: '5px', 
    '& .MuiInputBase-input': {
      padding: '10px',
      fontWeight: 'bold', 
      letterSpacing: '0.5px' 
    }
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    borderRadius: '20px', 
    padding: '10px 30px',
    fontWeight: 'bold', 
    '&:hover': { 
      cursor: 'pointer' 
    }
  }
}));

export default Users;
