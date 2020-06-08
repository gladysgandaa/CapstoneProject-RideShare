/* global google */
import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import SideList from "../Map/SideList";
import MaterialDialog from "../Dialog/Dialog";
import SignIn from "../Authentication/SignIn";
import AddCar from "./AddCar";

class AdminDashboard extends Component {
  //Need to decide where this component fits in
  constructor(props) {
    super(props);
    this.state = {
      markerName: "placeholder",
      activeMarker: {},
      selectedPlace: {},
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
      open: false,
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

  displayVehicles = () => {
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

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      loggedIn: true
    });
  };

  onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log("position", lat);
    this.setState({ Longitude: lng, Latitude: lat });
  };

  render() {
    const navHeight = document.getElementById("nav").clientHeight;
    const containerStyle = {
      flexGrow: "inherit",
      maxWidth: "inherit",
      maxHeight: `calc(100% - ${navHeight}px)`,
      flexBasis: "inherit"
    };

    if (this.state.callComplete === true) {
      return (
        <div>
          {this.props.admin === false && <SignIn />}
          {this.props.admin === true && (
            <div>
              <div>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <div>
                      <Button
                        fullWidth
                        onClick={this.handleOpen}
                        id="addCarButton"
                      >
                        Add a Car
                      </Button>
                      <MaterialDialog
                        content={<AddCar />}
                        open={this.state.open}
                        handleClose={this.handleClose}
                      />
                      <SideList cars={this.state.dbVehicles} />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Map
                      google={this.props.google}
                      zoom={12}
                      initialCenter={{ lat: -37.8136, lng: 144.9631 }}
                      center={this.props.userLocation}
                      onClick={this.onClick}
                      containerStyle={containerStyle}
                    >
                      {this.displayVehicles()}
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(AdminDashboard);
