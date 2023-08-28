import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import { create } from "./api-user.js";
import { makeStyles } from "@material-ui/core/styles"

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

const Signup = () => {
  const classes = useStyles();
  //define that stateful functions
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  //define handlers function to be called when the input changes
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //create a clickSubmit button to submit forms. it will take inputs value from the state
  //and call the create fetch method to sign-up the user with the backend.
  const clickSubmit = () => {
    console.log("Submitting:", values);
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      console.log("Response:", data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          error: "",
          open: true,
        });
      }
    });
  };
  

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="email"
            type="email"
            label="E-mail"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />
          {values.error && ( //error message block, conditionally rendered depending on the response from the server.
            <Typography variant="body2" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      {/*  //On successfully sign-in, the user is given a confirmation */}
      <Dialog open={values.open} onClose={() => setValues({ ...values, open: false })}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContentText>
          The account has been created successfully!
        </DialogContentText>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus variant="contained">
              Sign-in
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
