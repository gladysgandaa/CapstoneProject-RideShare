import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import UserMarker from "../UserMarker";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { lat: 48.0, lng: -122.0 },
      vehicles: [
        { lat: 37.49855629475769, lng: 144.8674427 },
        { lat: -37.8301784, lng: 144.9674227 },
        { lat: -37.8303434, lng: 144.4444427 },
        { lat: -37.8303784, lng: 144.9673427 },
        { lat: -37.8332784, lng: 144.9672322 },
        { lat: -37.8303123, lng: 144.9777727 }
      ]
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._ismounted = true;
  }

  displayUser = () => {
    return (
      <Marker
        colour="blue"
        name="User Marker"
        position={{
          lat: this.state.user.lat,
          lng: this.state.user.lng
        }}
        onClick={() => console.log("You clicked User Marker")}
      />
    );
  };

  displayVehicles = () => {
    return this.state.vehicles.map((vehicle, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: vehicle.lat,
            lng: vehicle.lng
          }}
          onClick={() => console.log("You clicked Vehicle Marker")}
        />
      );
    });
  };

  setUserLocation = () => {
    console.log("set location called");
    navigator.geolocation.getCurrentPosition(position => {
      console.log("getCurrentPosition called");
      const user = { ...this.state.user };
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      this.setState({ user });
      console.log("user: ", this.state.user);
    });
  };

  //can get state, cannot set it
  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    console.log("state", this.state);
    return (
      <div>
        <h3></h3>
        <Map
          user={this.state.user}
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: -37.8303708, lng: 144.9674938 }} //Work out how to set this dynamically
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
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(MapContainer);
