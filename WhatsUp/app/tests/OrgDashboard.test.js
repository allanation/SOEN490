import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgDashboard from "../screens/OrgDashboard";
import Login from "../screens/Login";
import UserProfile from "../screens/UserProfile";
import NewEvent from "../screens/OrgNewEvent";

jest.useFakeTimers();

it("Renders correctly organizer dashboard page.", () => {
  const tree = render(
    <NavigationContainer>
      <OrgDashboard />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login sucessfully with organizer account and render organizer dashboard page.", async () => {
  render(
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "jasmine@organizer"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() => {
    fireEvent.press(screen.getAllByText("Login")[1]);
  });
  const org = (
    <NavigationContainer>
      <OrgDashboard />
    </NavigationContainer>
  );
  render(org);
});

test("Clicking on add Event Icon goes successfully to add new event page.", async () => {
  render(
    <NavigationContainer>
      <OrgDashboard />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addEventButton"));
  });

  const newEvent = (
    <NavigationContainer>
      <NewEvent />
    </NavigationContainer>
  );
  render(newEvent);
});


test("Clicking on Profile Icon goes successfully to user profile page.", async () => {
  render(
    <NavigationContainer>
      <OrgDashboard />
    </NavigationContainer>
  );
  
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[5]);
  });

  const userProfile = (
    <NavigationContainer>
      <UserProfile />
    </NavigationContainer>
  );
  render(userProfile);
});


