import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TabPanel from "./MaterialTabs.js";
import MapContainer from "./components/MapContainer";
import TestComponent from "./components/TestComponent";

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
      </div>
    );
  }
}

export default App;
