'use client';
import React from 'react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface ContactFormProps {
  contact?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  onSubmit: (contactData: { name: string; email?: string; phone?: string }) => Promise<void>;
  isLoading: boolean;
}

export default function ContactForm({ contact, onSubmit, isLoading }: ContactFormProps) {
  const [name, setName] = useState(contact?.name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmitting(true);
    const contactData = {
      name,
      email: email || undefined,
      phone: phone || undefined
    };
    await onSubmit(contactData);
    setSubmitting(false);
  };

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, function(_, ddd, part1, part2) {
        let out = '';
        if (ddd) out += `(${ddd}`;
        if (ddd && ddd.length === 2) out += ') ';
        if (part1) out += part1;
        if (part1 && part1.length === 4) out += '-';
        if (part2) out += part2;
        return out;
      });
    } else {
      return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, function(_, ddd, part1, part2) {
        let out = '';
        if (ddd) out += `(${ddd}`;
        if (ddd && ddd.length === 2) out += ') ';
        if (part1) out += part1;
        if (part1 && part1.length === 5) out += '-';
        if (part2) out += part2;
        return out;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black p-6 rounded-lg border border-yellow-400 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">{contact ? 'Editar Contato' : 'Novo Contato'}</h2>
      {Object.values(errors).length > 0 && (
        <div className="alert-error mb-4">
          {errors.name || errors.email}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-yellow-400" htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-yellow w-full"
          placeholder="Digite o nome"
        />
      </div>
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
          placeholder="Digite o e-mail"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-yellow-400" htmlFor="phone">
          Telefone
        </label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="input-yellow w-full"
          placeholder="Digite o telefone"
        />
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="btn-outline-yellow cursor-pointer w-1/2 py-3"
          onClick={() => router.back()}
          disabled={submitting || isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-yellow cursor-pointer w-1/2 py-3"
          disabled={submitting || isLoading}
        >
          {submitting || isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
