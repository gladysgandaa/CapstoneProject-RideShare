import React, { Component } from "react";
import "./App.css";
import TabPanel from "./components/Navigation/MaterialTabs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";

//TODO - this should call map now, which will then call map container
class App extends Component {
  render() {
    return (
      <div className="App">
        <BookingForm />
        <p className="App-intro">Material Tab Panel:</p>
        <Router>
          <TabPanel></TabPanel>
          <Switch>
            <Route exact path="/">
              <MapContainer map={MapContainer} />
            </Route>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/book" component={BookingForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
