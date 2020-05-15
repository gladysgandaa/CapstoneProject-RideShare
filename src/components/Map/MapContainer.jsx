/* global google */
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import SideList from "./SideList";

//Make this adjustable
const search_distance = 180;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      centre: { lat: 17.7985769, lng: -144.8674427 },
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

  componentWillMount() {
    this.getVehicles();
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
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
    if (!this.state.dbVehicles[0].distance) {
      return null;
    }

    return this.state.dbVehicles.map((dbVehicle, index) => {
      if (dbVehicle.distance < search_distance) {
        return (
          <Marker
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
            label={{
              text: dbVehicle.make.concat(" ", dbVehicle.model),
              fontFamily: "Arial",
              fontSize: "14px",
              fontWeight: "900"
            }}
            onClick={this.onMarkerClick}
          />
        );
      }
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

  setCentre = () => {
    this.setState(prevState => {
      let mapCenter = Object.assign({}, prevState.centre);
      mapCenter.lat = this.state.user.lat;
      mapCenter.lng = this.state.user.lng;
      this.setState({ centre: mapCenter });
      console.log("setCentre called, state = ", this.state);
    });
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

    console.log("render - state", this.state);
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
              zoom={7}
              style={mapStyles}
              onReady={this.setUserLocation}
              initialCenter={this.state.centre}
              center={this.props.userLocation}
            >
              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}
              >
                <div>
                  <h4>{"MarkerText"}</h4>
                </div>
              </InfoWindow>

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
