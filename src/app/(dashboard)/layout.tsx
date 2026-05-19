import React from "react";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
             
             <div className="px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 flex items-center gap-2">
               <span className="text-sm font-medium text-primary">UGF Balance:</span>
               <span className="text-sm font-bold text-white">100.00 MATIC</span>
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
