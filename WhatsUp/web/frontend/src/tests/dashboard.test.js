/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
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
  
    expect(component.getAllByText("Orientation Week")).toBeTruthy();
  });


  // To be added when approving events is functional

  // test("Approved button returns some events", async () => {
  //   const component = render(
  //     <BrowserRouter>
  //       <Dashboard />
  //     </BrowserRouter>
  //   );
  
  //   const approvedButton = component.getByText("Approved");
  //   expect(approvedButton).toBeTruthy();
  
  //   await waitFor(() => fireEvent.click(approvedButton), {
  //     timeout: 3000,
  //   });
  
  //   expect(component.getByText("event_name")).toBeTruthy();
  // });

