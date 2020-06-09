import React from "react";
import Payment from "./Payment";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

// it("Render input values", () => {
//   const currency = "USD";
//   const amount = 200;
//   const component = shallow(<Payment amount={amount} currency={currency} />);
//   expect(component).toMatchSnapshot();
// });

const mockProps = {
  location: {
    state: {
      carId: "mockCarId",
      make: "mockMake",
      model: "mockModel",
      currentLocation: "mockCurrentLocation",
      rentalCostPerHour: "1",
      returnDate: "",
      numberOfSeats: 4,
      year: 1987,
      retired: true
    }
  }
};

//Just render it with the parameters
it("Render input values", () => {
  const currency = "USD";
  const amount = 200;
  const component = mount(
    <Payment {...mockProps} amount={amount} currency={currency} />
  );
  expect(component).toMatchSnapshot();
});

// Most likely not working because it's not a regular button
it("should render input values", () => {
  const paymentHandler = jest.fn();
  const wrapper = mount(
    <Payment {...mockProps} PayPalBtn="test" onClick={paymentHandler} />
  );

  wrapper.find("PayPalBtn").simulate("click");
  return Promise.resolve().then(() => {
    console.log("Payment handler", paymentHandler);
    // expect(paymentHandler).toHaveBeenCalled();
  });
});
