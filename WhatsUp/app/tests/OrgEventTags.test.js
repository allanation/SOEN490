import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgDaySchedule from "../screens/OrgDaySchedule";
import OrgEventTagScreen from "../screens/OrgEventTags";

it("Renders Create New Event Last Page Correctly", () => {
  const tree = render(
    <NavigationContainer>
      <OrgEventTagScreen />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Successfully adding a tag", async () => {
  render(
    <NavigationContainer>
      <OrgEventTagScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.changeText(screen.getByPlaceholderText("Ex.: University"), "Test")
  });

  await waitFor(() => {
    fireEvent.keyDown(screen.getByPlaceholderText("Ex.: University"), {key: 'Enter', code: 'Enter', charCode: 13})
  });

});

test("Successfully submitting an event", async () => {
  render(
    <NavigationContainer>
      <OrgEventTagScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitEvent"));
  });

});

test("Successfully go back to org day schedule page when clicking on go back Icon", async () => {
  render(
    <NavigationContainer>
      <OrgEventTagScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgDaySchedule />
    </NavigationContainer>
  );
});

// test("Successfully create an Event when all the mandatory fields in ALL the create event pages are filled ", async () => {
//   render(
//     <NavigationContainer>
//       <OrgNewEventScreen />
//     </NavigationContainer>
//   );

//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
//   );
//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "Organization Test")
//   );
//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
//   );
//   await waitFor(() =>
//   fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
//   );

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("chooseImage"));
//   });
  
//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("sportsImage"));
//   });

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("submitImage"));
//   });

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("nextButton"));
//   });

//   render(
//     <NavigationContainer>
//       <OrgPOCScreen />
//     </NavigationContainer>
//   );

//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Name"), "Test")
//   );
//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Phone Number"), "514-123-4567")
//   );
//   await waitFor(() =>
//     fireEvent.changeText(screen.getByPlaceholderText("Email"), "test@gmail.com")
//   );

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("nextButton"));
//   });

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
//       <OrgDateInfoScreen />
//     </NavigationContainer>
//   );

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("nextButton"));
//   });

//   render(
//     <NavigationContainer>
//       <OrgEventTagScreen />
//     </NavigationContainer>
//   );
//   await waitFor(() => {
//     fireEvent.changeText(screen.getByPlaceholderText("Ex.: University"), "Test")
//   });

//   await waitFor(() => {
//     fireEvent.press(screen.getByTestId("submitEvent"));
//   });

// });


