import React from "react";
import AddCar from "./AddCar";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("AddCar", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<AddCar debug />);
    expect(component).toMatchSnapshot();
  });
});
