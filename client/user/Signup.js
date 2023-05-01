import {
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { create } from "lodash";
import React, { useState } from "react";

const Signup = () => {
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
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
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
          <br />
          <TextField
            id="email"
            type="email"
            label="E-mail"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
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
            <Typography component="p" color="error">
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
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContentText>
          The account has been created successfully!
        </DialogContentText>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign-in
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
