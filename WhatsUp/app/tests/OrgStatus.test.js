import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
} from "@testing-library/react-native";
import OrgStatus from "../screens/OrgStatus";

jest.useFakeTimers();

it("Renders correctly organizer status page", async () => {
    const tree = render(
      <NavigationContainer>
        <OrgStatus />
      </NavigationContainer>
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  });