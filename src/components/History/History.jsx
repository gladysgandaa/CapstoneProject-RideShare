/* global google */
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import HistoryList from "./HistoryList.js";
import Typography from "@material-ui/core/Typography";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingHistory: []
    };
  }

  componentWillMount() {
    this.getHistory();
  }

  //Set state with variable length array to simulate DB connection. Works
  getHistory = async () => {
    try {
      await axios
        .get(
          "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/bookings?userId=1"
        )
        .then(response => {
          console.log(response);
          this.setState({ bookingHistory: response.data });
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      }
    }));

    return (
      <div style={useStyles.root}>
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
      </div>
    );
  }
}

export default History;
