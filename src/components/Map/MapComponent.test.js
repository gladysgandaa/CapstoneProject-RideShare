import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import MapContainer from "./MapContainer";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mapFunctions from "./MapFunctions";

configure({ adapter: new Adapter() });

test("Distance should be nothing between a point and itself", () => {
  const marker1 = { lat: 1.0, lng: 1.0 };
  const marker2 = { Latitude: 1.0, Longitude: 1.0 };
  expect(mapFunctions.haversineDistance(marker1, marker2)).toBe(0);
});

it("Initial loading state", () => {
  const tree = renderer.create(<MapContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("MapContainer", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<MapContainer debug />);
    expect(component).toMatchSnapshot();
  });
});
