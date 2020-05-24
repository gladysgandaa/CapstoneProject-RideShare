import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  inline: {
    display: "inline",
    fontSize: "16px"
  },
  root: {
    margin: "auto"
  },
  primary: {
    fontWeight: "bold"
  },
  avatar: {
    height: "65px",
    width: "65px",
    margin: "auto"
  }
}));

const History = props => {
  console.log(props);
  const classes = useStyles();
  const { carId, make, model } = props;
  return (
    <div>
      <h2>Past Booking</h2>
      <ListItem alignItems="flex-start">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1}>
            <ListItemAvatar>
              <Avatar alt={model} src="" classes={{ root: classes.avatar }} />
            </ListItemAvatar>
          </Grid>
          <Grid item xs={12} sm={8}>
            <ListItemText
              classes={{ primary: classes.primary }}
              primary={`${make} ${model}`}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={useStyles.inline}
                  color="textPrimary"
                >
                  Booking date: {}
                  <br></br>
                  Booking time: {}
                  <br></br>
                  Location: {}
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link
              to={{
                pathname: "/book",
                state: {
                  make: make,
                  model: model,
                  carId: carId
                }
              }}
            >
              <Button alignItems="flex-end" variant="contained" color="primary">
                Book Again
              </Button>
            </Link>
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" classes={{ root: classes.root }} />
    </div>
  );
};
export default History;