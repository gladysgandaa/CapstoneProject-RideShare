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
import { useAppContext } from "./libs/contextLib";

export default function Routes() {
  const userlocation = { lat: -37.8303789, lng: 144.9674638 };
  const { isAdmin } = useAppContext();
  return (
    <Switch>
      <Route exact path="/">
        <MapContainer
          map={MapContainer}
          userLocation={userlocation}
          centreFromProps={userlocation}
          admin={isAdmin}
        />
      </Route>
      <Route exact path="/book" component={BookingForm} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/returncar" component={ReturnCar} />
      <Route exact path="/history" component={History} />
      <Route exact path="/admin">
        <AdminDashboard admin={isAdmin} />
      </Route>
      <Route exact path="/addcar" component={AddCar} />
    </Switch>
  );
}
