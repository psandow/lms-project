import { render } from '@testing-library/react';
import { AuthContext } from './context/AuthContext';

// mock implementation of the AuthContext provider for testing purposes, allowing tests to provide custom authentication values and test components that depend on authentication state.
export function renderWithAuth(ui, { authValue } = {}) {
  return render(
    <AuthContext.Provider value={authValue}>
      {ui}
    </AuthContext.Provider>
  );
}
