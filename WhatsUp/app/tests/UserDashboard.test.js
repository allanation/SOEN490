import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import UserDashboardScreen from "../screens/UserDashboard";

jest.useFakeTimers();

it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Clicking Location", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.press(screen.getByText("Location, QC"));
  });
});

test("Clicking Notification", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[0]);
  });
});

test("Clicking Filter", async () => {
  render(
    <NavigationContainer>
          <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[1]);
  });
});

/**test("Clicking Event", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(screen.getByText("event"));
  });
});**/

test("Clicking Home", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[2]);
  });
});

test("Clicking Ticket", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[3]);
  });
});

test("Clicking Bookmark", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[4]);
  });
});

test("Clicking Profile", async () => {
  render(
    <NavigationContainer>
      <UserDashboardScreen />
    </NavigationContainer>
  );
  const temp = screen.queryAllByText("");
  await waitFor(() => {
    fireEvent.press(temp[5]);
  });
});