"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  Zap, 
  Award, 
  LayoutDashboard, 
  Eye, 
  ArrowRight, 
  Play, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Compass
} from "lucide-react";
import { useAccount } from "wagmi";

import { Navbar } from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/Button";
import { BackgroundParticles } from "@/components/home/BackgroundParticles";
import { ProblemSection } from "@/components/home/ProblemSection";
import { AIDemoSection } from "@/components/home/AIDemoSection";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { isConnected } = useAccount();

  // Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={pageRef} className="min-h-screen bg-[#030307] text-foreground relative overflow-hidden bg-grid-pattern selection:bg-primary/30 selection:text-white">
      
      {/* Scroll progress bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-purple-500 z-50 transform-origin-0"
      />

      {/* Floating Constellation Particles */}
      <BackgroundParticles />

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-10 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Header Navigation */}
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        
        {/* Glow pill tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 bg-primary/5 mb-8 hover:border-primary/45 transition-colors cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase flex items-center gap-1">
            Now Live: Gasless Transactions V1.0 <ChevronRight className="w-3.5 h-3.5 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </motion.div>
        
        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6 uppercase"
        >
          GhostPay <span className="text-gradient font-black">AI</span>
        </motion.h1>
        
        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mb-12 leading-relaxed font-medium"
        >
          ChatGPT for Blockchain Transactions. Command your wallet in plain English while the Universal Gas Fund makes gas fees completely invisible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md mx-auto"
        >
          <Link href={isConnected ? "/dashboard" : "/login"} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 shadow-[0_0_30px_var(--primary-glow)] hover:shadow-[0_0_40px_var(--primary-glow)] transition-all">
              Launch App <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="glass" size="lg" className="w-full sm:w-auto gap-2 border-white/10 hover:bg-white/5 transition-colors">
            <Play className="w-5 h-5 fill-white/10 text-foreground" /> Watch Demo
          </Button>
        </motion.div>

        {/* Hero Product Mockup / Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 w-full max-w-5xl relative animate-float"
        >
          {/* Inner Glow ring */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-accent/5 rounded-3xl blur-2xl -z-10" />

          <div className="glass-panel p-2 rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="bg-black/80 w-full rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
              
              <div className="text-left space-y-6 md:w-1/2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  Perform secure payments without holding native tokens.
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  No gas limits, no failed transaction anxiety. The platform acts as a smart layer between you and multi-chain networks. Just say the word.
                </p>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE AUDITED
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-accent font-semibold bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                    <Zap className="w-3.5 h-3.5" /> GASLESS UGF
                  </div>
                </div>
              </div>

              {/* Mockup Preview Panel */}
              <div className="w-full md:w-1/2 glass border border-white/5 p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between text-xs text-foreground/40 pb-3 border-b border-white/5">
                  <span className="font-mono">GHOSTPAY_AI_AGENT v1.0</span>
                  <span className="text-accent">ONLINE</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary/25 border border-primary/30 text-xs text-white p-3 rounded-xl rounded-tr-none font-medium">
                      &quot;Send 10 MockUSD to Alice for coffee&quot;
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 text-xs text-foreground/80 p-3 rounded-xl rounded-tl-none text-left space-y-2 max-w-[85%]">
                      <p>✨ Resolving transfer... preview ready:</p>
                      <div className="bg-black/60 p-2 rounded-lg border border-white/5 text-[10px] space-y-1 font-mono">
                        <p className="text-foreground/50">TO: <span className="text-white">Alice (0x7d...a9e)</span></p>
                        <p className="text-foreground/50">VALUE: <span className="text-emerald-400 font-bold">10.00 MockUSD</span></p>
                        <p className="text-foreground/50">GAS: <span className="text-primary line-through">$0.18</span> <span className="text-accent font-bold">FREE (Sponsored)</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all font-bold text-xs text-white shadow-lg shadow-primary/20">
                  Approve Transaction
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Problem Section (Sticky Scroll Storytelling) */}
      <ProblemSection />

      {/* 3. AI Demo Section (Animated Chat Simulator) */}
      <AIDemoSection />

      {/* 4. Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Advanced Platform Features</h2>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            A comprehensive suite of tools built to deliver the ultimate Web3 transaction experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: AI Transactions */}
          <FeatureCard 
            title="AI Transactions" 
            desc="Enter standard English prompts to execute complex ERC-20 transfers, contract approvals, or multi-sig routing." 
            icon={<Bot className="w-6 h-6 text-primary" />} 
          />

          {/* Card 2: Gasless Payments */}
          <FeatureCard 
            title="Gasless Payments" 
            desc="Say goodbye to buying native chain gas tokens. The Universal Gas Fund handles 100% of network fees seamlessly." 
            icon={<Zap className="w-6 h-6 text-accent" />} 
          />

          {/* Card 3: NFT Badge Minting */}
          <FeatureCard 
            title="NFT Badge Minting" 
            desc="Mint achievement certificates, event logs, and participation badges gaslessly. Retain full custody of your achievements." 
            icon={<Award className="w-6 h-6 text-purple-400" />} 
          />

          {/* Card 4: Activity Dashboard */}
          <FeatureCard 
            title="Activity Dashboard" 
            desc="Review historic AI executions, gas credits sponsored, pending transactions, and address book directories." 
            icon={<LayoutDashboard className="w-6 h-6 text-cyan-400" />} 
          />

          {/* Card 5: Smart Transaction Preview */}
          <FeatureCard 
            title="Smart Transaction Preview" 
            desc="See exactly what will happen before committing your keys. Decipher raw hex parameters into human-readable details." 
            icon={<Eye className="w-6 h-6 text-blue-400" />} 
          />

          {/* Card 6: Cross-Chain Explorer */}
          <FeatureCard 
            title="Cross-Chain Routing" 
            desc="Deploy transactions across Ethereum, Polygon, Arbitrum, and Base without switching networks in your wallet." 
            icon={<Compass className="w-6 h-6 text-indigo-400" />} 
          />

        </div>
      </section>

      {/* 5. How It Works Section */}
      <HowItWorks />

      {/* 6. Final CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative text-center z-10">
        {/* Glow behind final CTA */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-3xl blur-3xl -z-10 animate-pulse-slow" />
        
        <div className="glass-panel p-12 md:p-20 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,92,22,0.08),transparent_50%)] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none max-w-3xl mx-auto">
            Web3 Should Feel <br /><span className="text-gradient">Invisible</span>
          </h2>
          
          <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
            Join the revolution of conversational, gasless blockchain interactions. Try the GhostPay AI platform now in our sandbox.
          </p>

          <div className="pt-4">
            <Link href={isConnected ? "/dashboard" : "/login"}>
              <Button size="lg" className="px-8 shadow-[0_0_20px_var(--primary-glow)] hover:scale-105 transition-transform">
                Try GhostPay AI <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-12 bg-black/40 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 text-center md:flex md:items-center md:justify-between text-foreground/40 text-xs">
          <p className="mb-4 md:mb-0">© 2026 GhostPay AI. All rights reserved. Designed for Next-Gen Web3 UX.</p>
          <div className="flex justify-center space-x-6">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Process</a>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Local reusable Feature Card
function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5 }}
      className="group relative glass-panel p-8 rounded-2xl overflow-hidden border border-white/5 text-left hover:border-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      
      <div className="space-y-5">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-white/95 transition-colors">{title}</h3>
        <p className="text-sm text-foreground/60 leading-relaxed">{desc}</p>
      </div>

      {/* Decorative hover line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
