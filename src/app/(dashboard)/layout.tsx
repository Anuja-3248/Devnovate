"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Bell, Zap } from "lucide-react";
import { BalanceProvider, useBalance } from "@/context/BalanceContext";
import { usePathname } from "next/navigation";
import { WalletModal } from "@/components/modals/WalletModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <BalanceProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </BalanceProvider>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { ugfBalance } = useBalance();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
      {/* Background ambient glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 glass flex items-center justify-between px-8 z-10 shrink-0">
           <h2 className="text-xl font-bold text-white">GhostPay Portal</h2>
           
           <div className="flex items-center gap-4">
             <button className="relative p-2 rounded-full hover:bg-white/10 text-foreground/70 hover:text-white transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
             </button>
             
             <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-1 pr-4 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setIsWalletModalOpen(true)}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-foreground/50 font-medium uppercase tracking-wider">UGF Balance</span>
                <span className="text-sm font-bold text-white">{ugfBalance.toFixed(2)} MATIC</span>
              </div>
            </div>
           </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
