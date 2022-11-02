import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Login from "../screens/Login";
it("renders correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

/*it("renders deafult elements", () => {
  const { getAllByText, getByPlaceHolderText } = render(<Login />);
  except(getAllByText("Login".length).toBe(2));
  getByPlaceHolderText("Email");
  getByPlaceHolderText("Password");
});

test("renders correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});*/
