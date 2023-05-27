import {
  Avatar,
  GridList,
  GridListTile,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function FollowGrid(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={150} className={classes.gridList} col={4}>
        {props.people.map((person, i) => {
          return (
            <GridListTile style={{ height: 100 }} key={i}>
              <Link to={"/user/" + person._id}>
                <Avatar
                  src={"/api/users/photo/" + person._id}
                  className={classes.bigAvater}
                />
                <Typography className={classes.tileText}>
                  {person.name}
                </Typography>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: "#E5E5E5",
    height: "100vh",
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
  },
}));

export default FollowGrid;
