import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./App.css";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";
import AddCar from "./components/Admin/AddCar";
import ReturnCar from "./components/Admin/ReturnCar";

import Payment from "./components/Payment/Payment";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";

//TODO - this should call map now, which will then call map container
const App = () => {
  const history = useHistory();
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
        onError(e);
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

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    !isAuthenticating && (
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
                {isAuthenticated ? (
                  <Button onClick={handleLogout}>Logout</Button>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button>Signup</Button>
                    </Link>
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                  </>
                )}
              </AppContext.Provider>
            </Switch>
          </Router>
        </AppContext.Provider>
      </div>
    )
  );
};

export default App;
