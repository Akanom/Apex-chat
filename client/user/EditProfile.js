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
import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
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
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: event.target.value });
  };

  //create a clickSubmit button to submit forms. it will take inputs value from the state
  //and call the update fetch method to edit the user with the backend.

  const clickSubmit = () => {
    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.password && userData.append("password", values.password);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);
    const jwt = auth.isAuthenticated();
    const user = {
      name: values.name || undefined,
      email: values.password || undefined,
      password: values.password || undefined,
    };
    update(
      {
        userId: match.params.userId,
      },
      {
        t: jwt.token,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
      if (values.redirectToProfile) {
        return <Redirect to={"/user/" + values.userId} />;
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Edit Profile
          </Typography>
          <br />
          <input
            accept="image/*"
            type="file"
            onChange={handleChange("photo")}
            style={{ display: "none" }}
            id="icon-button-file"
          />
          <span className={classes.filename}>
            {value.photo ? values.photo.name : ""}
          </span>
          <br />
          <label>
            <Button variant="contained" color="default" component="span">
              Upload <FileUpload />
            </Button>
          </label>
          <br />
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
          <TextField
            id="multiline-flexible"
            label="about"
            multiline
            rows="3"
            value={value.about}
            onChange={handleChange("about")}
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
            className={classes.submit}>
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
export default EditProfile;
