import React from "react";
import Booking from "./Booking";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

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

it("Should trigger onChange", () => {
  const changeHandler = jest
    .fn()
    .mockImplementation(cb => () => cb({ test: "test" }));
  const wrapper = shallow(
    <Booking
      {...mockProps}
      form="test"
      changeHandler={changeHandler}
      props={mockProps}
    />
  );
  wrapper.find("form").simulate("submit");
  expect(changeHandler).toBeCalledTimes(1);
});

//Fails correctly
// it("Should trigger form submit", () => {
//   const submitHandler = jest
//     .fn()
//     .mockImplementation(cb => () => cb({ test: "test" }));
//   const wrapper = shallow(
//     <Booking
//       {...mockProps}
//       form="test"
//       submitHandler={submitHandler}
//       props={mockProps}
//     />
//   );
//   wrapper.find("form").simulate("submit");
//   expect(submitHandler).toBeCalledTimes(1);
// });
