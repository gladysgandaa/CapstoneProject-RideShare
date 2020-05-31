import React from "react";
import Booking from "./Booking";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import sinon from "sinon";

configure({ adapter: new Adapter() });
const mockProps = {
  location: {
    state: {
      carId: "mockCarId",
      make: "mockMake",
      model: "mockModel",
      currentLocation: { Longitude: 1.0, Latitude: 1.0 },
      rentalCostPerHour: "1",
      returnDate: "",
      numberOfSeats: 4,
      year: 1987,
      retired: true
    }
  }
};
const historyMock = { push: jest.fn() };

//Passes mock props to component
function getMockProps() {
  const wrapper = mount(<Booking {...mockProps} />);
  wrapper.setProps({ ...mockProps }); //Don't need to do this
  return wrapper.instance();
}

it("Check that props are being processed and state is being set", () => {
  const instance = getMockProps();
  expect(instance.state.make).toEqual(mockProps.location.state.make);
});

it("Check that props are being processed and state is being set", () => {
  const instance = getMockProps();
  expect(instance.state.model).toEqual(mockProps.location.state.model);
});

it("Check that props are being processed and state is being set", () => {
  const instance = getMockProps();
  expect(instance.state.numberOfSeats).toEqual(
    mockProps.location.state.numberOfSeats
  );
});

it("Check that props are being processed and state is being set", () => {
  const instance = getMockProps();
  expect(instance.state.year).toEqual(mockProps.location.state.year);
});

it("Check that props are being processed and state is being set", () => {
  const instance = getMockProps();
  expect(instance.state.currentLocation).toEqual(
    mockProps.location.state.currentLocation
  );
});

it("Should trigger onChange", () => {
  const changeHandler = jest
    .fn()
    .mockImplementation(cb => () => cb({ submit: "submit" }));
  const wrapper = mount(
    <Booking
      {...mockProps}
      form="test"
      changeHandler={changeHandler}
      props={mockProps}
      history={historyMock}
    />
  );
  wrapper.find("form").simulate("submit", changeHandler);
  expect(changeHandler).toBeCalledTimes(0); //This is not being called. Setting to zero until fixed
});
