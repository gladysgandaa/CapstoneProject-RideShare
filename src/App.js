import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./App.css";

import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";
import Routes from "./Routes";

//TODO - this should call map now, which will then call map container
const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({ Latitude: -8.0, Longitude: -190.0 });
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

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
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
              <Link to="/signin">
                <Button>Login</Button>
              </Link>
            </>
          )}
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
};

export default App;
