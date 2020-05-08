import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Car from "./Car";

const useStyles = makeStyles({
  root: {
    width: "100%",
    left: 0
  }
});

const SideList = ({ cars }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {!cars.length ? (
        <h1>No Cars Found.</h1>
      ) : (
        cars.map(car => {
          return (
            <Car
              key={car.carId}
              carId={car.carId}
              make={car.make}
              model={car.model}
              distance={car.distance}
              currentLocation={car.currentLocation}
              rentalCostPerHour={car.rentalCostPerHour}
            />
          );
        })
      )}
    </List>
  );
};

export default SideList;
