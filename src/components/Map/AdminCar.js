import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import EditCar from "../Admin/EditCar";

class AdminCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      removed: false
    };
  }

  editForm = carId => {
    console.log("carId from function", carId);
    console.log("props", this.props);
    if (this.state.editing === false) {
      this.setState({ editing: true });
    } else {
      this.setState({ editing: false });
    }
  };

  //delete k_s5tkTP091bmLqVY81Ppw
  removeVehicle = carId => {
    axios
      .delete(
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car?carId=" +
          carId
      )
      .then(res => {
        this.setState({ removed: true });
        window.location.reload();
      });
  };

  retireVehicle = () => {
    const vehicleData = {
      carId: this.props.carId,
      make: this.props.make,
      model: this.props.model,
      rentalCostPerHour: parseInt(this.props.rentalCostPerHour),
      numberOfSeats: parseInt(this.props.numberOfSeats),
      year: parseInt(this.props.year),
      retired: true,
      currentLocation: {
        Latitude: parseFloat(this.props.currentLocation.Latitude),
        Longitude: parseFloat(this.props.currentLocation.Longitude)
      }
    };

    // console.log(JSON.stringify(bookingData));

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car`,
      headers: {},
      data: vehicleData
    })
      .then(response => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(error => {
        // console.log(`Error => ${error}`);
        if (error.response && error.response.status === 500) {
          console.log(error);
        }
      });
  };

  maintainVehicle = maintenance => {
    const vehicleData = {
      carId: this.props.carId,
      make: this.props.make,
      model: this.props.model,
      rentalCostPerHour: parseInt(this.props.rentalCostPerHour),
      numberOfSeats: parseInt(this.props.numberOfSeats),
      year: parseInt(this.props.year),
      retired: this.props.retired,
      currentLocation: {
        Latitude: parseFloat(this.props.currentLocation.Latitude),
        Longitude: parseFloat(this.props.currentLocation.Longitude)
      },
      maintenance: maintenance
    };

    // console.log(JSON.stringify(vehicleData));

    axios({
      method: "put",
      url: `https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car`,
      headers: {},
      data: vehicleData
    })
      .then(response => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(error => {
        // console.log(`Error => ${error}`);
        if (error.response && error.response.status === 500) {
          console.log(error);
        }
      });
  };

  render() {
    return (
      <div>
        <ListItem alignItems="flex-start">
          <Grid container direction="row" justify="space-between">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <ListItemAvatar>
                  <Avatar alt={this.props.model} src="" />
                </ListItemAvatar>
              </Grid>
              <Grid item>
                <Typography component="h2" variant="body1" color="textPrimary">
                  {this.props.make} {this.props.model}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h2" variant="body2" color="textPrimary">
                ${this.props.rentalCostPerHour} hourly
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                component="h2"
                variant="body2"
                color="textPrimary"
                align="right"
              >
                Status: {this.props.status}
              </Typography>
            </Grid>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.editForm(carId)}
                  >

                    Edit
                  </Button>
            &nbsp;
            {this.props.status !== "Booked" && (
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
              >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => this.retireVehicle()}
                  >
                    Retire
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  {this.props.maintenance === false ? (
                    <Button
                      fullWidth
                      variant="contained"
                      className="maintenanceButton"
                      onClick={() => this.maintainVehicle(true)}
                    >
                      Maintenance
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      className="availableButton"
                      onClick={() => this.maintainVehicle(false)}
                    >
                      Available
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => this.removeVehicle(this.props.carId)}
                    startIcon={<DeleteIcon />} 
                    > 
                      Remove
                   </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
          {this.state.removed && <div style={{ color: "red" }}>REMOVED</div>}
          <div>
            {this.state.editing && (
              <EditCar
                carId={this.props.carId}
                car={this.props}
                action="EDITING"
              ></EditCar>
            )}
          </div>
        </ListItem>
        <Divider component="li" />
      </div>
    );
  }
}
export default AdminCar;
