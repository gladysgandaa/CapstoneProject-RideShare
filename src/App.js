import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";
import AddCar from "./components/Admin/AddCar";
import ReturnCar from "./components/Admin/ReturnCar";
import Payment from "./components/Payment/Payment";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { AppContext } from "./libs/contextLib";
import TabPanel from "./components/Navigation/MaterialTabs.js";
import { Auth } from "aws-amplify";

//TODO - this should call map now, which will then call map container
const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({ Latitude: -8.0, Longitude: -190.0 });

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
      {/* <p className="App-intro">Material Tab Panel:</p> */}
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router>
          <Switch>
            <AppContext.Provider
              value={{ isAuthenticated, userHasAuthenticated }}
            >
              <Route exact path="/">
                <MapContainer
                  map={MapContainer}
                  userLocation={userlocation}
                  centreFromProps={userlocation}
                />
              </Route>
              <Route path="/signin" component={SignIn} />
              <Route path="/book" component={BookingForm} />
              <Route path="/payment" component={Payment} />
              <Route path="/addcar" component={AddCar} />
              <Route path="/returncar" component={ReturnCar} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/signup" component={SignUp} />
            </AppContext.Provider>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
};

export default App;
