import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
jest.useFakeTimers();
it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login sucessfully", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "hanyelbob99@gmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() => fireEvent.press(screen.getAllByText("Login")[1]));
});
