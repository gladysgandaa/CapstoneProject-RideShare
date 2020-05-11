import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

const ShowHistory = props => {
  console.log(props);
  const {
    startTime,
    bookingId,
    pickupLocation,
    carId,
    duration,
    userId
  } = props;
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src="" />
        </ListItemAvatar>
        <ListItemText
          primary={carId}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={useStyles.inline}
              color="textPrimary"
            >
              Booking ID: {carId}
              <br></br>
              Booking Time: {startTime}
              <br></br>
              Duration : {duration} hours
              <div>
                <Link
                  to={{
                    pathname: "/book",
                    state: {
                      startTime: startTime,
                      bookingId: bookingId,
                      pickupLocation: pickupLocation,
                      carId: carId,
                      duration: duration,
                      userId: userId
                    }
                  }}
                >
                  <Button variant="contained" color="primary">
                    Book Again
                  </Button>
                </Link>
              </div>
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};
export default ShowHistory;
