"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Fuel, HelpCircle, AlertOctagon, Key, ArrowRight } from "lucide-react";

interface ProblemStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const steps: ProblemStep[] = [
    {
      id: 0,
      title: "Need ETH for gas fees",
      subtitle: "The Gas Trap",
      description:
        "Want to send a stablecoin or mint an NFT? You must first buy ETH, transfer it to your wallet, and pay network fee fees. A frustrating blocker for beginners.",
      icon: <Fuel className="w-8 h-8 text-consumer-orange" />,
    },
    {
      id: 1,
      title: "Confusing wallet UX",
      subtitle: "Complexity Overload",
      description:
        "Gwei, Max Priority Fees, Gas Limits, Slippage, Hex Data... Web3 interfaces force regular users to act like network engineers just to send payments.",
      icon: <HelpCircle className="w-8 h-8 text-consumer-purple" />,
    },
    {
      id: 2,
      title: "Failed transactions",
      subtitle: "Sunk Cost & Anxiety",
      description:
        "Wait 10 minutes only to see 'Transaction Failed (Out of Gas)'. Your money is gone, the transaction is dropped, and you have no idea why.",
      icon: <AlertOctagon className="w-8 h-8 text-consumer-orange" />,
    },
    {
      id: 3,
      title: "Complex onboarding",
      subtitle: "The Seed Phrase Barrier",
      description:
        "Write down 12 random words. If you lose them or type them wrong, your funds are gone forever. No 'forgot password', no recovery. Too scary for most.",
      icon: <Key className="w-8 h-8 text-consumer-blue" />,
    },
  ];

  // Map scroll progress to active step index
  const stepIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black/40">
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Left Side: Sticky Scrolling Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-full z-10 py-12">
          <div className="max-w-md space-y-24">
            {steps.map((step, idx) => (
              <ScrollTextItem
                key={step.id}
                step={step}
                index={idx}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Sticky Visualizer */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] flex items-center justify-center relative">
          <div className="w-full max-w-sm aspect-[4/5] glass-panel rounded-3xl p-6 relative overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Visual background glows */}
            <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-[80px]" />

            {/* Visual morph states based on stepIndex */}
            <VisualState0 active={stepIndex} />
            <VisualState1 active={stepIndex} />
            <VisualState2 active={stepIndex} />
            <VisualState3 active={stepIndex} />
          </div>
        </div>

      </div>
    </section>
  );
}

