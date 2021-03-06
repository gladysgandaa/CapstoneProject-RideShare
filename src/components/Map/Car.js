import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  inline: {
    display: "inline"
  }
}));

const Car = props => {
  console.log("props Repeating many times", props);
  const {
    carId,
    make,
    model,
    rentalCostPerHour,
    distance,
    currentLocation,
    year,
    numberOfSeats,
    returnDate
  } = props;

  const history = useHistory();

  const handleBook = e => {
    e.preventDefault();
    history.push({
      pathname: "/book",
      state: {
        make: make,
        model: model,
        carId: carId,
        year: year,
        returnDate: returnDate,
        numberOfSeats: numberOfSeats,
        currentLocation: currentLocation,
        rentalCostPerHour: rentalCostPerHour
      }
    });
  };

  var trunc_dist = Math.trunc(distance);
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={model} src="" />
        </ListItemAvatar>
        <ListItemText
          primary={`${make} ${model}`}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={useStyles.inline}
              color="textPrimary"
            >
              From: ${rentalCostPerHour} hourly
              <br></br>Available
              <br></br>
              Kilometres from you: {trunc_dist}
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBook}
                >
                  Book
                </Button>
              </div>
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
};
export default Car;
