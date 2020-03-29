import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [
        { lat: 48.0, lng: -122.0 },
        { latitude: 47.359423, longitude: -122.021071 }
      ]
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._ismounted = true;
  }

  displayMarkers = () => {
    return (
      <Marker
        position={{
          lat: this.state.location.lat,
          lng: this.state.location.lng
        }}
        onClick={() => console.log("You clicked me!")}
      />
    );
  };

  setLocation = () => {
    console.log("set location called");
    navigator.geolocation.getCurrentPosition(position => {
      console.log("getCurrentPosition called");
      const location = { ...this.state.location };
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
      this.setState({ location });
      console.log("location: ", this.state.location);
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
          location={this.state.location}
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: -37.8303708, lng: 144.9674938 }} //cannot set this dynamically
        >
          {this.setLocation()}
          {this.displayMarkers()}
          <Marker position={this.state.location} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI"
})(MapContainer);
