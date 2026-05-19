"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Bot, Zap, Award, LayoutDashboard, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">GhostPay UI Platform V1.0</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl">
          The Future of <span className="text-gradient">Gasless Blockchain</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed">
          AI-powered transactions without the complexity. Just tell our AI what you want to do, and the Universal Gas Fund handles the rest. No gas. No hassle.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2">
            <Play className="w-5 h-5" /> Watch Demo
          </Button>
        </div>

        {/* Floating Mockup Elements */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div className="glass-panel p-2 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-black/50 w-full h-[300px] md:h-[500px] rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Dummy Abstract UI for Hero */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="flex flex-col items-center gap-6 z-20">
                <div className="glass px-6 py-4 rounded-xl flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                     <Bot className="w-5 h-5 text-primary" />
                   </div>
                   <div className="text-left">
                     <p className="text-sm text-foreground/70">AI Assistant</p>
                     <p className="text-white font-medium">"Send 5 MockUSD to Rahul"</p>
                   </div>
                </div>
                
                <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
                
                <div className="glass px-6 py-4 rounded-xl flex items-center gap-4 border border-green-500/30 bg-green-500/5">
                   <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                     <Zap className="w-5 h-5 text-green-400" />
                   </div>
                   <div className="text-left">
                     <p className="text-sm text-foreground/70">Transaction Complete</p>
                     <p className="text-green-400 font-medium">Gas Paid via UGF</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-lg text-foreground/70">Everything you need for seamless Web3 interactions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="AI Commands" 
            description="Execute complex blockchain transactions using natural language. Like ChatGPT for Web3." 
            Icon={Bot} 
            delay={0.1} 
          />
          <FeatureCard 
            title="Gasless Transactions" 
            description="Never worry about network fees again. Our Universal Gas Fund covers all transaction costs." 
            Icon={Zap} 
            delay={0.2} 
          />
          <FeatureCard 
            title="NFT Badge Minting" 
            description="Mint beautiful, achievement-based NFT certificates directly to your wallet without fees." 
            Icon={Award} 
            delay={0.3} 
          />
          <FeatureCard 
            title="Smart Dashboard" 
            description="Track your portfolio, transactions, and reputation score in a beautiful, unified interface." 
            Icon={LayoutDashboard} 
            delay={0.4} 
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-foreground/70">A seamless workflow from command to completion.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
           {/* Connecting Line */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10">
              <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent w-full animate-pulse" />
           </div>

           {[
             { step: 1, title: "Type Command", desc: "Use natural language" },
             { step: 2, title: "AI Understands", desc: "Intent parsing & routing" },
             { step: 3, title: "UGF Executes", desc: "Gasless meta-transaction" },
             { step: 4, title: "Complete", desc: "Instant confirmation" },
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center relative">
               <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-4">
                 {item.step}
               </div>
               <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
               <p className="text-sm text-foreground/70">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-auto relative z-10 glass">
        <div className="max-w-7xl mx-auto px-4 text-center text-foreground/50">
          <p>© 2026 GhostPay AI. All rights reserved. Built for the future.</p>
        </div>
      </footer>
    </main>
  );
}
