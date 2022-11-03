import ResetPassword from "../screens/ResetPassword";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
jest.useFakeTimers();
//jest.mock("../screens/ResetPassword.js");
it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Reset Password", async () => {
  render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "hanyelbob99@gmail.com"
    )
  );

  await waitFor(() => fireEvent.press(screen.getByText("Submit")));
  //   jest.spyOn(Alert, "alert");
  //   await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
});

test("Reset password with wrong email", async () => {
  render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "")
  );

  await waitFor(() => fireEvent.press(screen.getByText("Submit")));

  //error message
});
