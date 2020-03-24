import React, { Component } from "react";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <TabPanel></TabPanel>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">Home</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
