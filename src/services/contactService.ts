import api from './api';
import { Contact } from '@/types';

interface ContactInput {
  name: string;
  email?: string;
  phone?: string;
}

const contactService = {
  getContacts: async (searchTerm: string = ''): Promise<Contact[]> => {
    const response = await api.get<Contact[]>(`/contacts?search=${searchTerm}`);
    return response.data;
  },

  getContact: async (id: string): Promise<Contact> => {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  createContact: async (contactData: ContactInput): Promise<Contact> => {
    const response = await api.post<Contact>('/contacts', contactData);
    return response.data;
  },

  updateContact: async (id: string, contactData: ContactInput): Promise<Contact> => {
    const response = await api.put<Contact>(`/contacts/${id}`, contactData);
    return response.data;
  },

  deleteContact: async (id: string): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};

export default contactService;
