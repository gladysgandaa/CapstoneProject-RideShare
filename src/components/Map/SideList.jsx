import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Car from "./Car";
import AdminCar from "./AdminCar";

var navHeight = 64;
var buttonHeight = 36;
const useStyles = makeStyles({
  root: {
    width: "100%",
    left: 0,
    maxHeight: `calc(100vh - ${navHeight + buttonHeight}px)`,
    position: "relative",
    overflow: "auto"
  }
});

const SideList = ({ cars, account, availableVehicles }) => {
  console.log("logging from sidelist");
  const classes = useStyles();
  navHeight = document.getElementById("nav").clientHeight;

  const checkStatus = car => {
    const result = availableVehicles.some(
      availableCar => availableCar.carId === car.carId
    );
    console.log(result);
    if (result) {
      return "Available";
    } else if (car.retired === true) {
      return "Retired";
    } else if (car.maintenance === true) {
      return "Undergoing Maintenance";
    } else {
      return "Booked";
    }
  };

  return (
    <List className={classes.root} disablePadding={true}>
      {!cars.length ? (
        <h1>No Cars Found.</h1>
      ) : (
        cars.map(car => {
          if (account === "admin") {
            return (
              <AdminCar
                key={car.carId}
                carId={car.carId}
                make={car.make}
                model={car.model}
                distance={car.distance}
                year={car.year}
                numberOfSeats={car.numberOfSeats}
                rentalCostPerHour={car.rentalCostPerHour}
                currentLocation={car.currentLocation}
                status={checkStatus(car)}
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