// Subcomponent for scrolling text items
function ScrollTextItem({
  step,
  index,
  scrollYProgress,
}: {
  step: ProblemStep;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index * 0.25;
  const end = start + 0.25;

  const r1 = Math.max(0, start - 0.02);
  const r2 = start + 0.02;
  const r3 = end - 0.02;
  const r4 = Math.min(1, end + 0.02);
  
  // Transform scroll progress into opacity and y offset for each specific block
  const opacity = useTransform(
    scrollYProgress,
    [r1, r2, r3, r4],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [r1, r2, r3, r4],
    [50, 0, 0, -50]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute flex flex-col items-start text-left"
    >
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/5 mb-6">
        {step.icon}
        <span className="text-sm font-semibold text-foreground/80 tracking-wide uppercase">
          {step.subtitle}
        </span>
      </div>
      <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
        {step.title}
      </h3>
      <p className="text-lg text-foreground/60 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}

// Visual morph cards
function VisualState0({ active }: { active: MotionValue<number> }) {
  const opacity = useTransform(active, (v: number) => (Math.round(v) === 0 ? 1 : 0));
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 pointer-events-none"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-sm font-bold text-white">Ethereum Mainnet</span>
        <span className="w-2.5 h-2.5 rounded-full bg-consumer-orange animate-pulse" />
      </div>

      <div className="my-auto space-y-6 text-center">
        <div className="w-20 h-20 rounded-full bg-consumer-orange/10 border border-consumer-orange/30 flex items-center justify-center mx-auto shadow-[0_0_20px_var(--primary-glow)]">
          <Fuel className="w-10 h-10 text-consumer-orange" />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white">Insufficient Balance</h4>
          <p className="text-sm text-foreground/50">You need ETH to pay gas fees.</p>
        </div>

        <div className="glass p-4 rounded-xl border border-consumer-orange/10 bg-consumer-orange-dark/10 text-left space-y-2">
          <div className="flex justify-between text-xs text-foreground/60">
            <span>Transaction Cost:</span>
            <span className="font-semibold text-white">0.0042 ETH ($14.50)</span>
          </div>
          <div className="flex justify-between text-xs text-foreground/60">
            <span>Your Balance:</span>
            <span className="font-semibold text-consumer-orange">0.0000 ETH ($0.00)</span>
          </div>
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-consumer-orange/20 border border-consumer-orange/30 text-consumer-orange-light font-semibold text-sm">
        Transaction Blocked
      </button>
    </motion.div>
  );
}

function VisualState1({ active }: { active: MotionValue<number> }) {
  const opacity = useTransform(active, (v: number) => (Math.round(v) === 1 ? 1 : 0));
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 pointer-events-none"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-sm font-bold text-white">Advanced Settings</span>
        <span className="text-xs text-foreground/40">Hex Mode</span>
      </div>

      <div className="my-auto space-y-4">
        <div className="glass p-3 rounded-lg border border-white/5 text-left text-xs font-mono space-y-1">
          <p className="text-consumer-purple font-bold">GAS ESTIMATION DETAILS</p>
          <p className="text-foreground/50">Gas Limit: <span className="text-white">21000</span></p>
          <p className="text-foreground/50">Max Fee: <span className="text-white">35.48 Gwei</span></p>
          <p className="text-foreground/50">Max Priority: <span className="text-white">1.5 Gwei</span></p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-foreground/60">Base Fee:</span>
            <span className="text-white">32 Gwei</span>
          </div>
          <input type="range" className="w-full accent-consumer-purple bg-white/10 h-1 rounded" readOnly value="75" />
          <div className="flex justify-between text-[10px] text-foreground/40">
            <span>Slow (Cheap)</span>
            <span>Instant (Expensive)</span>
          </div>
        </div>

        <div className="glass p-3 rounded-lg border border-white/5 text-left">
          <p className="text-xs text-foreground/40">Hex Data:</p>
          <p className="text-xs font-mono text-foreground/70 truncate">0xa9059cbb000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000</p>
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-consumer-purple/15 border border-consumer-purple/30 text-consumer-purple-light font-semibold text-sm">
        Confirm Custom Gas
      </button>
    </motion.div>
  );
}

function VisualState2({ active }: { active: MotionValue<number> }) {
  const opacity = useTransform(active, (v: number) => (Math.round(v) === 2 ? 1 : 0));
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 pointer-events-none"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-sm font-bold text-white">Status: Pending...</span>
        <span className="w-2.5 h-2.5 rounded-full bg-consumer-orange animate-ping" />
      </div>

      <div className="my-auto space-y-6 text-center">
        <div className="relative w-20 h-20 mx-auto">
          {/* Pulsing error ring */}
          <div className="absolute inset-0 rounded-full border border-consumer-orange/20 animate-ping" />
          <div className="w-20 h-20 rounded-full bg-consumer-orange-dark/40 border border-consumer-orange/40 flex items-center justify-center">
            <AlertOctagon className="w-10 h-10 text-consumer-orange" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-consumer-orange">Transaction Failed</h4>
          <p className="text-sm text-foreground/50">Error: Out of Gas</p>
        </div>

        <p className="text-xs text-foreground/40 leading-normal max-w-[240px] mx-auto">
          The network gas price spiked during confirmation, consuming your paid fee without executing the payment.
        </p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm">
          View Hash
        </button>
        <button className="flex-1 py-3 rounded-xl bg-consumer-orange/20 border border-consumer-orange/40 text-consumer-orange-light font-semibold text-sm">
          Retry Pay
        </button>
      </div>
    </motion.div>
  );
}

function VisualState3({ active }: { active: MotionValue<number> }) {
  const opacity = useTransform(active, (v: number) => (Math.round(v) === 3 ? 1 : 0));
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 pointer-events-none"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-sm font-bold text-white">Secret Recovery Phrase</span>
        <span className="text-xs text-consumer-blue font-medium">Step 2 of 4</span>
      </div>

      <div className="my-auto space-y-4">
        <p className="text-xs text-foreground/60 leading-relaxed text-center">
          Write down these 12 words in order and store them in a secure place.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {["abandon", "glass", "future", "ghost", "wallet", "gasless", "shield", "smart", "ai", "block", "verify", "secure"].map((word, idx) => (
            <div key={idx} className="glass p-1.5 rounded border border-white/5 text-center text-xs font-mono text-white/80">
              <span className="text-[10px] text-foreground/30 mr-1">{idx + 1}</span>
              {word}
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg border border-consumer-blue/20 bg-consumer-blue/5 text-[10px] text-consumer-blue-light leading-normal">
          WARNING: Never share your recovery phrase. Anyone with this phrase can steal your entire wallet.
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-consumer-blue/20 border border-consumer-blue/30 text-consumer-blue-light font-semibold text-sm flex items-center justify-center gap-2">
        {"I've Written It Down"} <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
