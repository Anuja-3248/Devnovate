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
import Spline from '@splinetool/react-spline';

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
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 pt-20">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
        
        {/* Centered Text */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none">
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-9xl font-black text-white tracking-tight leading-none mb-6 uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            GhostPay <span className="text-gradient font-black">AI</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-white/95 max-w-4xl leading-relaxed font-medium drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          >
            ChatGPT for Blockchain Transactions. Command your wallet in plain English while the Universal Gas Fund makes gas fees completely invisible.
          </motion.p>
        </div>
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
