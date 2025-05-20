import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactsList from '../contacts/ContactsList';

describe('ContactsList', () => {
  it('renders empty state', () => {
    render(<ContactsList contacts={[]} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/no contacts found/i)).toBeInTheDocument();
  });

  it('renders contacts', () => {
    const contacts = [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123', userId: 'u1' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '456', userId: 'u2' }
    ];
    render(<ContactsList contacts={contacts} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
