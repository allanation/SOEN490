/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import Dashboard from '../components/dashboard';
import {
  fireEvent,
  render,
  waitFor,
  screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});
test('Testing Login page rendering', async () => {
  const component = render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  expect(component.getAllByText('Approved')).toBeTruthy();
});
test('Unapproved button returns some events', async () => {
  const component = render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  await waitFor(() =>
    fireEvent.click(component.getByText('Unapproved'), {
      timeout: 10000,
    })
  );
  // const events = component.getAllByTestId('unapproved-event');
  //expect(events).toHaveLength(3);
  //expect(component.findAllByText('Mcgill')).toBeTruthy();
});

test('Approved button returns some events', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const mappedElements = screen.getAllByTestId('approved');
  screen.debug();
});
// test('Checking to see if the approve button wokrs', async () => {
//   const component = render(
//     <BrowserRouter>
//       <Dashboard />
//     </BrowserRouter>
//   );

//   const unapprovedButton = component.getByText('Unapproved');
//   expect(unapprovedButton).toBeTruthy();

//   await waitFor(() => fireEvent.click(unapprovedButton), {
//     timeout: 3000,
//   });
//   const unevent = component.findAllByText('2023');
//   expect(unevent).toBeTruthy();

//   await waitFor(() => fireEvent.click(unevent[0]), {
//     timeout: 3000,
//   });
//   const approve = component.find;
// });
