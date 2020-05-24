import React from "react";
import { Route, Switch } from "react-router-dom";

import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import History from "./components/History/History";
import MapContainer from "./components/Map/MapContainer";
import BookingForm from "./components/Booking/Booking";
import AddCar from "./components/Admin/AddCar";
import ReturnCar from "./components/Admin/ReturnCar";

import Payment from "./components/Payment/Payment";
import AdminDashboard from "./components/Admin/AdminDashboard";

export default function Routes() {
  const userlocation = { lat: -37.8303789, lng: 144.9674638 };
  return (
    <Switch>
      <Route exact path="/">
        <MapContainer
          map={MapContainer}
          userLocation={userlocation}
          centreFromProps={userlocation}
        />
      </Route>
      <Route path="/signin" component={SignIn} />
      <Route path="/book" component={BookingForm} />
      <Route path="/payment" component={Payment} />
      <Route path="/addcar" component={AddCar} />
      <Route path="/returncar" component={ReturnCar} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/history" component={History} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}
