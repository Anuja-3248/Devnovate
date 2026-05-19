"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Menu, X, Wallet } from "lucide-react";
import { WalletModal } from "@/components/modals/WalletModal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_15px_var(--primary-glow)]">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <Link href="/" className="font-bold text-xl tracking-tight text-gradient">
                GhostPay AI
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Button size="sm" variant="glass" onClick={() => setIsWalletModalOpen(true)} className="gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground/80 hover:text-white focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass border-t border-white/5 absolute top-20 left-0 w-full p-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-white rounded-md hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full justify-center gap-2" variant="primary" onClick={() => setIsWalletModalOpen(true)}>
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>
        )}
      </nav>

      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </>
  );
}
