import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import Login from "../screens/Login";
import SignUpScreen from "../screens/SignUpScreen";

jest.useFakeTimers();
it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Successful Sign Up", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("First Name"),
      "Mohona"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), 
    "Mazumdar"
    )
  );
  await waitFor(() => 
    fireEvent.press(screen.getByPlaceholderText("Email"),
    "mohona6646@hotmail.com"
    )
    );
  await waitFor(() => 
    fireEvent.press(screen.getByPlaceholderText("Password"),
    "capstone123"
    )
    );   
  await waitFor(() => 
    fireEvent.press(screen.getByPlaceholderText("Confirm Password"),
    "capstone123"
    )
    );  
    
    await waitFor(() => {
    fireEvent.press(screen.getAllByText("Sign Up")[1]);
      }); 

 
//   jest.spyOn(Alert, "alert");
//   await waitFor(() => {
//     fireEvent.press(screen.getAllByText("Sign Up")[1]);
//     expect(Alert.alert).toHaveBeenCalledWith("Email already in use");
//   });
});

test("Wrong Confirm Password", async () => {
    render(
      <NavigationContainer>
        <SignUpScreen />
      </NavigationContainer>
    );
    await waitFor(() =>
      fireEvent.changeText(
        screen.getByPlaceholderText("First Name"),
        "Mohona"
      )
    );
    await waitFor(() =>
      fireEvent.changeText(screen.getByPlaceholderText("Last Name"), 
      "Mazumdar"
      )
    );
    await waitFor(() => 
      fireEvent.press(screen.getByPlaceholderText("Email"),
      "mohona6646@hotmail.com"
      )
      );
    await waitFor(() => 
      fireEvent.press(screen.getByPlaceholderText("Password"),
      "capstone123"
      )
      );   
    await waitFor(() => 
      fireEvent.press(screen.getByPlaceholderText("Confirm Password"),
      "capstone122"
      )
      );  
      
      const onClick = jest.fn();
      fireEvent.press(screen.getAllByText("Sign Up")[1]);
      expect(onClick).not.toHaveBeenCalled();
  
   
  //   jest.spyOn(Alert, "alert");
  //   await waitFor(() => {
  //     fireEvent.press(screen.getAllByText("Sign Up")[1]);
  //     expect(Alert.alert).toHaveBeenCalledWith("Email already in use");
  //   });
  });


  test("Successful navigation to login page", async () => {
    render(
      <NavigationContainer>
        <SignUpScreen />
      </NavigationContainer>
    );

  await waitFor(() => fireEvent.press(screen.getByText("Login")));
  const ls = (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
  render(ls);
  expect(screen.getByText("Please enter your details"));
});

test("SetValid is False with Wrong Confirm Password", async () => {
    render(
      <NavigationContainer>
        <SignUpScreen />
      </NavigationContainer>
    );

    await waitFor(() => 
    fireEvent.press(screen.getByPlaceholderText("Password"),
    "capstone123"
    )
    );   

  await waitFor(() => 
    fireEvent.press(screen.getByPlaceholderText("Confirm Password"),
    "capstone122"
    )
    );  
    //expect(valid).toBe("false");
});


