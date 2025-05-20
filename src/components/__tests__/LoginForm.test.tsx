/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../auth/LoginForm';

// Mock useAuth to always return loading: false
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ login: jest.fn(() => Promise.resolve({ success: false })), loading: false })
}));

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error if fields are empty', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    // Debug output
    // eslint-disable-next-line no-console
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(await screen.findByText(/Preencha e-mail e senha/i)).toBeInTheDocument();
  });
});
