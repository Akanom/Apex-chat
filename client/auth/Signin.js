import React, { useState } from "react";
import { signin } from "./api-auth";
import { Redirect } from "react-router-dom";

const Signin = () => {
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

export default Signin;
