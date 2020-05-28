import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ErrorDialog from "../Dialog/ErrorDialog";
import { useAppContext } from "../../libs/contextLib";

const BookingForm = props => {
  const { userHasAuthenticated } = useAppContext();
  const [carId, setCarId] = useState(props.location.state.carId);
  const [make, setMake] = useState(props.location.state.make);
  const [model, setModel] = useState(props.location.state.model);
  const [currentLocation, setCurrentLocation] = useState(
    props.location.state.currentLocation
  );
  const [rentalCostPerHour, setRentalCostPerHour] = useState(
    props.location.state.rentalCostPerHour
  );
  const [returnDate, setReturnDate] = useState(props.location.state.returnDate);
  const [numberOfSeats, setNumberOfSeats] = useState(
    props.location.state.numberOfSeats
  );
  const [year, setYear] = useState(props.location.state.year);
  const [retired, setRetired] = useState(props.location.state.retired);
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset);
  localISOTime.setSeconds(0);
  const defaultDate = localISOTime.toISOString().slice(0, -5);
  const [date, setDate] = useState(defaultDate);
  const [duration, setDuration] = useState(1);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("e.target.value", e.target.value);
  };

  const submitHandler = e => {
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

  const addReturnDate = () => {
    const carId = this.state.carId;
    const duration = this.state.duration;
    var dateObj = new Date(this.state.date);
    dateObj.setHours(dateObj.getHours() + duration);

    const carData = {
      carId: this.state.carId,
      model: this.state.model,
      make: this.state.make,
      rentalCostPerHour: this.state.rentalCostPerHour,
      returnDate: dateObj,
      numberOfSeats: this.state.numberOfSeats,
      year: this.state.year,
      currentLocation: {
        Latitude: this.state.currentLocation.Latitude,
        Longitude: this.state.currentLocation.Longitude
      }
    };

    console.log("put contents", JSON.stringify(carData));
    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=${carId}`,
      headers: {},
      data: JSON.stringify(carData)
    });
  };

  const toPayment = () => {
    let path = `/payment`;
    this.props.history.push({
      pathname: path,
      state: {
        carId: this.state.carId,
        rentalCostPerHour: this.state.rentalCostPerHour,
        duration: this.state.duration
      }
    });
    this.addReturnDate();
  };

  const handleClose = () => {
    this.setState({
      errorMessage: "",
      open: false
    });
  };

  const formSpacing = {
    margin: 35
  };
  return (
    <div style={formSpacing}>
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
              label="Duration (hours)"
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
          <Grid item xs={12} sm={6}>
            <TextField
              id="rate"
              label="Hourly Rate:"
              name="rate"
              type="text"
              fullWidth
              value={`A$${rentalCostPerHour}`}
              disabled
            />
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
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                variant="outlined"
                onClick={this.toPayment}
                fullWidth
              >
                Book
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BookingForm;
