import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
} from "@testing-library/react-native";
import OrgStatus from "../screens/OrgStatus";

jest.useFakeTimers();

const mockedParams = {
  route: { params: {prop: {eventStatus: 'Rejected' }} },
  navigation: ''
  };

it("Renders correctly organizer status page", async () => {
    const tree = render(
      <NavigationContainer>
        <OrgStatus {...mockedParams}/>
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  