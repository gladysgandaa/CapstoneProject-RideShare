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
  render() {
    return (
      <div className="App">
        <p className="App-intro">Material Tab Panel:</p>
        <Router>
          <TabPanel></TabPanel>
          <Switch>
            <Route exact path="/">
              <MapContainer map={MapContainer} />
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
