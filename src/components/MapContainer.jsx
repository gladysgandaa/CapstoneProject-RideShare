import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { blue } from "@material-ui/core/colors";
import axios from "axios";
import SideList from "./SideList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "test",
      centre: { lat: -37.8303708, lng: 144.9674938 },
      vehicleDistances: [],
      user: { Latitude: 48.0, Longitude: -122.0 },
      vehicles: [
        {
          name: "car0",
          coords: { lat: -37.7985769, lng: 144.8674427 },
          available: false,
          distance: 1.1
        },
        {
          name: "car1",
          coords: { lat: -37.8301784, lng: 144.9674227 },
          available: false,
          distance: 2.4
        }
      ],
      dbVehicles: [
        {
          model: "placeholder",
          rentalCostPerHour: 10,
          distance: 1.1,
          numberOfSeats: 4,
          year: 2002,
          carId: "aaaaaaapBQkWvaS8XIk-_A",
          returnDate: null,
          make: "Camry",
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
    console.log("before render");
  }

  //Set state with variable length array to simulate DB connection. Works
  getVehicles = () => {
    axios
      .get("https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/cars")
      .then(res => {
        const dbVehicles = res.data;
        this.setState({ dbVehicles }, () => {
          this.getDistances(this.state.user, this.state.dbVehicles);
        });
      });
  };

  displayUser = () => {
    return (
      <Marker
        name="User Marker"
        position={{
          lat: this.state.user.Latitude,
          lng: this.state.user.Longitude
        }}
        onClick={() => console.log("You clicked User Marker")}
      />
    );
  };

  displayVehicles = () => {
    return this.state.dbVehicles.map((dbVehicle, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
          position={{
            lat: dbVehicle.currentLocation.Latitude,
            lng: dbVehicle.currentLocation.Longitude
          }}
          onClick={() => console.log(dbVehicle.model)}
        />
      );
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const user = { ...this.state.user };
      user.Latitude = position.coords.latitude;
      user.Longitude = position.coords.longitude;
      this.setState({ user });
    });
  };

  getDistances = (user, ...args) => {
    var distances = [];
    //adding as attribute
    const vehicleDbCopy = { ...this.state.dbVehicles };
    for (var a in args) {
      for (var b in args[a]) {
        distances.push({
          carId: args[a][b].carId,
          distance: this.haversineDistance(user, args[a][b].currentLocation)
        });
      }
    }

    distances.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    this.setState({ vehicleDistances: distances });

    //this is setting state somehow
    for (var d in distances) {
      for (var v in vehicleDbCopy) {
        if (vehicleDbCopy[v].carId === distances[d].carId) {
          vehicleDbCopy[v].distance = distances[d].distance;
        }
      }
    }

    this.setState({ vehicleDbCopy });

    return distances;
  };

  haversineDistance = (mk1, mk2) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.Latitude * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.Latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.Longitude - mk1.Longitude) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  };

  setCentre = () => {
    this.setState(prevState => {
      let mapCenter = Object.assign({}, prevState.center);
      mapCenter.lat = this.state.user.lat;
      mapCenter.lng = this.state.user.lng;
      this.setState({ center: mapCenter });
      console.log("setCentre called, state = ", this.state);
    });
  };

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      }
    }));

    console.log("render - state", this.state);
    return (
      <div style={useStyles.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <SideList cars={this.state.dbVehicles} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Map
              user={this.state.user}
              google={this.props.google}
              zoom={10}
              style={mapStyles}
              onReady={this.setUserLocation}
              initialCenter={this.state.centre} //Work out how to set this dynamically
            >
              {this.setUserLocation()}
              {this.displayUser()}
              {this.displayVehicles()}
            </Map>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(MapContainer);
//AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI
