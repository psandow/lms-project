import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { renderWithAuth } from './test-utils';
import { vi } from 'vitest';

test('renders the login page by default', () => {
  renderWithAuth(<App />, { authValue: { login: vi.fn(), user: null } });

  expect(screen.getByText(/welcome to lms login/i)).toBeInTheDocument();
});
