import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TabPanel from "./MaterialTabs.js";
import SideList from "./components/SideList";
import MapContainer from "./components/MapContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">Material Tab Panel:</p>
        <TabPanel></TabPanel>
        <div>
          <MapContainer map={MapContainer} />
        </div>
        <Router>
        <TabPanel></TabPanel>
        <Switch>
          <Route path="/" component={SideList} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
