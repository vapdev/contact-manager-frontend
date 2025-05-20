"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();

  return (
    <header className="bg-black text-white shadow-lg border-b border-yellow-400">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold text-yellow-400 hover:text-white transition-colors"
          >
            Versus VIPs
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="animate-pulse h-6 w-24 bg-yellow-400 rounded"></div>
          ) : user ? (
            <>
              <span className="text-sm sm:text-base text-yellow-200">
                Hello, {user.name || user.email}!
              </span>
              <button
                onClick={logout}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-bold transition-colors border border-yellow-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-black px-3 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-yellow-300 hover:bg-yellow-500 !text-black px-3 py-2 rounded-md text-sm font-bold transition-colors border border-yellow-400"
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
