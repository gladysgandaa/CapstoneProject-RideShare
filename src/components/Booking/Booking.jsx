import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { API } from "aws-amplify";

import MaterialDialog from "../Dialog/Dialog";
import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";

const BookingForm = props => {
  let location = useLocation();

  const {
    carId,
    make,
    model,
    numberOfSeats,
    year,
    rentalCostPerHour,
    currentLocation
  } = location.state;

  const {
    isAuthenticated,
    isRegistered,
    currentSession,
    userHasRegistered
  } = useAppContext();

  const [returnDate, setReturnDate] = useState("");
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset);
  localISOTime.setSeconds(0);
  const defaultDate = localISOTime.toISOString().slice(0, -5);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    date: defaultDate
  });

  const handleChange = event => {
    setDuration(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (isAuthenticated) {
      const userId =
        location.state.userId ||
        currentSession.idToken.payload["cognito:username"];
      const bookingData = {
        carId: carId,
        duration: duration,
        date: fields.date,
        pickUpLocation: {
          Latitude: currentLocation.Latitude,
          Longitude: currentLocation.Longitude
        },
        userId: userId
      };

      console.log(`Booking Data: ${JSON.stringify(bookingData)}`);

      API.post("rideshare", "/booking/availability", {
        body: bookingData
      })
        .then(response => {
          // console.log(`Response => ${response}`);
          toPayment();
        })
        .catch(error => {
          // console.log(`Error => ${error}`);
          if (error.response.status === 500) {
            setErrorMessage(
              `Selected time for the ${make} ${model} is unavailable. Please select another time.`
            );
          }
        });
    }
  };

  const addReturnDate = () => {
    var dateObj = new Date(fields.date);
    dateObj.setHours(dateObj.getHours() + fields.duration);
    setReturnDate(dateObj);

    const carData = {
      carId: carId,
      model: model,
      make: make,
      rentalCostPerHour: rentalCostPerHour,
      returnDate: returnDate || null,
      numberOfSeats: numberOfSeats,
      year: year,
      currentLocation: {
        Latitude: currentLocation.Latitude,
        Longitude: currentLocation.Longitude
      },
      retired: false
    };

    console.log("put contents", JSON.stringify(carData));
    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=${carId}`,
      headers: {},
      data: carData
    });
  };

  const toPayment = () => {
    let path = `/payment`;
    history.push({
      pathname: path,
      state: {
        carId: carId,
        rentalCostPerHour: rentalCostPerHour,
        duration: fields.duration
      }
    });
    addReturnDate();
  };

  const formSpacing = {
    margin: 35
  };

  return (
    <div style={formSpacing}>
      <form onSubmit={submitHandler}>
        <Typography variant="h4" gutterBottom>
          Book a Car
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="fname"
              name="fname"
              label="First name"
              fullWidth
              autoComplete="fname"
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lname"
              name="lname"
              label="Last name"
              fullWidth
              autoComplete="lname"
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
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
              onChange={handleFieldChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="selected-car"
              label="Selected Car"
              fullWidth
              defaultValue={`${make} ${model}`}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Select Date and Time"
              name="date"
              type="datetime-local"
              fullWidth
              value={fields.date}
              onChange={handleFieldChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="duration"
              name="duration"
              label="Duration (hours)"
              fullWidth
              value={duration}
              onChange={handleChange}
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
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            {errorMessage && (
              <MaterialDialog
                title="Sorry"
                content={errorMessage}
                open={open}
                handleClose={handleClose}
              />
            )}
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            {isAuthenticated === true ? (
              <Grid item xs={12} sm={2}>
                <Button type="submit" variant="outlined" fullWidth>
                  Book
                </Button>
              </Grid>
            ) : (
              <div>
                <h4>Please register or login to confirm booking.</h4>
                {isRegistered === true ? (
                  <Button onClick={handleOpen}>Login</Button>
                ) : (
                  <Button onClick={handleOpen}>Register</Button>
                )}
              </div>
            )}
            {isRegistered === true ? (
              <MaterialDialog
                content={
                  <SignIn
                    handleClick={() => userHasRegistered(false)}
                    handleClose={handleClose}
                    state={location.state}
                  />
                }
                open={open}
                handleClose={handleClose}
              />
            ) : (
              <MaterialDialog
                content={
                  <SignUp
                    handleClick={() => userHasRegistered(true)}
                    handleClose={handleClose}
                    state={location.state}
                  />
                }
                open={open}
                handleClose={handleClose}
              />
            )}
            {errorMessage && (
              <MaterialDialog
                title="Sorry"
                content={
                  "Please select another time, the car is unavailable for the selected booking time."
                }
                open={errorMessage !== null}
                handleClose={handleClose}
              />
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BookingForm;
