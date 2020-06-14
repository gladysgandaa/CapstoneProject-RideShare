import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

import { useFormFields } from "../../libs/hooksLib";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function EditCar(props) {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    make: "",
    model: "",
    rentalCostPerHour: null,
    numberOfSeats: null,
    year: null,
    Longitude: "",
    Latitude: ""
  });
  const submitVehicle = e => {
    //Request will not complete in time for default reload
    e.preventDefault();

    const vehicleData = {
      make: fields.make,
      model: fields.model,
      rentalCostPerHour: parseInt(fields.rentalCostPerHour),
      numberOfSeats: parseInt(fields.numberOfSeats),
      year: parseInt(fields.year),
      returnDate: null,
      retired: false,
      currentLocation: {
        Latitude: parseFloat(fields.Latitude),
        Longitude: parseFloat(fields.Longitude)
      }
    };

    // Pass props if form is not changed
    for (var key in vehicleData) {
      if (key == "currentLocation") {
        if (!vehicleData.currentLocation.Longitude) {
          vehicleData[key].Longitude = props.car.currentLocation.Longitude;
        }
        if (!vehicleData.currentLocation.Latitude) {
          vehicleData[key].Latitude = props.car.currentLocation.Latitude;
        }
      }
      if (!vehicleData[key]) {
        vehicleData[key] = props.car[`${key}`];
      }
    }

    vehicleData.carId = props.car.carId;
    console.log("vehicle Data After pulling in props", vehicleData);

    axios({
      method: "put",
      url:
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
        props.carId,
      headers: {},
      data: vehicleData
    }).then(res => {
      window.location.reload();
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit a Car
        </Typography>
        <form className={classes.form} onSubmit={submitVehicle} noValidate>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="make"
                label="Car's Make"
                name="make"
                autoComplete="make"
                autoFocus
                defaultValue={props.car.make}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="model"
                label="Car's Model"
                name="model"
                autoComplete="model"
                autoFocus
                defaultValue={props.car.model}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rentalCostPerHour"
                label="Price per hour"
                name="rentalCostPerHour"
                autoComplete="rentalCostPerHour"
                autoFocus
                defaultValue={props.car.rentalCostPerHour}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="numberOfSeats"
                label="Number of Seats"
                name="numberOfSeats"
                autoComplete="numberOfSeats"
                autoFocus
                defaultValue={props.car.numberOfSeats}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="year"
                label="Make Year"
                name="year"
                autoComplete="year"
                autoFocus
                defaultValue={props.car.year}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Latitude"
                label="Latitude"
                name="Latitude"
                autoComplete="Latitude"
                autoFocus
                defaultValue={props.car.currentLocation.Latitude}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Longitude"
                label="Longitude"
                name="Longitude"
                autoComplete="Longitude"
                autoFocus
                defaultValue={props.car.currentLocation.Longitude}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Commit Edit
          </Button>
        </form>
      </div>
    </Container>
  );
}
