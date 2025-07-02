import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders login form', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const loginButton = screen.getByText(/login/i);
  expect(loginButton).toBeInTheDocument();
});
