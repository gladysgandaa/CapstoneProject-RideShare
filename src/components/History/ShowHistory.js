import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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
  },
  button: {
    float: "right"
  }
}));

const ShowHistory = props => {
  const classes = useStyles();
  const { startTime, bookingId, carId, duration, car } = props;

  const returnVehicle = () => {
    const carData = {
      carId: carId,
      model: car.model,
      make: car.make,
      rentalCostPerHour: car.rentalCostPerHour,
      returnDate: null,
      numberOfSeats: car.numberOfSeats,
      year: car.year,
      currentLocation: {
        Latitude: car.currentLocation.Latitude,
        Longitude: car.currentLocation.Longitude
      },
      retired: false
    };

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=${carId}`,
      headers: {},
      data: carData
    });
  };

  return (
    <div>
      {
        <ListItem alignItems="flex-start">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={1}>
              <ListItemAvatar>
                <Avatar src="" classes={{ root: classes.avatar }} />
              </ListItemAvatar>
            </Grid>
            <Grid item xs={12} sm={8}>
              <ListItemText
                classes={{ primary: classes.primary }}
                primary={`${car.make} ${car.model}`}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={useStyles.inline}
                    color="textPrimary"
                  >
                    Booking ID: {bookingId}
                    <br></br>
                    Booking Time: {startTime}
                    <br></br>
                    Duration : {duration} hours
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              {car.returnDate !== null && (
                <Button
                  variant="contained"
                  color="primary"
                  classes={{ root: classes.button }}
                  onClick={returnVehicle}
                >
                  Return
                </Button>
              )}
            </Grid>
          </Grid>
        </ListItem>
      }
      <Divider variant="inset" classes={{ root: classes.root }} />
    </div>
  );
};
export default ShowHistory;
