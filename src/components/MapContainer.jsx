import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null
    };
  }

  componentDidMount() {
    console.log("mounted");
    this._ismounted = true;
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  setLocation = () => {
    console.log("set location called");
    navigator.geolocation.getCurrentPosition(position => {
      console.log("getCurrentPosition called");
      const location = position;
      console.log("lat:", position.coords.latitude);
      console.log("long:", position.coords.longitude);
      this.setState({ location });
    });
  };

  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };
    console.log("state", this.state);
    this.setLocation(); //does nothing
    console.log("state called after setlocation", this.state);
    return (
      <div>
        <h3>Testing</h3>
        <Map
          location={this.setLocation()}
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          // initialCenter={{
          //   lat: location.coords.latitude,
          //   lng: location.coords.longitude
          // }}
          // initialCenter={location}
        >
          {this.setLocation()}
          {/* {this.displayMarkers()} */}
          <Marker position={{ lat: 48.0, lng: -122.0 }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ""
})(MapContainer);
//AIzaSyCrDVpHzeaPLfTOvbfNw2_0GRlce2YD2RI
