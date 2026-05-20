"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bot, Award, ArrowRightLeft, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", href: "/assistant", icon: Bot },
  { name: "NFT Badges", href: "/nfts", icon: Award },
  { name: "Transactions", href: "/dashboard", icon: ArrowRightLeft }, // Mocking to dashboard
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen hidden md:flex flex-col border-r border-white/5 glass sticky top-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-consumer-orange via-amber-500 to-consumer-purple flex items-center justify-center shadow-[0_0_15px_var(--primary-glow)] border border-white/10 group-hover:scale-105 transition-transform duration-300">
            <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-consumer-orange rounded-full" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-gradient group-hover:text-consumer-orange transition-colors">
            GhostPay
          </span>
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium",
                isActive
                  ? "bg-primary/10 text-white shadow-[inset_0_0_10px_var(--primary-glow)] border border-primary/20"
                  : "text-foreground/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-foreground/50")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* User / Bottom */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-secondary to-accent p-0.5">
            <div className="w-full h-full bg-background rounded-full border-2 border-transparent overflow-hidden">
               <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                 <span className="text-lg">😎</span>
               </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">ghostuser.eth</p>
            <p className="text-xs text-primary truncate">0x71C...976F</p>
          </div>
          <button className="text-foreground/50 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
