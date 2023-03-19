import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import UserProfile from "../screens/UserProfile";

jest.useFakeTimers();

it("Renders correctly user profile page", async () => {
  const tree = render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test("When press on log out icon, prompt a confirmation alert to log out", async () => {
  render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  );

  jest.spyOn(Alert, 'alert');

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("log-out"));
    expect(Alert.alert);
  });
});

test("Edit information with an email that already exists should prompt an alert notifying that the email already exists.", async () => {
  render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("edit-email"));
    fireEvent.changeText(screen.getByPlaceholderText("Email"),"jasmine@user.com");
    fireEvent.press(screen.getByText("Submit"));
    expect(Alert.alert);
  });
});

test("Edit information with an incorrect email, should prompt an alert notifying that the email is incorrect.", async () => {
  render(
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("edit-email"));
    fireEvent.changeText(screen.getByPlaceholderText("Email"),"jasmine123@user.com");
    fireEvent.press(screen.getByText("Submit"));
    expect(Alert.alert);
  });
});

// test("When press on change password button, prompt an alert notifying that the email to change the password was sent.", async () => {
//   render(
//     <NavigationContainer>
//       <UserProfile />
//     </NavigationContainer>
//   );

//   jest.spyOn(Alert, "alert");

//   await waitFor(() => {
//     fireEvent.press(screen.getByText("Change Password"));
//     expect(Alert.alert);
//   });
// });


