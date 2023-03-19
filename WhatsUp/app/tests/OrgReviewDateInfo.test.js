import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgReviewPOCScreen from "../screens/OrgReviewPOC";
import OrgReviewDateInfoScreen from "../screens/OrgReviewDateInfo";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import OrgReviewDayScheduleScreen from "../screens/OrgReviewDaySchedule";
import { Alert } from "react-native";

jest.useFakeTimers();

// it("Renders Review Event Third Page Correctly", () => {
//   const tree = render(
//     <NavigationContainer>
//       <OrgReviewDateInfoScreen />
//     </NavigationContainer>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("If the dates are missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDateInfoScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

// test("Successfully go to next page when the start date and end date are filled", async () => {
//   render(
//     <NavigationContainer>
//       <IOSDateTimePicker />
//     </NavigationContainer>
//   );

//   const startPicker = await screen.getByTestId('startTime');
//   fireEvent(startPicker, 'onChange', { nativeEvent: { timestamp: new Date('2023-03-04') } });

//   const endPicker = await screen.getByTestId('endTime');
//   fireEvent(endPicker, 'onChange', { nativeEvent: { timestamp: new Date('2023-04-04') } });

//   render(
//     <NavigationContainer>
//       <OrgReviewDateInfoScreen />
//     </NavigationContainer>
//   );

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("nextButton"));
//   });
//   render(
//     <NavigationContainer>
//       <OrgReviewDayScheduleScreen />
//     </NavigationContainer>
//   );
// });

test("Successfully go back to second create event page when clicking on go back Icon", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDateInfoScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgReviewPOCScreen />
    </NavigationContainer>
  );
  expect(screen.getByPlaceholderText("Name")).toBeTruthy();
});