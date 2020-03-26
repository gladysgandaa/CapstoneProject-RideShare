import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class App extends Component {
  render() {
    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3o5ior_i7n349A_xgUZQbMQ2QAB-XHqg"
})(App);
