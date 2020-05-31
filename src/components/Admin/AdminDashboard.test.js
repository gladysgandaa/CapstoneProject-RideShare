import React from "react";
import AdminDashboard from "./AdminDashboard";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("AdminDashboard", () => {
  it('should render correctly in "debug" mode', () => {
    const component = mount(<AdminDashboard debug />);
    expect(component).toMatchSnapshot();
  });
});
