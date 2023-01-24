import "react-native";
import React from "react";
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
jest.useFakeTimers();

it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  // This test just checks if the login page loads correctly
});

test("Login sucessfully for user account", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "jasmine@user.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
  });
  // This test is to check if we input the right email and password we will go to the user page
});

test("Login sucessfully for organizer account", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "jasmine@organizer.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
  });
  // This test is to check if we input the right email and password we will go to the organizer page
});

test("Incorrect email", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "aa")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
    expect(Alert.alert).toHaveBeenCalled();
  });
  // This test checks if we input a non email field we will get an alert that it is wrong
});

test("Wrong password", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "jasmine@organizer.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone")
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
    expect(Alert.alert).toHaveBeenCalled();
  });
  // This test checks if we input an wrong password we will get an alert that it is wrong
});

test("Empty email", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), " ")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
    expect(Alert.alert).toHaveBeenCalled();
  });
  // This test checks if we input an empty email field we will get an alert that it is wrong
});

test("Empty password", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "jasmine@user.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), " ")
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
    expect(Alert.alert).toHaveBeenCalled();
  });
  // This test checks if we input an empty password field we will get an alert that it is wrong
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
  //This test checks by pressing forgot password that it will redirct to the reset password page
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
  //This test checks by pressing signup that it will redirct to the signup page
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
