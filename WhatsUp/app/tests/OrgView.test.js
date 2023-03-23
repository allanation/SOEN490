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
import OrgView from "../screens/OrgView";
import OrgDashboard from "../screens/OrgDashboard";
import OrgReviewEvent from "../screens/OrgReviewEvent";

jest.useFakeTimers();

const mockedParams = {
    route: { params: { } },
    navigation: ''
  };

it("Renders correctly organizer view page", async () => {
    const tree = render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  });

test("Switching sucessfully between Details, schedule, and status tabs", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );
    await waitFor(() => {
      fireEvent.press(screen.getByText("Schedule"));
    });
  
    await waitFor(() => {
      fireEvent.press(screen.getByText("Status"));
    });

    await waitFor(() => {
        fireEvent.press(screen.getByText("Details"));
      });
  
  });

test("Successfully go back to organizer dashboard when clicking on go back Icon", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );
  
    await waitFor(() => {
      fireEvent.press(screen.getByTestId("backButton"));
    });
    render(
      <NavigationContainer>
        <OrgDashboard />
      </NavigationContainer>
    );
    expect(screen.getByText("Welcome")).toBeTruthy();
  });

test("When clicking on blast Info Icon, the blast info modal should be visible. If Resubmit is visible it will navigate", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );
  if(screen.getByText("Blast Info").toBeTruthy){
    await waitFor(() => {
      fireEvent.press(screen.getByTestId("blastInfoButton"));
    });
    
    expect(screen.getByTestId("blastInfoModal")).toBeTruthy();
    }else{
        await waitFor(() => {
            fireEvent.press(screen.getByTestId("blastInfoButton"));
        });
        
        render(
            <NavigationContainer>
                <OrgReviewEvent />
            </NavigationContainer>
      );
}
  });

test("When the modal is visible, successfuly click on go back icon", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );

    if(screen.getByText("Blast Info").toBeTruthy){
    await waitFor(() => {
        fireEvent.press(screen.getByTestId("blastInfoButton"));
    });
  
    await waitFor(() => {
      fireEvent.press(screen.getByTestId("goBackModal"));
    });
    }
  });

test("If the message is missing, an alert should be prompted", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );
  
    if(screen.getByText("Blast Info").toBeTruthy){
        await waitFor(() => {
            fireEvent.press(screen.getByTestId("blastInfoButton"));
        });
  
    jest.spyOn(Alert, "alert");
  
    await waitFor(() =>
      fireEvent.changeText(screen.getByPlaceholderText("Message"), "")
    );

    await waitFor(() => {
        fireEvent.press(screen.getByTestId("sendButton"));
        expect(Alert.alert);
      });
}
});

test("If the message is inputted, an alert notifying user that it was successful", async () => {
    render(
      <NavigationContainer>
        <OrgView {...mockedParams} />
      </NavigationContainer>
    );
  
    if(screen.getByText("Blast Info").toBeTruthy){
        await waitFor(() => {
            fireEvent.press(screen.getByTestId("blastInfoButton"));
        });
  
    jest.spyOn(Alert, "alert");
  
    await waitFor(() =>
      fireEvent.changeText(screen.getByPlaceholderText("Message"), "Hi")
    );

    await waitFor(() => {
        fireEvent.press(screen.getByTestId("sendButton"));
        expect(Alert.alert);
      });
      expect(screen.getByText("Message sent successfully.")).toBeTruthy();
}
});
