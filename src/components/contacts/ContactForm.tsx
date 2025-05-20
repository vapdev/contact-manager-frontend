import React from 'react';

'use client';

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
      newErrors.name = 'Name is required';
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-6 rounded-lg border border-yellow-400">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium text-yellow-300">
          Name*
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border rounded bg-black text-white focus:outline-none focus:border-yellow-300 ${errors.name ? 'border-yellow-400' : 'border-yellow-700'}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-yellow-400">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-yellow-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 border rounded bg-black text-white focus:outline-none focus:border-yellow-300 ${errors.email ? 'border-yellow-400' : 'border-yellow-700'}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-yellow-400">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block mb-1 font-medium text-yellow-300">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-yellow-700 bg-black text-white rounded focus:outline-none focus:border-yellow-300"
        />
      </div>
      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          disabled={isLoading || submitting}
          className="px-4 py-2 btn-yellow rounded disabled:opacity-60 cursor-pointer"
        >
          {(isLoading || submitting)
            ? 'Saving...'
            : contact
            ? 'Update Contact'
            : 'Create Contact'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/contacts')}
          className="px-4 py-2 border border-yellow-400 text-yellow-400 bg-black rounded hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
