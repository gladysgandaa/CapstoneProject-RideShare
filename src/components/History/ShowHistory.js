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
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  const {
    startTime,
    bookingId,
    carId,
    duration,
    car,
    pickUpLocation,
    userId,
    returnDate
  } = props;

  const returnVehicle = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    var date = new Date();
    const returnDate = new Date(date - tzoffset).toISOString().slice(0, -5);

    const bookingData = {
      bookingId: bookingId,
      carId: carId,
      duration: duration,
      startTime: startTime,
      pickUpLocation: {
        Latitude: pickUpLocation.Latitude,
        Longitude: pickUpLocation.Longitude
      },
      userId: userId,
      returnDate: returnDate
    };

    // console.log(JSON.stringify(bookingData));

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/booking`,
      headers: {},
      data: bookingData
    })
      .then(response => {
        // refresh once returned
        history.go();
      })
      .catch(error => {
        // console.log(`Error => ${error}`);
        if (error.response.status && error.response.status === 500) {
          console.log(error);
        }
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
              {returnDate === null && (
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
