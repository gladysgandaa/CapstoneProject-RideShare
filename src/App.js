import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TabPanel from "./MaterialTabs.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TabPanel></TabPanel>
      </div>
    );
  }
}

export default App;
