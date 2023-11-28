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
  TextField,
  Typography,
  Icon,
} from "@material-ui/core";
import { create } from "./api-user.js";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
  // Define initial form values
  const initialValues = {
    name: "",
    password: "",
    email: "",
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Define state for handling form submission and dialog
  const [formValues, setFormValues] = useState(initialValues);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (values) => {
    create(values)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOpenDialog(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setError('An error occurred while signing up.');
      });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Sign Up
          </Typography>
          {/* Use Formik to handle the form */}
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <Field
                type="text"
                name="name"
                label="Name"
                component={TextField}
                className={classes.textField}
                margin="normal"
              />
              <ErrorMessage name="name" component="div" className={classes.error} />

              <Field
                type="email"
                name="email"
                label="E-mail"
                component={TextField}
                className={classes.textField}
                margin="normal"
              />
              <ErrorMessage name="email" component="div" className={classes.error} />

              <Field
                type="password"
                name="password"
                label="Password"
                component={TextField}
                className={classes.textField}
                margin="normal"
              />
              <ErrorMessage name="password" component="div" className={classes.error} />

              <br />
              {error && (
                <Typography variant="body2" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {error}
                </Typography>
              )}

              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </CardActions>
            </Form>
          </Formik>
        </CardContent>
      </Card>
      {/* On successfully sign-up, show a confirmation dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
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
