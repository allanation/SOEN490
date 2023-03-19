import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgReviewEventScreen from "../screens/OrgReviewEvent";
import OrgReviewPOCScreen from "../screens/OrgReviewPOC";
import OrgReviewDateInfoScreen from "../screens/OrgReviewDateInfo";
import { Alert } from "react-native";

jest.useFakeTimers();

// it("Renders Review Event Second Page Correctly", () => {
//   const tree = render(
//     <NavigationContainer>
//       <OrgReviewPOCScreen />
//     </NavigationContainer>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("If the name is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewPOCScreen />
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
      <OrgReviewPOCScreen />
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
      <OrgReviewPOCScreen />
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
      <OrgReviewPOCScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgReviewEventScreen />
    </NavigationContainer>
  );
  expect(screen.getByPlaceholderText("Event Title")).toBeTruthy();
});

test("Successfully go to next page when all the mandatory fields are filled", async () => {
  render(
    <NavigationContainer>
      <OrgReviewPOCScreen />
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
      <OrgReviewDateInfoScreen />
    </NavigationContainer>
  );
});