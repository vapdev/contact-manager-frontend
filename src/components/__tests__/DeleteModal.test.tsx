import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from '../contacts/DeleteModal';

describe('DeleteModal', () => {
  it('renders modal with contact name', () => {
    render(
      <DeleteModal
        contact={{ id: '1', name: 'John Doe', userId: 'u1' }}
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it('calls onCancel when cancel is clicked', () => {
    const onCancel = jest.fn();
    render(
      <DeleteModal
        contact={{ id: '1', name: 'John Doe', userId: 'u1' }}
        onConfirm={jest.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
