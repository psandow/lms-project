import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { renderWithAuth } from '../test-utils';
import LoginPage from './LoginPage';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// mock must be at top level, outside of any test or function, to ensure it is applied before any imports that use the mocked module.
const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock
  };
});

function setup(authOverrides = {}) {
  const loginMock = vi.fn();

  const authValue = {
    login: loginMock,
    user: null,
    ...authOverrides
  };

  renderWithAuth(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
    { authValue }
  );

  return { loginMock };
}


test('renders username and password fields', () => {
  setup();

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('allows typing into username and password fields', async () => {
  setup();
  const user = userEvent.setup();

  const username = screen.getByPlaceholderText(/username/i);
  const password = screen.getByPlaceholderText(/password/i);

  await user.type(username, 'Paul');
  await user.type(password, 'Password1');

  expect(username).toHaveValue('Paul');
  expect(password).toHaveValue('Password1');
});

test('calls login() with correct credentials', async () => {
  const { loginMock } = setup();
  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/username/i), 'Paul');
  await user.type(screen.getByPlaceholderText(/password/i), 'Password1');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(loginMock).toHaveBeenCalledWith('Paul', 'Password1');
});

test('shows error message when login fails', async () => {
  setup({
    login: vi.fn().mockRejectedValue(new Error('Invalid credentials'))
  });

  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText(/username/i), 'notarealuser');
  await user.type(screen.getByPlaceholderText(/password/i), 'notarealpassword');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
});
