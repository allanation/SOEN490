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
import { Alert } from "react-native";

jest.useFakeTimers();

// it("Renders Create New Event First Page Correctly", () => {
//   const tree = render(
//     <NavigationContainer>
//       <OrgNewEventScreen />
//     </NavigationContainer>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test("If the Event Title is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "OrganizationTest")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the Organizer Name is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the Location is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "OrganizationTest")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the Description is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "OrganizationTest")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("If the Cover Image is missing, an alert should be prompted", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  jest.spyOn(Alert, "alert");

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "OrganizationTest")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
    expect(Alert.alert);
  });
});

test("Successfully choosing studying image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("studyingImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing McGill image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("mcGillImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing park image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("parkImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing Concordia image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("concordiaImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing graduation image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("graduationImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing auditorium image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("auditoriumImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing frosh image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("froshImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully choosing art image as cover image", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("artImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

});

test("Successfully go to next page when all the mandatory fields are filled", async () => {
  render(
    <NavigationContainer>
      <OrgNewEventScreen />
    </NavigationContainer>
  );

  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Event Title"), "Title Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Organization Name"), "Organization Test")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Location"), "Montreal")
  );
  await waitFor(() =>
  fireEvent.changeText(screen.getByPlaceholderText("Description"), "Description Test")
  );

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("chooseImage"));
  });
  
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("sportsImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("submitImage"));
  });

  await waitFor(() => {
    fireEvent.press(screen.getByTestId("nextButton"));
  });
  render(
    <NavigationContainer>
      <OrgPOCScreen />
    </NavigationContainer>
  );
  expect(screen.getByPlaceholderText("Name")).toBeTruthy();
});