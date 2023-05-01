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
  const clickSubmit=()=>{
    const user={
        name:values.name||undefined,
        email:values.email||undefined,
        password:values.password||undefined,
    }
    create(user).then((data))
  }
  return <div>Signup</div>;
};

export default Signup;
