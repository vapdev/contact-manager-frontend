'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.success) {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black rounded-lg shadow-md border border-yellow-400">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Login</h2>
      {error && (
        <div className="alert-error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-yellow-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:border-yellow-300"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-yellow-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:border-yellow-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading || submitting}
          className="w-full py-2 px-4 btn-yellow rounded disabled:opacity-60 cursor-pointer"
        >
          {(loading || submitting) ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-300">
        Don't have an account?{' '}
        <Link href="/auth/register" className="link-yellow hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
