/* global google */
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SideList from "./SideList";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

class MapContainer extends Component {
  constructor(props) {
    super(props);
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
      .get("https://d8m0e1kit9.execute-api.us-east-1.amazonaws.com/data/cars")
      .then(res => {
        const dbVehicles = res.data;
        this.setState({ dbVehicles }, () => {
          this.getDistances(this.state.user, this.state.dbVehicles);
          this.removeFarVehicles();
        });
      });
  };

  displayUser = () => {
    console.log("display user called");
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
      if (dbVehicle.distance < this.state.search_distance) {
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
      }
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
          distance: this.haversineDistance(user, args[a][b].currentLocation)
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

  //DO NOT LEAVE IT LIKE THIS
  haversineDistance = (mk1, mk2) => {
    var R = 6371; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.Latitude * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.Longitude - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
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

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1
      }
    }));
    if (this.state.updatedLocation == true) {
      return (
        <div style={useStyles.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <SideList cars={this.state.dbVehicles} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Map
                google={this.props.google}
                onClick={this.onMapClicked}
                user={this.state.user}
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                onReady={this.setUserLocation}
                initialCenter={this.state.user}
                center={this.state.user}
              >
                {this.setUserLocation()}
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
        </div>
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
