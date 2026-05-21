"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, AlertOctagon, Key, ArrowRight } from "lucide-react";

const SLIDE_DURATION = 3500; // ms per slide

const problems = [
  {
    id: 0,
    subtitle: "Complexity Overload",
    title: "Confusing Wallet UX",
    description:
      "Gwei, Max Priority Fees, Gas Limits, Slippage, Hex Data... Web3 interfaces force regular users to act like network engineers just to send payments.",
    icon: <HelpCircle className="w-7 h-7 text-purple-400" />,
    accent: "purple",
    visual: (
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="text-sm font-bold text-white">Advanced Settings</span>
          <span className="text-xs text-foreground/40">Hex Mode</span>
        </div>
        <div className="my-auto space-y-4">
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-left text-xs font-mono space-y-1">
            <p className="text-purple-400 font-bold">GAS ESTIMATION DETAILS</p>
            <p className="text-foreground/50">Gas Limit: <span className="text-white">21000</span></p>
            <p className="text-foreground/50">Max Fee: <span className="text-white">35.48 Gwei</span></p>
            <p className="text-foreground/50">Max Priority: <span className="text-white">1.5 Gwei</span></p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-foreground/60">Base Fee:</span>
              <span className="text-white">32 Gwei</span>
            </div>
            <input type="range" className="w-full accent-purple-500 bg-white/10 h-1 rounded" readOnly value="75" />
            <div className="flex justify-between text-[10px] text-foreground/40">
              <span>Slow (Cheap)</span><span>Instant (Expensive)</span>
            </div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-left">
            <p className="text-xs text-foreground/40">Hex Data:</p>
            <p className="text-xs font-mono text-foreground/70 truncate">0xa9059cbb000000000000000000000000f39fd6e51aad...</p>
          </div>
        </div>
        <button className="w-full py-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold text-sm">
          Confirm Custom Gas
        </button>
      </div>
    ),
  },
  {
    id: 1,
    subtitle: "Sunk Cost & Anxiety",
    title: "Failed Transactions",
    description:
      "Wait 10 minutes only to see 'Transaction Failed (Out of Gas)'. Your money is gone, the transaction is dropped, and you have no idea why.",
    icon: <AlertOctagon className="w-7 h-7 text-orange-400" />,
    accent: "orange",
    visual: (
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="text-sm font-bold text-white">Status: Pending...</span>
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
        </div>
        <div className="my-auto space-y-6 text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border border-orange-400/20 animate-ping" />
            <div className="w-20 h-20 rounded-full bg-orange-900/40 border border-orange-400/40 flex items-center justify-center">
              <AlertOctagon className="w-10 h-10 text-orange-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-orange-400">Transaction Failed</h4>
            <p className="text-sm text-foreground/50">Error: Out of Gas</p>
          </div>
          <p className="text-xs text-foreground/40 leading-normal max-w-[240px] mx-auto">
            The network gas price spiked during confirmation, consuming your paid fee without executing the payment.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm">View Hash</button>
          <button className="flex-1 py-3 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300 font-semibold text-sm">Retry Pay</button>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    subtitle: "The Seed Phrase Barrier",
    title: "Complex Onboarding",
    description:
      "Write down 12 random words. If you lose them or type them wrong, your funds are gone forever. No 'forgot password', no recovery. Too scary for most.",
    icon: <Key className="w-7 h-7 text-blue-400" />,
    accent: "blue",
    visual: (
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <span className="text-sm font-bold text-white">Secret Recovery Phrase</span>
          <span className="text-xs text-blue-400 font-medium">Step 2 of 4</span>
        </div>
        <div className="my-auto space-y-4">
          <p className="text-xs text-foreground/60 leading-relaxed text-center">
            Write down these 12 words in order and store them in a secure place.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {["abandon","glass","future","ghost","wallet","gasless","shield","smart","ai","block","verify","secure"].map((word, idx) => (
              <div key={idx} className="bg-white/5 p-1.5 rounded border border-white/5 text-center text-xs font-mono text-white/80">
                <span className="text-[10px] text-foreground/30 mr-1">{idx + 1}</span>{word}
              </div>
            ))}
          </div>
          <div className="p-3 rounded-lg border border-blue-400/20 bg-blue-500/5 text-[10px] text-blue-300 leading-normal">
            WARNING: Never share your recovery phrase. Anyone with this phrase can steal your entire wallet.
          </div>
        </div>
        <button className="w-full py-3 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 font-semibold text-sm flex items-center justify-center gap-2">
          {"I've Written It Down"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const accentColors: Record<string, string> = {
  purple: "from-purple-500/20 to-purple-900/5 border-purple-500/20 text-purple-400 bg-purple-500/10",
  orange: "from-orange-500/20 to-orange-900/5 border-orange-500/20 text-orange-400 bg-orange-500/10",
  blue: "from-blue-500/20 to-blue-900/5 border-blue-500/20 text-blue-400 bg-blue-500/10",
};

const glowColors: Record<string, string> = {
  purple: "rgba(168,85,247,0.15)",
  orange: "rgba(251,146,60,0.15)",
  blue: "rgba(96,165,250,0.15)",
};

export function ProblemSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = (startIdx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / (SLIDE_DURATION / 50);
      setProgress(Math.min(p, 100));
    }, 50);

    intervalRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % problems.length;
        return next;
      });
      setProgress(0);
      p = 0;
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startCycle(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDotClick = (idx: number) => {
    setActive(idx);
    startCycle(idx);
  };

  const current = problems[active];
  const accent = current.accent;

  return (
    <section className="relative bg-black/40 py-24 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-foreground/60 uppercase tracking-widest font-semibold mb-4"
        >
          Why Web3 Fails Normal Users
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          The Gas Trap is Real
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* LEFT: Animated text slide */}
          <div className="w-full md:w-1/2 relative min-h-[320px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 60 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-start text-left"
              >
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6 ${accentColors[accent]}`}
                >
                  {current.icon}
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {current.subtitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                  {current.title}
                </h3>

                {/* Description */}
                <p className="text-lg text-foreground/60 leading-relaxed max-w-lg">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots + progress */}
            <div className="flex items-center gap-4 mt-10">
              {problems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: idx === active ? 48 : 16, background: "rgba(255,255,255,0.1)" }}
                >
                  {idx === active && (
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${progress}%`,
                        background: accentColors[accent].includes("purple")
                          ? "#a855f7"
                          : accentColors[accent].includes("orange")
                          ? "#fb923c"
                          : "#60a5fa",
                      }}
                    />
                  )}
                </button>
              ))}
              <span className="text-xs text-foreground/30 ml-2">
                {active + 1} / {problems.length}
              </span>
            </div>
          </div>

          {/* RIGHT: Animated visual card */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div
              className="w-full max-w-sm aspect-[4/5] rounded-3xl relative overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              style={{
                background: "rgba(10,10,20,0.9)",
                boxShadow: `0 0 80px ${glowColors[accent]}, 0 0 0 1px rgba(255,255,255,0.06)`,
              }}
            >
              {/* Background glow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 70% 20%, ${glowColors[accent]}, transparent 60%)`,
                  }}
                />
              </AnimatePresence>

              {/* Visual content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${active}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {current.visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
