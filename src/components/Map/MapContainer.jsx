/* global google */
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import Grid from "@material-ui/core/Grid";
import axios from "axios";

import SideList from "./SideList";
import "react-rangeslider/lib/index.css";
import MapFunctions from "./MapFunctions";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.lastUpdateDate = new Date();
    this.state = {
      updatedLocation: false,
      search_distance: 10,
      markerName: "placeholder",
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      vehicleDistances: [],
      user: this.props.userLocation,
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
  componentDidMount() {
    this.setUserLocation();
  }

  //Marker Functions
  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      markerName: marker.name,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  removeFarVehicles = () => {
    var rmDbVehicles = JSON.parse(JSON.stringify(this.state.dbVehicles));
    for (var d in rmDbVehicles) {
      if (rmDbVehicles[d].distance > this.state.search_distance) {
        delete rmDbVehicles[d];
        this.setState({ dbVehicles: rmDbVehicles });
      }
    }
  };

  getVehicles = () => {
    axios
      .get(
        "https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/cars/available"
      )
      .then(res => {
        const dbVehicles = res.data;
        this.setState({ dbVehicles }, () => {
          this.getDistances(this.state.user, this.state.dbVehicles);
          this.removeFarVehicles();
        });
      });
  };

  displayUser = () => {
    return (
      <Marker
        name="User Marker"
        position={{
          lat: this.state.user.lat,
          lng: this.state.user.lng
        }}
      />
    );
  };

  displayVehicles = () => {
    //This doesn't work
    if (!this.state.dbVehicles) {
      console.log("no vehicles");
      return null;
    }

    return this.state.dbVehicles.map((dbVehicle, index) => {
      return (
        <Marker
          name={dbVehicle.make.concat(" ", dbVehicle.model)}
          key={index}
          id={index}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            anchor: new google.maps.Point(0, 53),
            labelOrigin: new google.maps.Point(14, 53)
          }}
          position={{
            lat: dbVehicle.currentLocation.Latitude,
            lng: dbVehicle.currentLocation.Longitude
          }}
          onClick={this.onMarkerClick}
        />
      );
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const currentUser = { lat: 1.0, lng: 1.0 };
      currentUser.lat = position.coords.latitude;
      currentUser.lng = position.coords.longitude;
      this.setState({ user: currentUser });
      console.log("user position", this.state.user);
      this.setState({ updatedLocation: true });
      this.getVehicles();
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
          distance: MapFunctions.haversineDistance(
            user,
            args[a][b].currentLocation
          )
        });
      }
    }

    distances.sort((a, b) => (a.distance > b.distance ? 1 : -1));

    for (var d in distances) {
      for (var v in vehicleDbCopy) {
        if (vehicleDbCopy[v].carId === distances[d].carId) {
          vehicleDbCopy[v].distance = distances[d].distance;
        }
      }
    }
    return distances;
  };

  render() {
    console.log(this.props);
    if (!this.props.loaded) return <div>Loading...</div>;
    const navHeight = document.getElementById("nav").clientHeight;
    const containerStyle = {
      flexGrow: "inherit",
      maxWidth: "inherit",
      maxHeight: `calc(100% - ${navHeight}px)`,
      flexBasis: "inherit"
    };

    if (this.state.updatedLocation === true) {
      return (
        <Grid container>
          <Grid item xs={12} sm={4}>
            <SideList cars={this.state.dbVehicles} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Map
              google={this.props.google}
              onClick={this.onMapClicked}
              user={this.state.user}
              zoom={15}
              initialCenter={this.state.user}
              center={this.state.user}
              containerStyle={containerStyle}
            >
              {this.displayVehicles()}
              {this.displayUser()}
              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{this.state.markerName}</h4>
                </div>
              </InfoWindow>
            </Map>
          </Grid>
        </Grid>
      );
    } else {
      console.log("user position before update", this.state.user);
      return <h3>Loading...</h3>;
    }
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(MapContainer);
