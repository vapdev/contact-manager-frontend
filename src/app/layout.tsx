import React from 'react';

import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';

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
        <AuthProvider>
          <Header />
          <main className="pt-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
