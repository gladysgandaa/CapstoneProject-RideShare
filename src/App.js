import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";
import Payment from "./components/Payment/Payment";
import { AppContext } from "./libs/contextLib";

//TODO - this should call map now, which will then call map container
const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({ Latitude: -8.0, Longitude: -190.0 });

  const setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const currentUser = { ...user };
      currentUser.Latitude = position.coords.latitude;
      currentUser.Longitude = position.coords.longitude;
      setUser({ currentUser });
    });
  };

  setUserLocation();
  const userlocation = { lat: -37.8303789, lng: 144.9674638 };

  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
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
            <Route path="/book" component={BookingForm} />
            <Route path="/payment" component={Payment} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
};

export default App;
