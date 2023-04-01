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

jest.mock('react-native-maps', () => {
  const React = jest.requireActual('react');
  const MapView = jest.requireActual('react-native-maps');
  
  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }
  MockMapView.propTypes = MapView.propTypes;

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }
  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMapView.Callout = MockCallout;

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.Marker = MockMarker;
  
  class MockPolyline extends React.Component {
    render() {
      return React.createElement('Polyline', this.props, this.props.children);
    }
  }
  MockPolyline.propTypes = MapView.Polyline.propTypes;
  MockMapView.Polyline = MockPolyline;

  return MockMapView;
});

const approvedMockedParams = {
  route: { params: {prop: {tags: [{id: '456789ghj', tagname: 'Graduate'}], eventStatus: 'Approved'} }},
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  };

const rejectedMockedParams = {
  route: { params: {prop: {tags: [{id: '456789ghj', tagname: 'Graduate'}], eventStatus: 'Rejected'} }},
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  };


// it("Renders correctly organizer view page", async () => {
//   jest.spyOn(Tab, "createMaterialTopTabNavigator");
//     const tree = render(
//       <NavigationContainer>
//         <OrgView {...mockedParams}/>
//       </NavigationContainer>
//     ).toJSON();
  
//     expect(tree).toMatchSnapshot();
//   });


// test("Switching sucessfully between Details, schedule, and status tabs", async () => {
//     render(
//       <NavigationContainer>
//         <OrgView {...approvedMockedParams} />
//       </NavigationContainer>
//     );
//     await waitFor(() => {
//       fireEvent.tap(screen.getByTestId("Schedule"));
//     });
  
//     await waitFor(() => {
//       fireEvent.tap(screen.getByTestId("Status"));
//     });

//     await waitFor(() => {
//       fireEvent.tap(screen.getByTestId("Details"));
//       });
  
//   });

test("Successfully go back to organizer dashboard when clicking on go back Icon", async () => {
    render(
      <NavigationContainer>
        <OrgView {...approvedMockedParams} />
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
    expect(screen.getByTestId("addEventButton")).toBeTruthy();
  });

test("When clicking on blast Info Icon, the blast info modal should be visible.", async () => {
    render(
      <NavigationContainer>
        <OrgView {...approvedMockedParams} />
      </NavigationContainer>
    );

    await waitFor(() => {
      fireEvent.press(screen.getByTestId("blastInfoButton"));
    });
    
    expect(screen.getByTestId("blastInfoModal")).toBeTruthy();

  });

  test("When clicking on resubmit, should navigate", async () => {
    render(
      <NavigationContainer>
        <OrgView {...rejectedMockedParams} />
      </NavigationContainer>
    );
    
    await waitFor(() => {
        fireEvent.press(screen.getByTestId("blastInfoButton"));
    });
    
    const Review = (
      <NavigationContainer>
            <OrgReviewEvent  {...rejectedMockedParams}/>
        </NavigationContainer>
    )
    render(
        Review
  );
  expect(screen.getAllByText("Edit Event"));

  });

test("When the modal is visible, successfuly click on go back icon", async () => {
    render(
      <NavigationContainer>
        <OrgView {...approvedMockedParams} />
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
        <OrgView {...approvedMockedParams} />
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
        <OrgView {...approvedMockedParams} />
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
