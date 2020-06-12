import React from "react";
import ReturnCar from "./ReturnCar";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("ReturnCar", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<ReturnCar debug />);
    expect(component).toMatchSnapshot();
  });
});
