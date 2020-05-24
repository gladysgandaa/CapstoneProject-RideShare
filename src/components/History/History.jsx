import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import HistoryList from "./HistoryList.js";
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
          <Grid item xs={12} sm={12}>
            <Typography component="h1" variant="h4">
              Booking History
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <HistoryList bookings={this.state.bookingHistory} />
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="inset" classes={{ root: classes.root }} />
    </div>
  );
};
export default History;
