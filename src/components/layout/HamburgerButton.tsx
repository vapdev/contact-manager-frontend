import React from "react";

interface HamburgerButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export default function HamburgerButton({ onClick, ariaLabel = "Abrir menu" }: HamburgerButtonProps) {
  return (
    <button
      className="flex cursor-pointer items-center justify-center w-10 h-10 text-yellow-400 hover:text-yellow-200 focus:outline-none"
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
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
  );
}
