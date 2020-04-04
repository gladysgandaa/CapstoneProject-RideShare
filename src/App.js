import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SideList from "./components/SideList";
import MapContainer from "./components/MapContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">Material Tab Panel:</p>
        <Router>
          <TabPanel></TabPanel>
          <Switch>
            {/* <Route path="/" component={SideList} exact /> */}
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
        <div>
          <MapContainer map={MapContainer} />
        </div>
      </div>
    );
  }
}

export default App;
