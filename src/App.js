import React, { Component } from "react";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MapContainer from "./components/MapContainer";
import Booking from "./booking";

//TODO - this should call map now, which will then call map container
class App extends Component {
  state = {
    user: { Latitude: -8.0, Longitude: -190.0 }
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const user = { ...this.state.user };
      user.Latitude = position.coords.latitude;
      user.Longitude = position.coords.longitude;
      this.setState({ user });
      console.log("user location form App.js:", this.state.user);
    });
  };

  render() {
    this.setUserLocation();
    console.log("state.user", this.state.user);
    const userlocation = { lat: -37.8303789, lng: 144.9674638 };
    return (
      <div className="App">
        <p className="App-intro">Material Tab Panel:</p>
        <Router>
          <TabPanel></TabPanel>
          <Switch>
            <Route exact path="/">
              <MapContainer
                map={MapContainer}
                userLocation={userlocation}
                centreFromProps={userlocation}
              />
            </Route>

            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/booking" component={Booking} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
