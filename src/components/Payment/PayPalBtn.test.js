import React from "react";
import PayPalBtn from "./PayPalBtn";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("Render input values", () => {
  const currency = "USD";
  const amount = 200;
  const component = shallow(<PayPalBtn amount={amount} currency={currency} />);
  expect(component).toMatchSnapshot();
});
