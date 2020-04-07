import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import Car from "./Car";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "30%",
    maxHeight: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const SideList = ({ cars }) => {
  return (
    <List className={useStyles.root}>
      {!cars.length ? (
        <h1>No Cars Found.</h1>
      ) : (
        cars.map(car => {
          return (
            <Car
              key={car.carId}
              make={car.make}
              model={car.model}
              distance={car.distance}
              rentalCostPerHour={car.rentalCostPerHour}
            />
          );
        })
      )}
    </List>
  );
};

export default SideList;
