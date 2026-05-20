"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareCode, ShieldAlert, BadgeCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Type Command",
      desc: "Describe what you want to do in plain English. Our AI understands intents, wallets, and asset names instantly.",
      icon: <MessageSquareCode className="w-8 h-8 text-consumer-orange" />,
      color: "from-consumer-orange/15 to-consumer-purple/15",
    },
    {
      number: "02",
      title: "Confirm & Sponsor",
      desc: "Review a transparent, human-readable transaction preview. The UGF automatically sponsors 100% of your gas fees.",
      icon: <ShieldAlert className="w-8 h-8 text-consumer-purple" />,
      color: "from-consumer-purple/15 to-consumer-blue/15",
    },
    {
      number: "03",
      title: "Done",
      desc: "Approve the execution. The transaction is instantly broadcasted, confirmed, and finalized securely on-chain.",
      icon: <BadgeCheck className="w-8 h-8 text-consumer-green" />,
      color: "from-consumer-green/15 to-consumer-green-dark/15",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">How It Works</h2>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto">
          Making blockchain transactions is now as easy as sending a chat message. Three steps to total freedom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection arrows for desktop */}
        <div className="hidden md:block absolute top-1/2 -translate-y-12 left-[25%] right-[25%] h-px border-t border-dashed border-white/10 -z-10" />

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="group relative glass-panel p-8 rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between aspect-[1.1] hover:border-white/10 transition-colors duration-300"
          >
            {/* Ambient background glow matching step color */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-extrabold text-white/5 group-hover:text-white/10 transition-colors font-mono tracking-tighter">
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-115 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>

            {/* Bottom step border glow */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
