'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Offset for header height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[var(--primary)]">Quranic Quest</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="#features" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            Features
          </Link>
          <Link href="#benefits" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            Benefits
          </Link>
          <Link href="#how-it-works" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            How It Works
          </Link>
          <Link href="#faq" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            FAQ
          </Link>
        </nav>
        <div>
          <Link href="#waitlist" className="btn-primary">
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
