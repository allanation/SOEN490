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
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  expect(screen.getAllByText('Approved')).toBeTruthy();
});
test('Unapproved button returns some events', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  await waitFor(() =>
    fireEvent.click(screen.getByTestId('unbutton'), {
      timeout: 3000,
    })
  );
  const events = screen.getAllByTestId('show-events');
  expect(events).toBeTruthy();
});

test('Approved button returns some events', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  await waitFor(() =>
    fireEvent.click(screen.getByTestId('abutton'), {
      timeout: 3000,
    })
  );
  const events = screen.getAllByTestId('show-events');
  expect(events).toBeTruthy();
});

test('Rejected button returns some events', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  await waitFor(() =>
    fireEvent.click(screen.getByTestId('rejectbutton'), {
      timeout: 3000,
    })
  );
  const events = screen.getAllByTestId('show-events');
  expect(events).toBeTruthy();
});
