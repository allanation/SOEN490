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
import OrgDetails from "../screens/OrgDetails";
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
  /* eslint-enable react/prefer-stateless-function */

  return MockMapView;
});

const mockedParams = {
    route: { params: {prop: {eventName: 'Hi', orgName: 'Hi', location: 'Concordia', link: '', description: 'Fun', guid:'dfghjkl456789', coverImage: '',
    pocName: 'Andrea', pocPhoneNum: '514', pocEmail: 'a@e.com', startDate: 1687392780000, endDate: 1687392780000, endTime: 1679703182407, startTime: 1679703182407,
    days: 3, itinerary: [], tags: []} }},
    navigation: ''
    };

it("Renders correctly organizer view page", async () => {
    const tree = render(
      <NavigationContainer>
        <OrgDetails {...mockedParams} />
      </NavigationContainer>
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  });

  test("If click on delete icon, an alert should be prompted", async () => {
    render(
    <NavigationContainer>
        <OrgDetails {...mockedParams} />
    </NavigationContainer>
    );
    jest.spyOn(Alert, "alert");

    await waitFor(() => {
        fireEvent.press(screen.getByTestId("delete-event"));
        expect(Alert.alert).toHaveBeenCalled();
      });
    });

  test("If the edit icon is clicked, should navigate to Edit Event page", async () => {
    render(
    <NavigationContainer>
        <OrgDetails {...mockedParams} />
    </NavigationContainer>
    );

    await waitFor(() => {
        fireEvent.press(screen.getByTestId("edit-event"));
      });

      render(
              <NavigationContainer>
                <OrgReviewEvent {...mockedParams} />
              </NavigationContainer>
            );
      expect(screen.getByText("Edit Event")).toBeTruthy();
  });
