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
import { Alert } from "react-native";
import ResetPassword from "../screens/ResetPassword";
import SignUpScreen from "../screens/SignUpScreen";
//import OrganizerDashboardScreen from "../screens/OrganizerDashboard";
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
      "taversofiya@gmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
  });
  // const org = (
  //   <NavigationContainer>
  //     <OrganizerDashboardScreen />
  //   </NavigationContainer>
  // );
  // render(org);
});
test("Incorrect email", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "taversofiya@gmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "123")
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
    expect(Alert.alert).toHaveBeenCalled();
  });
});
test("Going to ResetPassword page", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByText("Forgot Password?"));
  });

  const Reset = (
    <NavigationContainer>
      <ResetPassword />
    </NavigationContainer>
  );
  render(Reset);
  expect(screen.getAllByText("Forgot Password?"));
});

test("Going to Signup page", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByText("Sign up"));
  });

  const signup = (
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  render(signup);
  expect(screen.getAllByText("Please fill the following information"));
});
test("Clicking Facebook", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("facebook"));
  });
});

test("Clicking Twitter", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("twitter"));
  });
});
test("Clicking Google", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("google"));
  });
});
