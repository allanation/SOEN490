import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import OrgReviewDateInfoScreen from "../screens/OrgReviewDateInfo";
import OrgReviewDayScheduleScreen from "../screens/OrgReviewDaySchedule";
import { Alert } from "react-native";

jest.useFakeTimers();

it("Renders Review Event Fourth Page Correctly", () => {
  const tree = render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Successfully go back to third create event page when clicking on go back Icon", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("backButton"));
  });
  render(
    <NavigationContainer>
      <OrgReviewDateInfoScreen />
    </NavigationContainer>
  );
});

test("When clicking on add day schedule Icon, the add day modal should be visible", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });
  
  expect(screen.getByTestId("addDayModal")).toBeTruthy();
});

test("When the modal is visible, successfuly click on go back icon", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("goBackModal"));
  });
});

test("If the Title is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Title"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Start Time"), "1")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("End Time"), "2")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Day Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayButton"));
    expect(Alert.alert);
  });
});

test("If the Start Time is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Start Time"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("End Time"), "2")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Day Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayButton"));
    expect(Alert.alert);
  });
});

test("If the End Time is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Start Time"), "1")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("End Time"), "")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Day Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayButton"));
    expect(Alert.alert);
  });
});

test("If the Description is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Start Time"), "1")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("End Time"), "2")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayButton"));
    expect(Alert.alert);
  });
});

test("Successfully adding a day when all the mandatory fields are filled and go to next page", async () => {
  render(
    <NavigationContainer>
      <OrgReviewDayScheduleScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayIcon"));
  });

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Start Time"), "1")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("End Time"), "2")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Day Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("addDayButton"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
  });
});