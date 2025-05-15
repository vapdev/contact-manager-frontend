'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/contacts/ContactForm';
import contactService from '@/services/contactService';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { Contact } from '@/types';

interface EditContactPageProps {
  params: {
    id: string;
  };
}

export default function EditContactPage({ params }: EditContactPageProps) {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await contactService.getContact(id);
        setContact(data);
        setError('');
      } catch (err) {
        setError('Failed to load contact');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (contactData: { name: string; email?: string; phone?: string }) => {
    setSaving(true);
    try {
      await contactService.updateContact(id, contactData);
      router.push('/contacts');
    } catch (err) {
      setError('Failed to update contact');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!contact && !loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 text-red-700 p-4 rounded">
            Contact not found
          </div>
          <button
            onClick={() => router.push('/contacts')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back to Contacts
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Edit Contact</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {contact && (
          <ContactForm
            contact={contact}
            onSubmit={handleSubmit}
            isLoading={saving}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
