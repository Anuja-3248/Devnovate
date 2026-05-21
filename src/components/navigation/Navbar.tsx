"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/Button";
import { Menu, X, Wallet, LogOut } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
            <div className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-consumer-orange via-amber-500 to-consumer-purple flex items-center justify-center shadow-[0_0_20px_rgba(255,92,22,0.4)] border border-white/10 group-hover:scale-105 transition-transform duration-300">
                <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-consumer-orange rounded-full" />
                </div>
              </div>
              <Link href="/" className="font-bold text-xl tracking-tight text-white group-hover:text-consumer-orange transition-colors">
                GhostPay <span className="text-consumer-orange font-black">AI</span>
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
              <ConnectButton />
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
            {isConnected ? (
              <Button className="w-full justify-center gap-2" variant="primary" onClick={() => disconnect()}>
                <LogOut className="w-4 h-4" />
                Disconnect ({address?.slice(0, 6)}...{address?.slice(-4)})
              </Button>
            ) : (
              <Button className="w-full justify-center gap-2" variant="primary" onClick={() => router.push('/login')}>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
