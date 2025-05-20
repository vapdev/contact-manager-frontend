import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../contacts/SearchBar';

describe('SearchBar', () => {
  it('renders search input and button', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText(/search contacts/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with input value', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    fireEvent.change(screen.getByPlaceholderText(/search contacts/i), { target: { value: 'john' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith('john');
  });
});
