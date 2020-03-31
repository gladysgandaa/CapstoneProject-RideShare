import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signin">SignIn</NavLink>
      <NavLink to="/signup">SignUp</NavLink>
    </div>
  );
};

export default Navigation;
