import React from 'react';
import { Contact } from '@/types';
import { useState } from 'react';

interface DeleteModalProps {
  contact: Contact;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteModal({ contact, onConfirm, onCancel }: DeleteModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-black border border-yellow-400 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-yellow-400">Excluir Contato</h3>
        <p className="mb-6 text-white">
          Tem certeza que deseja excluir <strong className="text-yellow-400">{contact.name}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 cursor-pointer py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-black transition-colors"
            type="button"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 cursor-pointer py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors font-bold"
            type="button"
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
