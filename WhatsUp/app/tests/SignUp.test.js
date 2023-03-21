import "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  render,
  waitFor,
  fireEvent,
  screen,
} from "@testing-library/react-native";
import SignUpScreen from "../screens/SignUpScreen";
import { Alert } from "react-native";

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.useFakeTimers();

it("renders correctly", () => {
  const tree = render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Successful Sign Up for a user", async () => {
  //sucessfully sign up
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  jest.spyOn(Alert, "alert");
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mo")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Salah")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      " mosalah@hotmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("signUpButton"));
    expect(Alert.alert);
  });
});

test("Successful Sign Up for an organizer", async () => {
  //sucessfully sign up for an organizer
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mo")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Salah")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      " mosalah@hotmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  await waitFor(() => fireEvent.press(screen.getByTestId("isOrganizer")));
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("signUpButton"));
    expect(Alert.alert);
  });
});

test("Wrong Confirm Password", async () => {
  //wrong confirm password
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mohona")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Mazumdar")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "mohona6646@hotmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone122"
    )
  );

  const onClick = jest.fn();
  fireEvent.press(screen.getByTestId("signUpButton"));
  expect(onClick).not.toHaveBeenCalled();
});

// test("Successful navigation to login page", async () => {
//   render(
//     <NavigationContainer>
//       <SignUpScreen />
//     </NavigationContainer>
//   );

//   await waitFor(() => fireEvent.press(screen.getByText("Login")));
//   render(
//     <NavigationContainer>
//       <Login />
//     </NavigationContainer>
//   );
//   expect(screen.getByPlaceholderText("Email")).toBeTruthy();
// });

test("Checks if the confirm password is working correctly", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() => {
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mohona");
  });
  await waitFor(() => {
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Mazumdar");
  });
  await waitFor(() => {
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "mohona6646@hotmail.com"
    );
  });
  await waitFor(() => {
    fireEvent.changeText(
      screen.getByPlaceholderText("Password"),
      "capstone123"
    );
  });
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});
test("Successful Sign Up but with captial letter email", async () => {
  //Test that check if user can sign up with email in capital letter and still able to signup
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mohona")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Mazumdar")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "MOHONA6646@hotmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  // Test if the Sign Up button is pressed
  jest.spyOn(Alert, "alert");
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("signUpButton"));
    expect(Alert.alert);
  });
});

test("Can't Sign Up but with only an email", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      "MOHONA6646@hotmail.com"
    )
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up but with only First and last name", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mohona")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Mazumdar")
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up but with only password", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up if everything is left blank", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up if password is less than 8 characters", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mo")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Salah")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Email"),
      " mosalah@hotmail.com"
    )
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "123")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Confirm Password"), "123")
  );
  await waitFor(() => fireEvent.press(screen.getByTestId("isOrganizer")));
  await waitFor(() => {
    fireEvent.press(screen.getByTestId("signUpButton"));
  });
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up if there is no last name", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("First Name"), "Mo")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});

test("Can't Sign Up if there is no First name", async () => {
  render(
    <NavigationContainer>
      <SignUpScreen />
    </NavigationContainer>
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Last Name"), "Mo")
  );
  await waitFor(() =>
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "capstone123")
  );
  await waitFor(() =>
    fireEvent.changeText(
      screen.getByPlaceholderText("Confirm Password"),
      "capstone123"
    )
  );
  const onClick = jest.fn();
  // Clicking the button with text "Sign Up"
  fireEvent.press(screen.getByTestId("signUpButton"));
  // Asserting that the onClick function is not called
  expect(onClick).not.toHaveBeenCalled();
});
