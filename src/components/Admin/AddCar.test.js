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

// it("renders welcome message", () => {
//   const wrapper = shallow(<AddCar />);
//   const welcome = <h2>Welcome to React</h2>;
//   // expect(wrapper.contains(welcome)).toBe(true);
//   expect(wrapper.contains(welcome)).toEqual(true);
// });
