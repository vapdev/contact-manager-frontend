"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-slate-300 transition-colors"
          >
            ContactManager
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="animate-pulse h-6 w-24 bg-slate-700 rounded"></div>
          ) : user ? (
            <>
              <span className="text-sm sm:text-base">
                Hello, {user.name || user.email}!
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
