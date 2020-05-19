import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";

//TODO - this should call map now, which will then call map container
const [isAuthenticated, userHasAuthenticated] = useState(false);
const [isAuthenticating, setIsAuthenticating] = useState(true);

useEffect(() => {
  onLoad();
}, []);

async function onLoad() {
  try {
    await Auth.currentSession();
    userHasAuthenticated(true);
  } catch (e) {
    if (e !== "No current user") {
      alert(e);
    }
  }

  setIsAuthenticating(false);
}

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
        <Router>
          <Switch>
            <Route exact path="/">
              <MapContainer
                map={MapContainer}
                userLocation={userlocation}
                centreFromProps={userlocation}
              />
            </Route>
            <AppContext.Provider
              value={{ isAuthenticated, userHasAuthenticated }}
            >
              <Route path="/signin" component={SignIn} />
            </AppContext.Provider>
            <Route path="/signup" component={SignUp} />
            <Route path="/book" component={BookingForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
