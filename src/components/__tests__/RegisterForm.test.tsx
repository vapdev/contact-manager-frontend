/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../auth/RegisterForm';

// Mock useAuth to always return loading: false
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ register: jest.fn(() => Promise.resolve({ success: false })), loading: false })
}));

describe('RegisterForm', () => {
  it('renders register form', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows error if fields are empty', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: '' } });
    const button = screen.getByRole('button', { name: /register/i });
    fireEvent.click(button);
    // Debug output
    // eslint-disable-next-line no-console
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(await screen.findByText(/email and password are required/i)).toBeInTheDocument();
  });
});
