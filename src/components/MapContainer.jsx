import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { lat: 48.0, lng: -122.0 },
      vehicles: [
        { name: "car0", coords: { lat: -37.7985769, lng: 144.8674427 } },
        { name: "car1", coords: { lat: -37.8301784, lng: 144.9674227 } },
        { name: "car2", coords: { lat: -37.8303434, lng: 144.7444427 } },
        { name: "car3", coords: { lat: -37.8303784, lng: 144.9673427 } },
        { name: "car4", coords: { lat: -37.8332784, lng: 144.9672322 } },
        { name: "car5", coords: { lat: -37.8303123, lng: 144.9777727 } }
      ],
      centre: { lat: -37.8303708, lng: 144.9674938 }
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.getDistances(this.state.user, this.state.vehicles);
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
    for (var a in args) {
      console.log("args[a]", args[a]);
      for (var b in args[a]) {
        distances.push({
          name: args[a][b].name,
          distance: this.haversineDistance(user, args[a][b].coords)
        });
      }
    }
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

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    console.log("render called - state:", this.state);
    return (
      <div>
        <h3></h3>
        <Map
          user={this.state.user}
          google={this.props.google}
          zoom={8}
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
// AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI
