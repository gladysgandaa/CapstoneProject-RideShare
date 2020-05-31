import React, { useState, useEffect } from "react";

import "./App.css";

import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import NavigationMenu from "./components/Navigation/NavigationMenu";
import Routes from "./Routes";

//TODO - this should call map now, which will then call map container
const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({ Latitude: -8.0, Longitude: -190.0 });
  const [isRegistered, userHasRegistered] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [currentSession, setCurrentSession] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const session = await Auth.currentSession();
      const userInfo = await Auth.currentUserInfo();
      setCurrentUser(userInfo);
      setCurrentSession(session);
      userHasAuthenticated(true);
      console.log(session);
      if (
        session.idToken.payload.hasOwnProperty("cognito:groups") &&
        session.idToken.payload["cognito:groups"][0] === "admin"
      ) {
        setIsAdmin(true);
      }
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

  return (
    !isAuthenticating && (
      <div className="App">
        {/* <p className="App-intro">Material Tab Panel:</p> */}
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
            isRegistered,
            userHasRegistered,
            isAdmin,
            setIsAdmin,
            currentSession,
            setCurrentSession,
            currentUser,
            setCurrentUser
          }}
        >
          <NavigationMenu />
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
};

export default App;
