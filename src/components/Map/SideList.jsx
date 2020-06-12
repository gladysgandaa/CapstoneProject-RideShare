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

const SideList = ({ cars, account }) => {
  console.log("logging from sidelist");
  const classes = useStyles();
  navHeight = document.getElementById("nav").clientHeight;
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
