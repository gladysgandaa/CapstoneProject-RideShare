import React from "react";
const functions = require("./functions");
const mapFunctions = require("../components/Map/MapFunctions");
import MapContainer from "../components/Map/MapContainer";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AddCar from "../components/Admin/AddCar";
import ReturnCar from "../components/Admin/ReturnCar";

configure({ adapter: new Adapter() });

test("Distance should be nothing between a point and itself", () => {
  const marker1 = { lat: 1.0, lng: 1.0 };
  const marker2 = { Latitude: 1.0, Longitude: 1.0 };
  expect(mapFunctions.haversineDistance(marker1, marker2)).toBe(0);
});

describe("MapContainer", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<MapContainer debug />);
    expect(component).toMatchSnapshot();
  });
});

it("renders without crashing", () => {
  shallow(<App />);
});
