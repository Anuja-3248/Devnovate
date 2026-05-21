"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/Hyperspeed";

export default function RootPage() {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [voicePlayed, setVoicePlayed] = useState(false);

  useEffect(() => {
    const overlayTimer = window.setTimeout(() => {
      setShowOverlay(true);
    }, 2000);

    const redirectTimer = window.setTimeout(() => {
      router.push("/login");
    }, 4500);

    return () => {
      window.clearTimeout(overlayTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  const playVoiceWelcome = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome to GhostPay AI");
      utterance.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (showOverlay && !voicePlayed) {
      playVoiceWelcome();
      setVoicePlayed(true);
    }
  }, [showOverlay, voicePlayed]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810] px-0 py-0">
      <Hyperspeed
        effectOptions={{
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 10,
          islandWidth: 2,
          lanesPerRoad: 4,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [12, 80],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0xffffff,
            brokenLines: 0xffffff,
            leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
            rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
            sticks: 0x03b3c3,
          },
        }}
      />
      {showOverlay && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="pointer-events-auto rounded-[2rem] border border-white/10 bg-slate-950/85 p-10 text-center shadow-[0_40px_120px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-400">Welcome to</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">GhostPay AI</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Your voice-powered Web3 onboarding experience is ready.
            </p>
            <button
              type="button"
              onClick={playVoiceWelcome}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#5b81ff] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f6ee5] focus:outline-none focus:ring-2 focus:ring-[#5b81ff]/50"
            >
              Play voice welcome
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
