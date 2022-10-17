import Dashboard from "../components/dashboard";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("Testing Login page rendering", async () => {
    const component = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  
    expect(component.getByText("Approved")).toBeTruthy();
  });

  test("Unapproved button returns some events", async () => {
    const component = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  
    const unapprovedButton = component.getByText("Unapproved");
    expect(unapprovedButton).toBeTruthy();
  
    await waitFor(() => fireEvent.click(unapprovedButton), {
      timeout: 3000,
    });
  
    expect(component.getByText("Orientation Week")).toBeTruthy();
  });

