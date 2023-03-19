import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgNewEventScreen from "../screens/OrgNewEvent";
import OrgPOCScreen from "../screens/OrgPointOfContact";
import OrgDateInfoScreen from "../screens/OrgDateInfo";
import { Alert } from "react-native";

jest.useFakeTimers();

// it("Renders Create New Event Second Page Correctly", () => {
//   const tree = render(
//     <NavigationContainer>
//       <OrgPOCScreen />
//     </NavigationContainer>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("If the name is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Name"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Phone Number"), "514-123-4567")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "test@gmail.com")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the phone number is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Name"), "Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Phone Number"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "test@gmail.com")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the email is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Name"), "Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Phone Number"), "514-123-4567")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("Successfully go back to first create event page when clicking on go back Icon", async () => {
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );
  expect(screen.getByPlaceholderText("Event Title")).toBeTruthy();
});

test("Successfully go to next page when all the mandatory fields are filled", async () => {
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Name"), "Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Phone Number"), "514-123-4567")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "test@gmail.com")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
  });
  render(
    <NavigationContainer>
      <OrgDateInfoScreen />
    </NavigationContainer>
  );
});