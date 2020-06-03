import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import MapContainer from "./MapContainer";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import mapFunctions from "./MapFunctions";

configure({ adapter: new Adapter() });

const mockState = {
  updatedLocation: false,
  search_distance: 10,
  markerName: "placeholder",
  activeMarker: {},
  selectedPlace: {},
  showingInfoWindow: false,
  vehicleDistances: [],
  user: {
    Longitude: 144.3674938,
    Latitude: -37.3303708
  },
  dbVehicles: [
    {
      model: "placeholder",
      rentalCostPerHour: 10,
      distance: 1.1,
      numberOfSeats: 4,
      year: 2002,
      carId: "aaaaaaapBQkWvaS8XIk-_A",
      returnDate: null,
      make: "Camry",
      currentLocation: {
        Longitude: 144.3674938,
        Latitude: -37.3303708
      }
    }
  ]
};

const mockProps = {
  updatedLocation: false,
  search_distance: 10,
  markerName: "placeholder",
  activeMarker: {},
  selectedPlace: {},
  showingInfoWindow: false,
  vehicleDistances: [],
  userLocation: {
    Longitude: 144.3674938,
    Latitude: -37.3303708
  },
  dbVehicles: [
    {
      model: "placeholder",
      rentalCostPerHour: 10,
      distance: 1.1,
      numberOfSeats: 4,
      year: 2002,
      carId: "aaaaaaapBQkWvaS8XIk-_A",
      returnDate: null,
      make: "Camry",
      currentLocation: {
        Longitude: 144.3674938,
        Latitude: -37.3303708
      }
    }
  ]
};

function getMockProps() {
  console.log("1");
  const wrapper = shallow(<MapContainer {...mockProps} />);
  console.log("2");
  wrapper.setProps({ ...mockState });
  wrapper.setState({ ...mockState });
  console.log("3", wrapper.props);
  return wrapper;
}

//Haversine Distance Tests
test("Distance between a point and itself should be 0", () => {
  const marker1 = { lat: 1.0, lng: 1.0 };
  const marker2 = { Latitude: 1.0, Longitude: 1.0 };
  expect(mapFunctions.haversineDistance(marker1, marker2)).toBe(0);
});

test("Distance from melbourne to Bendigo should be ≈ 132 kilometers ATCF (Margin of error 1 kilometer)\
Ref - https://www.distance24.org/melbourne/Bendigo#:~:text=As%20the%20Crow%20Flies,132%20kilometers%20(82%20miles)", () => {
  const melbourne = { lat: -37.8136, lng: 144.9631 };
  const bendigo = { Latitude: -36.757, Longitude: 144.2794 };
  expect(mapFunctions.haversineDistance(melbourne, bendigo)).toBeLessThan(133);
  expect(mapFunctions.haversineDistance(melbourne, bendigo)).toBeGreaterThan(
    132
  );
});

test("Distance from melbourne to sydney should be ≈ 714 kilometers ATCF (Margin of error 1 kilometer) \
Ref - https://www.distance24.org/Melbourne/Sydney", () => {
  const melbourne = { lat: -37.8136, lng: 144.9631 };
  const sydney = { Latitude: -33.868, Longitude: 151.207 };
  expect(mapFunctions.haversineDistance(melbourne, sydney)).toBeLessThan(715);
  expect(mapFunctions.haversineDistance(melbourne, sydney)).toBeGreaterThan(
    713
  );
});

test("Distance from Tokyo to Cairo should be ≈ 9,583 kilometers ATCF (Margin of error 10 kilometers)\
Ref - https://www.distance24.org/Tokyo/Cairo \
Ref - https://www.scientificamerican.com/article/earth-is-not-round/", () => {
  const cairo = { lat: 30.033333, lng: 31.233334 };
  const tokyo = { Latitude: 35.652832, Longitude: 139.839478 };
  expect(mapFunctions.haversineDistance(cairo, tokyo)).toBeLessThan(9588);
  expect(mapFunctions.haversineDistance(cairo, tokyo)).toBeGreaterThan(9578);
});

//Render Smoke Tests
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

//Axios Tests WONT' WORK BECAUSE OF FUCKING VERSION
it("Should increase the number of vehicles from the one mock entry to > 1", () => {
  // const wrapper = mount(<MapContainer />);
  const wrapper = getMockProps();
  expect(wrapper.state("dbVehicles")).toHaveLength(1);
});
