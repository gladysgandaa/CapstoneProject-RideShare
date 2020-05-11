/* global google */
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ShowHistory from "./ShowHistory.js";

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
  getHistory = () => {
    axios.get(
      "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/bookings?userId=1"
    );
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
            <ShowHistory bookings={this.state.bookingHistory} />
          </Grid>
          {/* <Grid item xs={12} sm={8}>
              {this.displayVehicles()}
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

export default History;
