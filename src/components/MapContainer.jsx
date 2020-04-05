import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { blue } from "@material-ui/core/colors";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SideList from "./SideList";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    //TODO : populated with dummy data. Getting this data into staet from API will require another function
    this.state = {
      test: "test",
      user: { lat: 48.0, lng: -122.0 },
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
      centre: { lat: -37.8303708, lng: 144.9674938 },
      dbVehicles: []
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.populateVariableLengthArray();
    this.getDistances(this.state.user, this.state.vehicles);
    this._ismounted = true;
  }

  //Set state with variable length array to simulate DB connection. Works
  populateVariableLengthArray = () => {
    axios
      .get("https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/cars")
      .then(res => {
        const dbVehicles = res.data.Items;
        this.setState({ dbVehicles });
      });
  };

  //No refactor required
  displayUser = () => {
    return (
      <Marker
        name="User Marker"
        position={{
          lat: this.state.user.lat,
          lng: this.state.user.lng
        }}
        onClick={() => console.log("You clicked User Marker")}
      />
    );
  };

  //display top 3 nearest
  //This should call displayVehicles, so should return a marker
  //in the same way, so that it's callable from render()
  displayByproximity = () => {};

  displayVehicles = () => {
    return this.state.vehicles.map((vehicle, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
          position={{
            lat: vehicle.coords.lat,
            lng: vehicle.coords.lng
          }}
          onClick={() => console.log("You clicked Vehicle Marker")}
        />
      );
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const user = { ...this.state.user };
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      this.setState({ user });
    });
  };

  getDistances = (user, ...args) => {
    var distances = [];
    const vehicleDistances = { ...this.state.vehicles };
    for (var a in args) {
      console.log("args[a]", args[a]);

      for (var b in args[a]) {
        distances.push({
          name: args[a][b].name,
          distance: this.haversineDistance(user, args[a][b].coords)
        });
      }
    }

    //Update state with distances
    for (var d in distances) {
      for (var v in vehicleDistances) {
        if (vehicleDistances[v].name === distances[d].name) {
          vehicleDistances[v].distance = distances[d].distance;
          this.setState({ vehicleDistances });
        }
      }
    }

    console.log("state: ", this.state);
    return distances.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  };

  haversineDistance = (mk1, mk2) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
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
      // return { center: mapCenter };
    });
  };

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    console.log("state from render:", this.state);
    return (
      <div>
        <div>
          <SideList test={this.state.test}></SideList>
        </div>
        <Map
          user={this.state.user}
          google={this.props.google}
          zoom={30}
          style={mapStyles}
          onReady={this.setUserLocation}
          initialCenter={this.state.centre} //Work out how to set this dynamically
        >
          {this.setUserLocation()}
          {this.displayUser()}
          {this.displayVehicles()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
//AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI
