import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ShowHistory from "./ShowHistory";

const useStyles = makeStyles({
  root: {
    width: "100%",
    left: 0
  }
});

const HistoryList = ({ bookings }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {!bookings.length ? (
        <h1>No bookings Found.</h1>
      ) : (
        bookings.map(booking => {
          return (
            <ShowHistory
              key={booking.bookingId}
              startTime={booking.startTime}
              bookingId={booking.bookingId}
              pickUpLocation={booking.pickUpLocation}
              carId={booking.carId}
              duration={booking.duration}
              userId={booking.userId}
              returnDate={booking.returnDate}
              car={booking.car}
            />
          );
        })
      )}
    </List>
  );
};

export default HistoryList;
