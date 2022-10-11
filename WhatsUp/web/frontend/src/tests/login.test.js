/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/login";
import "@testing-library/jest-dom";

test("Testing Login page rendering", async () => {
  const component = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(component.getByText("Welcome Back!")).toBeTruthy();
});

test("No credentials returns error", async () => {
  const component = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const signInButton = component.getByText("Login");
  expect(signInButton).toBeTruthy();

  await waitFor(() => fireEvent.click(signInButton), {
    timeout: 3000,
  });

  expect(component.getByText("Incorrect Email address or Password."));
});

test("Email input", async () => {
  const component = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = component.getByTestId("email");
  expect(emailInput).toBeTruthy();

  await userEvent.type(emailInput, "test@hotmail.com");
  expect(emailInput.value).toBe("test@hotmail.com");
});

test("Password input", async () => {
  const component = render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const passwordInput = component.getByTestId("password");
  expect(passwordInput).toBeTruthy();

  await userEvent.type(passwordInput, "test123");
  expect(passwordInput.value).toBe("test123");
});
