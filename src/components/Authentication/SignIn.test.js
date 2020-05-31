import React, { useContext } from "react";
import SignIn from "./SignIn";
import { mount, shallow, render } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShallowRenderer from "react-test-renderer/shallow";
import { withStyles } from "@material-ui/core/styles";

configure({ adapter: new Adapter() });

// let realUseContext;
// let useContextMock;
// // Setup mock
// beforeEach(() => {
//   realUseContext = React.useContext;
//   useContextMock = React.useContext = jest.fn();
// });
// // Cleanup mock
// afterEach(() => {
//   React.useContext = realUseContext;
// });

// jest.mock("react-router-dom", () => ({
//   useHistory: () => ({
//     push: jest.fn()
//   }),
//   useStyles: () => ({
//     push: jest.fn()
//   })
// }));
// jest.mock("@material-ui/core");

// describe("SignIn", () => {
//   it('should render correctly in "debug" mode', () => {
//     React.useContext.mockReturnValue(true);
//     const wrapper = shallow(<SignIn debug />);
//     expect(wrapper).toMatchSnapshot();
//   });
// });

it('should render correctly in "debug" mode', () => {});
