import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgPOCScreen from "../screens/OrgPointOfContact";
import OrgDateInfoScreen from "../screens/OrgDateInfo";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import OrgDayScheduleScreen from "../screens/OrgDaySchedule";
import { Alert } from "react-native";

jest.useFakeTimers();

const mockedParams = {
  route: { params: { } }
};

test("If the dates are missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgDateInfoScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("Successfully setting the number of days to 10 and go to next page", async () => {
  render(
    <NavigationContainer>
      <OrgDateInfoScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Number of days"), "10"));

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));});
});

test("Successfully go to next page when the start date and end date are filled", async () => {
  render(
    <NavigationContainer>
      <IOSDateTimePicker />
    </NavigationContainer>
  );

  const startPicker = await screen.getByTestId('startTime');
  fireEvent(startPicker, 'onChange', { nativeEvent: { timestamp: new Date('2023-03-04') } });

  const endPicker = await screen.getByTestId('endTime');
  fireEvent(endPicker, 'onChange', { nativeEvent: { timestamp: new Date('2023-04-04') } });

  render(
    <NavigationContainer>
      <OrgDateInfoScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
  });
  render(
    <NavigationContainer>
      <OrgDayScheduleScreen {...mockedParams} />
    </NavigationContainer>
  );
});

test("Successfully go back to second create event page when clicking on go back Icon", async () => {
  render(
    <NavigationContainer>
      <OrgDateInfoScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );
  expect(screen.getByPlaceholderText("Name")).toBeTruthy();
});