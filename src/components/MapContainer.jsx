import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: { lat: 48.0, lng: -122.0 },
      vehicles: [
        { lat: -37.7985769, lng: 144.8674427 },
        { lat: -37.8301784, lng: 144.9674227 },
        { lat: -37.8303434, lng: 144.7444427 },
        { lat: -37.8303784, lng: 144.9673427 },
        { lat: -37.8332784, lng: 144.9672322 },
        { lat: -37.8303123, lng: 144.9777727 }
      ],
      centre: { lat: -37.8303708, lng: 144.9674938 }
    };
  }

  componentDidMount() {
    console.log("mounted");
    this.handleHaversine(this.state.user, this.state.vehicles);
    var distance = this.haversineDistance(
      this.state.user,
      this.state.vehicles[1]
    );
    console.log("distance : ", distance);
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

  setLocation = () => {
    console.log("centre : ", this.state.centre);
    navigator.geolocation.getCurrentPosition(position => {
      const user = { ...this.state.user };
      const centre = { ...this.state.centre };
      user.lat = position.coords.latitude;
      user.lng = position.coords.longitude;
      centre.lat = position.coords.latitude;
      centre.lng = position.coords.longitude;
      this.setState({ user });
      this.setState({ centre });
      console.log("centre after : ", this.state.centre);
    });
  };

  //return array ot tuples with the marker as well
  handleHaversine = (user, ...args) => {
    var distances = [];
    for (var a in args) {
      console.log("args[a]", args[a]);
      for (var b in args[a]) {
        distances.push(this.haversineDistance(user, args[a][b]));
      }
    }
    console.log("shortest distance is:", distances.sort()[0]);
  };

  //remove position
  haversineDistance = (mk1, mk2) => {
    console.log("haversine called");
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
          onReady={this.setLocation}
          initialCenter={this.state.centre} //Work out how to set this dynamically
        >
          {this.setLocation()}
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
