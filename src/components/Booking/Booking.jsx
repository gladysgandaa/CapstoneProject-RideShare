import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ErrorDialog from "../Dialog/ErrorDialog";

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.toPayment = this.toPayment.bind(this);
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    const localISOTime = new Date(Date.now() - tzoffset);
    localISOTime.setSeconds(0);
    const defaultDate = localISOTime.toISOString().slice(0, -5);

    const {
      carId,
      make,
      model,
      currentLocation,
      rentalCostPerHour,
      returnDate,
      numberOfSeats,
      year,
      retired
    } = props.location.state;

    this.state = {
      carId: carId,
      make: make,
      model: model,
      currentLocation: currentLocation,
      rentalCostPerHour: rentalCostPerHour,
      date: defaultDate,
      returnDate: returnDate,
      numberOfSeats: numberOfSeats,
      year: year,
      retired: retired,
      duration: 1,
      errMessage: "",
      open: false
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("e.target.value", e.target.value);
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    const postData = {
      body: JSON.stringify(this.state)
    };

    console.log(postData);
    axios(
      "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/booking/availability",
      JSON.stringify(this.state)
    )
      .then(response => {
        console.log(`Response => ${response}`);
      })
      .catch(error => {
        console.log(`Error => ${error}`);
        if (error.response.status === 500) {
          this.setState({
            errorMessage: `Selected time for the ${this.state.make} ${this.state.model} is unavailable. Please select another time.`,
            open: true
          });
        }
      });
  };

  addReturnDate = () => {
    const carId = this.state.carId;
    const duration = this.state.duration;
    var dateObj = new Date(this.state.date);
    dateObj.setHours(dateObj.getHours() + duration);

    const formatPost =
      '{\
      "model": "' +
      this.state.model +
      '",\
      "carId": "' +
      this.state.carId +
      '",\
      "rentalCostPerHour": ' +
      this.state.rentalCostPerHour +
      ',\
      "numberOfSeats": ' +
      this.state.numberOfSeats +
      ',\
      "year": ' +
      this.state.year +
      ',\
      "make": "' +
      this.state.make +
      '",\
      "returnDate": "' +
      dateObj +
      '",\
      "currentLocation": {\
          "Longitude": ' +
      this.state.currentLocation.Longitude +
      ',\
          "Latitude": ' +
      this.state.currentLocation.Latitude +
      "\
      }\
  }";
    console.log("put contents", formatPost);
    axios({
      method: "put",
      url:
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
        carId,
      headers: {},
      data: formatPost
    });
  };

  toPayment = () => {
    let path = `/payment`;
    this.props.history.push({
      pathname: path,
      state: {
        carId: this.state.carId,
        rentalCostPerHour: this.state.rentalCostPerHour,
        duration: this.state.duration,
        returnDate: 88888
      }
    });
    this.addReturnDate();
  };

  handleClose = () => {
    this.setState({
      errorMessage: "",
      open: false
    });
  };

  render() {
    const {
      make,
      model,
      date,
      duration,
      rentalCostPerHour,
      returnDate
    } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <Typography variant="h4" gutterBottom>
            Book a Car
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
              {this.state.errorMessage && (
                <ErrorDialog
                  errorMessage={this.state.errorMessage}
                  open={this.state.open}
                  handleClose={this.handleClose}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button type="submit" onClick={this.toPayment}>
                Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
export default BookingForm;
