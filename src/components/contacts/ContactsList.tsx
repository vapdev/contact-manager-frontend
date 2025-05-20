import React from 'react';
import { Contact } from '@/types';
import { useState } from 'react';

interface ContactsListProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
  onDelete: (contact: Contact) => void;
}

export default function ContactsList({ contacts, onEdit, onDelete }: ContactsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (contacts.length === 0) {
    return (
      <div className="bg-black p-6 rounded text-center text-white border border-yellow-400">
        Nenhum contato encontrado. Adicione seu primeiro contato!
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow rounded-lg border border-yellow-400 bg-black">
      <table className="min-w-full divide-y divide-yellow-400">
        <thead className="bg-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider border-b border-yellow-400">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider border-b border-yellow-400">
              E-mail
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider border-b border-yellow-400">
              Telefone
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-yellow-400 uppercase tracking-wider border-b border-yellow-400">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-yellow-400">
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-white">{contact.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-white">{contact.email || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-white">{contact.phone || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onEdit(contact.id)}
                  className="px-3 cursor-pointer py-1 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    setDeletingId(contact.id);
                    await onDelete(contact);
                    setDeletingId(null);
                  }}
                  className={`px-3 cursor-pointer py-1 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-colors ${deletingId === contact.id ? 'opacity-60 pointer-events-none' : ''}`}
                  type="button"
                  disabled={deletingId === contact.id}
                >
                  {deletingId === contact.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
