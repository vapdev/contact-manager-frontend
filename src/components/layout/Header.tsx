"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: "Home", href: "/" },
    { label: "Contatos", href: "/contacts" },
    !user ? { label: "Entrar", href: "/auth/login" } : null,
    !user ? { label: "Registrar", href: "/auth/register" } : null,
    user ? { label: "Sair", onClick: logout } : null,
  ].filter(Boolean) as Array<
    { label: string; href: string; onClick?: undefined } |
    { label: string; onClick: () => void; href?: undefined }
  >;

  return (
    <header className="bg-black text-white shadow-lg">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black border-r border-yellow-400 shadow-lg transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-400">
          <span className="text-xl font-bold text-yellow-400">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
            className="text-yellow-400 px-2 cursor-pointer text-2xl"
          >
            &times;
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {sidebarItems.map((item, idx) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-yellow-300 hover:bg-yellow-400 hover:text-black! rounded px-3 py-2 font-semibold transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setSidebarOpen(false);
                }}
                className="text-yellow-300! bg-black! cursor-pointer hover:bg-yellow-400! hover:text-black! rounded px-3 py-2 font-semibold transition-colors text-left"
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </aside>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        {/* Hamburger */}
        <button
          className="flex cursor-pointer items-center justify-center w-10 h-10 text-yellow-400 hover:text-yellow-200 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo centralizada */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/versusLogoBeta.svg"
              alt="Versus Logo"
              width={122}
              height={36}
              priority
            />
          </Link>
        </div>

        {/* Espaço para alinhar o conteúdo à direita */}
        <div className="flex items-center space-x-4 min-w-[120px] justify-end">
          {loading ? (
            <div className="animate-pulse h-6 w-24 bg-yellow-400 rounded"></div>
          ) : user ? (
            <span className="text-sm sm:text-base text-yellow-200">
              Olá, {user.name || user.email}!
            </span>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
