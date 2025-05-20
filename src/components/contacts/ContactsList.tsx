import { Contact } from '@/types';

interface ContactsListProps {
  contacts: Contact[];
  onEdit: (id: string) => void;
  onDelete: (contact: Contact) => void;
}

export default function ContactsList({ contacts, onEdit, onDelete }: ContactsListProps) {
  if (contacts.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded text-center">
        No contacts found. Add your first contact!
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-200">
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-50">{contact.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-50">{contact.email || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-50">{contact.phone || '-'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(contact._id)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(contact)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
