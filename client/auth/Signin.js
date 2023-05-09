import React, { useState } from "react";
import { signin } from "./api-auth";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { Card,CardContent,Typography,TextField,CardActions,Button } from "@material-ui/core";

const Signin = (props) => {
  const classes=useStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    //thinking that this should return false, should be set to true when the user succesfully sign in
    redirectToReferrer: false,
  });
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({
            ...values,
            error: "",
            redirectToReferrer: true, //should return true when successfully signed in after submitting the form
          });
        });
      }
    });
  };
//Handle Change Button
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }


  //use the redirect to conditionally Redirect component from React Router
  const { take } = props.location.state || {
    take: {
      pathname: "/",
    },
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={take} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>
            Sign in
          </Typography>
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
            className={classes.submit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
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


export default Signin;
