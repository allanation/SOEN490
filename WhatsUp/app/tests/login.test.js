import "react-native";
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/login";
import renderer from "react-test-renderer";
import { isValidTimestamp } from "@firebase/util";

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

it("Lets", () => {
  const sum = 2 + 2;
  expect(sum).toBe(4);
});
