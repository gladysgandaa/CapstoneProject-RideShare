import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import HistoryList from "./HistoryList.js";
import { useAppContext } from "../../libs/contextLib";

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

const History = () => {
  const classes = useStyles();
  const [bookings, setBookings] = useState("");
  const { currentSession } = useAppContext();

  const userId = currentSession.idToken.payload["cognito:username"];

  useEffect(() => {
    axios
      .get(
        `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/bookings?userId=${userId}`
      )
      .then(response => {
        // console.log(response);
        setBookings(response.data);
      })
      .catch(error => {
        console.log(`Error => ${error}`);
        if (error.response && error.response.status === 500) {
          // console.log(error);
        }
      });
  }, [userId]);

  return (
    <div>
      <ListItem alignItems="flex-start">
        <Grid container spacing={3}>
          <Grid container item xs={12} sm={12} justify="center">
            <Typography component="h1" variant="h4">
              Booking History
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider variant="inset" classes={{ root: classes.root }} />
            <HistoryList bookings={bookings} />
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};
export default History;
