"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, BadgeCheck, ArrowRightLeft, CircleUserRound, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "AI Assistant", href: "/assistant", icon: Sparkles },
  { name: "NFT Badges", href: "/nfts", icon: BadgeCheck },
  { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
  { name: "Profile", href: "/profile", icon: CircleUserRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -56, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden h-screen min-h-screen w-[260px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0f]/95 backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.25)] glass md:flex"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,26,0.08),transparent_34%)] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-14" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
              <div className="h-3.5 w-3.5 rounded-full bg-[#ff6b1a]" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">GhostPay</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Web3 finance</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Menu
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={item.name} href={item.href} legacyBehavior>
                  <motion.a
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={cn(
                      "group flex items-center gap-3 rounded-[16px] border px-4 py-3 font-medium transition duration-200",
                      isActive
                        ? "border-white/10 bg-white/10 text-white"
                        : "border-transparent bg-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl border text-slate-400 transition duration-200",
                      isActive
                        ? "border-white/10 bg-white/10 text-[#ff6b1a]"
                        : "border-white/5 bg-white/5 group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-white"
                    )}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm leading-6 tracking-tight">{item.name}</span>
                  </motion.a>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 px-5 py-5">
          <motion.button
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="group w-full rounded-[20px] border border-white/10 bg-white/5 p-4 text-left transition duration-200 hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#11131a]">
                    <CircleUserRound className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#6bff8f] ring-1 ring-[#0b0b0f]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">ghostuser.eth</p>
                  <p className="truncate text-xs text-slate-500">0x71C...976F</p>
                </div>
              </div>
              <LogOut className="h-4 w-4 text-slate-400 transition duration-200 group-hover:text-white" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
