import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Car from "./Car";
import AdminCar from "./AdminCar";

const useStyles = makeStyles({
  root: {
    width: "100%",
    left: 0
  }
});

const SideList = ({ cars, account }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {!cars.length ? (
        <h1>No Cars Found.</h1>
      ) : (
        cars.map(car => {
          if (account == "admin") {
            return (
              <AdminCar
                key={car.carId}
                carId={car.carId}
                make={car.make}
                model={car.model}
                distance={car.distance}
                year={car.year}
                numberOfSeats={car.numberOfSeats}
                returnDate={car.returnDate}
                rentalCostPerHour={car.rentalCostPerHour}
                currentLocation={car.currentLocation}
              />
            );
          }
          return (
            <Car
              key={car.carId}
              carId={car.carId}
              make={car.make}
              model={car.model}
              distance={car.distance}
              year={car.year}
              numberOfSeats={car.numberOfSeats}
              returnDate={car.returnDate}
              rentalCostPerHour={car.rentalCostPerHour}
              currentLocation={car.currentLocation}
            />
          );
        })
      )}
    </List>
  );
};

export default SideList;
