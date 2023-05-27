import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from 'prop-types';

// Initiate state with open set to false for the Dialog  component and redirect to false
// The DeleteUser component will receive props from the parent component (userId and send it
// to the Profile component)

const DeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // ************************************************************
  // ******** Handler methods to handle the dialog button*******
  // ************************************************************
  // Opens when the user clicks the delete button
  const clickButton = () => {
    setOpen(true);
  };
  // Closes when the user click on cancel button
  const handleRequestClose = () => {
    setOpen(false);
  };
  // The user will have access to the userId component
  const deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    // calls the remove fetch method
    remove(
      {
        userId: props.userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("The account has been deleted"));
        setRedirect(true);
      }
    });
  };
  //   When the delete account has been confirmed, users should be redirected to the Homepage
  if (redirect) {
    return <Redirect to="/" />;
  }
  //return a delete user component element
  return (
    <div>
      <span>
        <IconButton aria-label="Delete" onclick={clickButton} color="secondary">
          <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleRequestClose}>
          <DialogTitle>{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Confirm account deletion</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onclick={handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              onclick={deleteAccount}
              color="secondary"
              autoFocus="autoFocus">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    </div>
  );
};
//To validate the required injection of userId as a prop component
DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;
