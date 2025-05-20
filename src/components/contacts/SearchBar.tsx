'use client';

import React from 'react';
import { useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSearch(searchTerm);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar contatos por nome ou e-mail..."
          className="flex-grow p-2 border border-yellow-400 rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black text-white placeholder-yellow-200"
        />
        <button
          type="submit"
          className="bg-yellow-400 cursor-pointer text-black p-2 rounded-r hover:bg-yellow-500 transition-colors font-bold border border-yellow-400 border-l-0 flex items-center justify-center"
          disabled={submitting}
          aria-label="Buscar"
        >
          {submitting ? (
            <span className="animate-pulse">...</span>
          ) : (
            <FaSearch size={27} />
          )}
        </button>
      </div>
    </form>
  );
}
