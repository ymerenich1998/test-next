"use client";

import useIsMobile from "@/lib/useIsMobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full bg-gray-800 p-4 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-xl font-bold">MyApp</div>

          {/* Desktop Menu */}
          <ul className="hidden space-x-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-gray-300 ${
                    pathname === link.href ? "font-bold text-white" : "text-gray-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title> 
                {isOpen ? "Close menu" : "Open menu"}
              </title>
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="mt-4 space-y-2 md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded px-3 py-2 transition-colors hover:bg-gray-700 ${
                    pathname === link.href ? "bg-gray-700 font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}