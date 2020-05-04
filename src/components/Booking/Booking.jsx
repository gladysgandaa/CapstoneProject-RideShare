import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";

class BookingForm extends Component {
  constructor(props) {
    super(props);

    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset);
    localISOTime.setSeconds(0);
    const defaultDate = localISOTime.toISOString().slice(0, -5);
    const { carId, make, model } = props.location.state;
    this.state = {
      carId: carId,
      make: make,
      model: model,
      date: defaultDate,
      duration: 1
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    const postData = {
      body: JSON.stringify(this.state)
    };

    console.log(postData);
    axios
      .post(
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/booking/availability",
        JSON.stringify(this.state)
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { make, model, date, duration } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <Typography variant="h4" gutterBottom>
            Book a Car.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                label="Mobile"
                fullWidth
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email ID"
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="selected-car"
                label="Selected Car"
                fullWidth
                defaultValue={`${make} ${model}`}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="datetime-local"
                label="Select Date and Time"
                name="date"
                type="datetime-local"
                fullWidth
                value={date}
                onChange={this.changeHandler}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="select"
                name="duration"
                label="Duration (hrs)"
                fullWidth
                value={duration}
                onChange={this.changeHandler}
                select
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button type="submit">Book</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
export default BookingForm;
