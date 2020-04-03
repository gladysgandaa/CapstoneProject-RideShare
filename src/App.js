import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TabPanel from "./MaterialTabs.js";
import SideList from "./components/SideList";

class App extends Component {
  render() {
    return (
      <Router>
        <TabPanel></TabPanel>
        <Switch>
          <Route path="/" component={SideList} exact />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
