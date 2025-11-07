"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li><a href="/" className={`hover:underline ${pathname === '/' ? 'font-bold' : ''}`}>Home</a></li>
        <li><a href="/about" className={`hover:underline ${pathname === '/about' ? 'font-bold' : ''}`}>About</a></li>
        <li><a href="/blog" className={`hover:underline ${pathname === '/blog' ? 'font-bold' : ''}`}>Blog</a></li>
        <li><a href="/contact" className={`hover:underline ${pathname === '/contact' ? 'font-bold' : ''}`}>Contact</a></li>
      </ul>
    </nav>
  );
}