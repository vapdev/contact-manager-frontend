import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../contacts/ContactForm';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('ContactForm', () => {
  it('renders contact form', () => {
    render(<ContactForm onSubmit={jest.fn()} isLoading={false} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create contact/i })).toBeInTheDocument();
  });

  it('shows error if name is empty', async () => {
    render(<ContactForm onSubmit={jest.fn()} isLoading={false} />);
    fireEvent.click(screen.getByRole('button', { name: /create contact/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  });
});
