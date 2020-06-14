import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

// //put https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=mKhNRp8FvYASqrelaVmqrQ
// const modifyVehicle = carId => {
//   axios
//     .post("https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/carId")
//     .then(res => {
//       const dbVehicles = res.data;
//       this.setState({ dbVehicles }, () => {
//         this.getDistances(this.state.user, this.state.dbVehicles);
//         this.removeFarVehicles();
//       });
//     });
// };

class AdminCar extends Component {
  constructor(props) {
    const {
      carId,
      make,
      model,
      rentalCostPerHour,
      year,
      numberOfSeats,
      currentLocation,
      retired
    } = props;
    super(props);
    this.state = {
      editing: false,
      removed: false,
      carId: carId,
      make: make,
      model: model,
      rentalCostPerHour: rentalCostPerHour,
      numberOfSeats: numberOfSeats,
      year: year,
      currentLocation: currentLocation,
      retired: retired
    };
  }

  testFunction = carId => {
    console.log("carId from function", carId);
    if (this.state.editing === false) {
      this.setState({ editing: true });
    } else {
      this.setState({ editing: false });
    }
  };

  //delete k_s5tkTP091bmLqVY81Ppw
  removeVehicle = carId => {
    axios.delete(
      "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
        carId
    );
    this.setState({ removed: true });
  };

  retireVehicle = () => {
    const vehicleData = {
      make: this.state.make,
      model: this.state.model,
      rentalCostPerHour: parseInt(this.state.rentalCostPerHour),
      numberOfSeats: parseInt(this.state.numberOfSeats),
      year: parseInt(this.state.year),
      retired: true,
      currentLocation: {
        Latitude: parseFloat(this.state.currentLocation.Latitude),
        Longitude: parseFloat(this.state.currentLocation.Longitude)
      }
    };

    // console.log(JSON.stringify(bookingData));

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car`,
      headers: {},
      data: vehicleData
    })
      .then(response => {})
      .catch(error => {
        // console.log(`Error => ${error}`);
        if (error.response.status && error.response.status === 500) {
          console.log(error);
        }
      });
  };

  maintainVehicle = () => {
    const vehicleData = {
      make: this.state.make,
      model: this.state.model,
      rentalCostPerHour: parseInt(this.state.rentalCostPerHour),
      numberOfSeats: parseInt(this.state.numberOfSeats),
      year: parseInt(this.state.year),
      retired: this.state.retired,
      currentLocation: {
        Latitude: parseFloat(this.state.currentLocation.Latitude),
        Longitude: parseFloat(this.state.currentLocation.Longitude)
      },
      maintenance: true
    };

    // console.log(JSON.stringify(vehicleData));

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car`,
      headers: {},
      data: vehicleData
    })
      .then(response => {})
      .catch(error => {
        // console.log(`Error => ${error}`);
        if (error.response.status && error.response.status === 500) {
          console.log(error);
        }
      });
  };

  render() {
    const useStyles = makeStyles(theme => ({
      inline: {
        display: "inline"
      }
    }));
    return (
      <div>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={this.state.model} src="" />
          </ListItemAvatar>
          <ListItemText
            primary={`${this.state.make} ${this.state.model}`}
            secondary={
              <Typography
                component="span"
                variant="body2"
                className={useStyles.inline}
                color="textPrimary"
              >
                ${this.state.rentalCostPerHour} hourly <br></br> Available:
                <br></br>
                <div>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.testFunction(carId)}
                  >
                    Edit
                  </Button> */}
                  &nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.removeVehicle(this.state.carId)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => this.retireVehicle(this.state.carId)}
                  >
                    Retire
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => this.maintainVehicle(this.state.carId)}
                  >
                    Maintenance
                  </Button>
                </div>
                {this.state.removed && (
                  <div style={{ color: "red" }}>REMOVED</div>
                )}
              </Typography>
            }
          />
          <div>
            {this.state.editing && (
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
              </form>
            )}
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
  }
}
export default AdminCar;
