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
          <label className="block mb-2 text-sm font-bold text-yellow-400" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-yellow w-full"
            placeholder="Digite seu e-mail"
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-yellow-400" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-yellow w-full"
            placeholder="Digite sua senha"
            autoComplete="current-password"
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <Link href="/auth/forgot" className="link-yellow text-sm">Esqueceu sua senha?</Link>
        </div>
        <button
          type="submit"
          className="btn-yellow w-full py-3 text-lg"
          disabled={submitting || loading}
        >
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="mt-6 text-center text-white">
        Não possui uma conta?{' '}
        <Link href="/auth/register" className="link-yellow font-bold">Cadastre-se grátis</Link>
      </div>
    </div>
  );
}
