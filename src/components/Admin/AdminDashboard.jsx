import React, { Component } from "react";
import axios from "axios";
import SideList from "../Map/SideList";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

class AdminDashboard extends Component {
  //Need to decide where this component fits in
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      account: "admin",
      callComplete: false,
      username: "",
      password: "",
      model: "model",
      rentalCostPerHour: 10,
      numberOfSeats: 4,
      year: 2002,
      carId: "placeholder id",
      returnDate: null,
      make: "make",
      Longitude: 144.3674938,
      Latitude: -37.3303708,
      dbVehicles: [
        {
          model: "Recognisable Name",
          rentalCostPerHour: 10,
          distance: 1.1,
          numberOfSeats: 4,
          year: 2002,
          carId: "placeholder id",
          returnDate: null,
          make: "Recognisable Make",
          currentLocation: {
            Longitude: 144.3674938,
            Latitude: -37.3303708
          }
        }
      ]
    };
  }

  componentWillMount() {
    this.getVehicles();
  }

  //Get vehicle and store IDs
  getVehicles = () => {
    axios
      .get("https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/cars")
      .then(res => {
        const dbVehicles = res.data;
        this.setState({ dbVehicles });
        this.setState({ callComplete: true });
      });
  };

  addVehicle = () => {
    console.log("state before post", this.state);
    const formatPost =
      '{\
      "model": "' +
      this.state.model +
      '",\
      "rentalCostPerHour": ' +
      this.state.rentalCostPerHour +
      ',\
      "numberOfSeats": ' +
      this.state.numberOfSeats +
      ',\
      "year": ' +
      this.state.year +
      ',\
      "carId": "",\
      "returnDate": null,\
      "make": "' +
      this.state.make +
      '",\
      "currentLocation": {\
          "Longitude": ' +
      this.state.Longitude +
      ',\
          "Latitude": ' +
      this.state.Latitude +
      "\
      }\
  }";

    axios({
      method: "post",
      url: "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/car",
      headers: {},
      data: formatPost
    });
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.state.loggedIn = true;
    this.setState({
      loggedIn: true
    });
  };

  submitVehicle = e => {
    // this.setState({inputVehicle: e});
    this.addVehicle();
  };

  onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log("position", lat);
    this.setState({ Longitude: lng });
    this.setState({ Latitude: lat });
  };

  render() {
    const useStyles = makeStyles(theme => ({
      inline: {
        display: "inline"
      }
    }));

    if (this.state.callComplete == true) {
      return (
        <div>
          {this.state.loggedIn == false && (
            <form>
              <br />
              <input
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.change(e)}
              />
              <br />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={e => this.change(e)}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.onSubmit(e)}
              >
                Submit
              </Button>
            </form>
          )}
          {this.state.loggedIn && (
            <div>
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <div>
                      <br />
                      Add New
                      <form>
                        <input
                          name="model"
                          placeholder="model"
                          value={this.state.model}
                          onChange={e => this.change(e)}
                        />
                        <br />
                        <input
                          name="make"
                          placeholder="make"
                          value={this.state.make}
                          onChange={e => this.change(e)}
                        />
                        <br />
                        <input
                          name="cost"
                          placeholder="cost per hour"
                          value={this.state.rentalCostPerHour}
                          onChange={e =>
                            this.setState({ rentalCostPerHour: e.target.value })
                          }
                        />
                        <br />
                        <input
                          name="seats"
                          placeholder="seats"
                          value={this.state.numberOfSeats}
                          onChange={e =>
                            this.setState({ numberOfSeats: e.target.value })
                          }
                        />
                        <br />
                        <input
                          name="year"
                          placeholder="year"
                          value={this.state.year}
                          onChange={e => this.change(e)}
                        />
                        <br />
                        <input
                          name="longitude"
                          placeholder="Longitude"
                          value={this.state.Longitude}
                          onChange={e =>
                            this.setState({ Longitude: e.target.value })
                          }
                        />
                        <br />
                        <input
                          name="latitude"
                          placeholder="Latitude"
                          value={this.state.Latitude}
                          onChange={e =>
                            this.setState({ Latitude: e.target.value })
                          }
                        />
                        <br />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => this.submitVehicle(e)}
                        >
                          Add Car
                        </Button>
                      </form>
                      <SideList
                        cars={this.state.dbVehicles}
                        account={this.state.account}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Map
                      google={this.props.google}
                      zoom={12}
                      initialCenter={{ lat: -37.8136, lng: 144.9631 }}
                      center={this.props.userLocation}
                      onClick={this.onClick}
                    >
                      <Marker
                        onClick={this.onMarkerClick}
                        name={"Current location"}
                      />
                    </Map>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
  }
}

const style = {
  margin: 15
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(AdminDashboard);
