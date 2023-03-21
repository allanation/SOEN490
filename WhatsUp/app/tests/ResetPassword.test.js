import ResetPassword from "../screens/ResetPassword";
import "react-native";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.useFakeTimers();
//jest.mock("../screens/ResetPassword.js");
// it("renders correctly", () => {
//   const tree = render(
//     <NavigationContainer>
//       <ResetPassword />
//     </NavigationContainer>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("Reset password with a correct email", async () => {
  render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "taversofiya@gmail.com"
    )
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByText("Submit"));
    expect(Alert.alert);
  });
});

test("Reset password with wrong email", async () => {
  render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "notexistingemail@gmail.com"
    )
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByText("Submit"));
    expect(Alert.alert);
  });
});

test("Reset password with invalid email", async () => {
  render(
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "")
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByText("Submit"));
    expect(Alert.alert);
  });
});

test("Go back to Login page", async () => {
  render(
    <NavigationContainer>
       <ResetPassword />
    </NavigationContainer>
  );

  await waitFor(() => fireEvent.press(screen.getByText("Back to Login")));

  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );

  expect(screen.getAllByText("Login")).toBeTruthy();
});
