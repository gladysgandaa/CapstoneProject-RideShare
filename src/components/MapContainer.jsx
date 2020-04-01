import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { lat: 48.0, lng: -122.0 },
      vehicles: [
        { lat: 37.79855629475769, lng: 144.8674427 },
        { lat: -37.8301784, lng: 144.9674227 },
        { lat: -37.8303434, lng: 144.7444427 },
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

  //remove position
  haversineDistance = (mk1, mk2) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng() - mk1.position.lng()) * (Math.PI / 180); // Radian difference (longitudes)

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
