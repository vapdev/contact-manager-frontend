'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/contacts/ContactForm';
import contactService from '@/services/contactService';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

export default function NewContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (contactData: { name: string; email?: string; phone?: string }) => {
    setLoading(true);
    try {
      await contactService.createContact(contactData);
      router.push('/contacts');
    } catch (err) {
      setError('Failed to create contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Create New Contact</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <ContactForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </ProtectedRoute>
  );
}
