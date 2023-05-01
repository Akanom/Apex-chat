import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import puppyImg from "./../assets/images/puppy.jpg";
import { Link } from 'react-router-dom';

const Home = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
     
      <Typography variant="h6" className={classes.title}>
        Home page
        <Link to="/users">Users</Link>
      </Typography>
      <CardMedia className={classes.media} image={puppyImg} title="Puppy" />
      <CardContent>
        <Typography variant="body1" component="p">
          Welcome home
        </Typography>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
    height: "100%",
    margin: "auto",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.4)",
    },
  },
  title: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "1.2rem",
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    position: "relative",
    "&:before": {
      content: '""',
      display: "block",
      paddingBottom: "100%",
    },
    "& iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

export default Home;
