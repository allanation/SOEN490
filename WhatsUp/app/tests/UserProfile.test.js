import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import UserProfile from "../screens/UserProfile";
import Login from "../screens/Login";

jest.useFakeTimers();

it("Renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Successful log out and go back to Login page", async () => {
  render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  );

  await waitFor(() => fireEvent.press(screen.getByText("Log out")));
  const ls = (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  render(ls);
  expect(screen.getByText("Please enter your details"));
});


