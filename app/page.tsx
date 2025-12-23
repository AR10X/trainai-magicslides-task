"use client";

import { useState } from "react";
import OnboardingModal from "@/components/OnboardingModal";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          TrainAI
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Your personal AI fitness coach for smarter workouts and better nutrition.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-8 px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Get Started
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Personalized plans • AI-powered • No sign-up required
        </p>
      </div>

      <OnboardingModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
