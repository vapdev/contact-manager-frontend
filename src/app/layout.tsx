import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Manager',
  description: 'Manage your contacts easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
