import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../layout/Header';

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />);
    expect(screen.getByText(/Versus VIPs/i)).toBeInTheDocument();
  });
});
