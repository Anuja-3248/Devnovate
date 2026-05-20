"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, CheckCircle2, Zap, Send, ShieldCheck } from "lucide-react";

export function AIDemoSection() {
  const [animationStep, setAnimationStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const targetText = "Send 5 MockUSD to Rahul";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (animationStep === 0) {
      let charIndex = 0;
      
      const type = () => {
        if (charIndex < targetText.length) {
          setTypedText((prev) => prev + targetText.charAt(charIndex));
          charIndex++;
          timer = setTimeout(type, 80);
        } else {
          // Finished typing, move to AI processing in 1.2s
          timer = setTimeout(() => {
            setAnimationStep(1);
          }, 1200);
        }
      };

      timer = setTimeout(() => {
        setTypedText("");
        type();
      }, 500);
    } else if (animationStep === 1) {
      // Step 1: AI parsed command
      timer = setTimeout(() => setAnimationStep(2), 2000);
    } else if (animationStep === 2) {
      // Step 2: Show preview card
      timer = setTimeout(() => setAnimationStep(3), 2500);
    } else if (animationStep === 3) {
      // Step 3: Sponsor gas fee
      timer = setTimeout(() => setAnimationStep(4), 3000);
    } else if (animationStep === 4) {
      // Step 4: Show success confirmation, hold, then loop back
      timer = setTimeout(() => setAnimationStep(0), 6000);
    }

    return () => clearTimeout(timer);
  }, [animationStep]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background glow behind chat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Text descriptions */}
        <div className="lg:col-span-5 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-primary font-semibold text-sm">
            <Bot className="w-4 h-4" /> AI Transactions In Action
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See the Magic of <span className="text-gradient">Invisible Web3</span>
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Witness how our AI translates natural commands into secure gasless blockchain actions. The complexity of RPCs, wallet signatures, and gas fees is completely abstracted.
          </p>

          {/* Stepper indicators */}
          <div className="space-y-4 pt-4">
            {[
              { label: "AI Command Interpretation", desc: "Translates natural language to blockchain calls" },
              { label: "Dynamic Transaction Preview", desc: "Transparent human-readable cost breakdown" },
              { label: "Gas Fee Sponsoring (UGF)", desc: "Gasless meta-transaction execution" },
              { label: "Instant Chain Execution", desc: "Secured on-chain, transaction complete" },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border transition-colors duration-300 mt-1 ${
                  animationStep > idx 
                    ? "bg-primary border-primary text-white" 
                    : animationStep === idx
                    ? "border-accent text-accent animate-pulse"
                    : "border-white/10 text-foreground/30"
                }`}>
                  {animationStep > idx ? "✓" : idx + 1}
                </div>
                <div>
                  <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                    animationStep >= idx ? "text-white" : "text-foreground/40"
                  }`}>
                    {step.label}
                  </h4>
                  <p className="text-xs text-foreground/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Interactive chat simulation */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <div className="w-full max-w-xl glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Header bar */}
            <div className="bg-black/60 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_15px_var(--primary-glow)]">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-consumer-green border border-black animate-pulse" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-sm text-white">GhostPay Assistant</h3>
                  <p className="text-[10px] text-foreground/40">Powered by Gemini & UGF</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-6 h-[400px] flex flex-col justify-between overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-black/30">
              <div className="space-y-4">
                
                {/* User typed message */}
                <div className="flex items-end justify-end gap-3">
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary/20 border border-primary/30 p-4 text-left">
                    <p className="text-sm text-white font-medium min-h-[20px] flex items-center">
                      {typedText}
                      {animationStep === 0 && (
                        <span className="w-1.5 h-4 bg-primary inline-block ml-1 animate-pulse" />
                      )}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                    <User className="w-4 h-4 text-foreground/70" />
                  </div>
                </div>

                {/* AI responses */}
                <AnimatePresence>
                  {animationStep >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-3 w-full max-w-[80%]">
                        
                        {/* Parser Bubble */}
                        <div className="rounded-2xl rounded-bl-sm glass p-4 text-left border border-white/5 text-sm text-foreground/80 space-y-2">
                          <p className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                            Parsing command...
                          </p>
                          {animationStep >= 2 && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-foreground/50 border-t border-white/5 pt-2 font-mono"
                            >
                              Resolved Intent: <span className="text-accent">TokenTransfer</span><br />
                              Recipient: <span className="text-white">Rahul (0x8F9a...2B4c)</span><br />
                              Amount: <span className="text-white">5.00 MockUSD</span>
                            </motion.p>
                          )}
                        </div>

                        {/* Transaction Card */}
                        {animationStep >= 2 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-panel border border-white/10 rounded-2xl p-4 text-left space-y-4 relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-2 bg-primary/20 text-primary font-bold text-[9px] uppercase rounded-bl-xl tracking-wider">
                              Preview Card
                            </div>

                            <h4 className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Transaction Summary</h4>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-foreground/60">Transfer Amount:</span>
                                <span className="font-extrabold text-white">5.00 MockUSD</span>
                              </div>

                              <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
                                <span className="text-foreground/60">Recipient:</span>
                                <span className="font-mono text-white text-xs">Rahul (0x8F9a...2B4c)</span>
                              </div>

                              {/* Gas sponsor line */}
                              <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
                                <span className="text-foreground/60">Network Gas Fee:</span>
                                <div className="text-right">
                                  {animationStep === 2 ? (
                                    <span className="font-semibold text-foreground/70">$0.18</span>
                                  ) : (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="flex items-center gap-1.5"
                                    >
                                      <span className="line-through text-xs text-foreground/30">$0.18</span>
                                      <span className="font-bold text-consumer-green text-xs flex items-center gap-0.5">
                                        <Zap className="w-3 h-3 fill-consumer-green text-consumer-green" /> Gasless (UGF)
                                      </span>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Status indicator bar */}
                            {animationStep >= 3 && (
                              <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between bg-consumer-green-dark/20 border border-consumer-green/20 p-2.5 rounded-xl text-xs text-consumer-green"
                              >
                                <span className="flex items-center gap-1.5 font-medium">
                                  <ShieldCheck className="w-4 h-4 text-consumer-green" /> Gas Sponsored successfully
                                </span>
                              </motion.div>
                            )}

                            {/* Execution state */}
                            {animationStep >= 4 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl flex items-center justify-between text-xs font-semibold text-white shadow-lg shadow-primary/20"
                              >
                                <span className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-white" /> Transaction Success!
                                </span>
                                <span className="text-[10px] underline cursor-pointer font-mono opacity-80 hover:opacity-100">
                                  Tx Hash: 0x9f...a8e
                                </span>
                              </motion.div>
                            )}

                          </motion.div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Chat Input simulation bar */}
              <div className="relative mt-4">
                <div className="w-full glass rounded-xl py-3.5 pl-4 pr-12 text-sm text-foreground/30 text-left border border-white/10 flex items-center justify-between">
                  <span>Type commands... e.g. &quot;Donate 5 USD&quot;</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
