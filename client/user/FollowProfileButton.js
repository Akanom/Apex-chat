import React from "react";
import PropTypes from "prop-types";
import { unfollow, follow } from "./api-user";
import { Button } from "@material-ui/core";

function FollowProfileButton(props) {
  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unFollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={unFollowClick}>
          Unfollow
        </Button>
      )}
    </div>
  );
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export default FollowProfileButton;
