'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import contactService from '@/services/contactService';
import ContactsList from '@/components/contacts/ContactsList';
import SearchBar from '@/components/contacts/SearchBar';
import DeleteModal from '@/components/contacts/DeleteModal';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import { Contact } from '@/types';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const router = useRouter();

  const fetchContacts = async (search = '') => {
    setLoading(true);
    try {
      const data = await contactService.getContacts(search);
      setContacts(data);
      setError('');
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (id: string) => {
    router.push(`/contacts/${id}/edit`);
  };

  const handleDelete = (contact: Contact) => {
    setContactToDelete(contact);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;
    
    try {
      await contactService.deleteContact(contactToDelete.id);
      setContacts(contacts.filter(c => c.id !== contactToDelete.id));
      setContactToDelete(null);
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setContactToDelete(null);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Contacts</h1>
          <button
            onClick={() => router.push('/contacts/new')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add New Contact
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ContactsList
            contacts={contacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {contactToDelete && (
          <DeleteModal
            contact={contactToDelete}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
