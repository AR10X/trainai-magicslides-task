"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("trainai_plan");
    if (!stored) {
      router.push("/");
      return;
    }
    setPlan(JSON.parse(stored));
  }, []);

  if (!plan) return null;

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <div className="text-2xl font-bold">TrainAI</div>

        <nav className="mt-10 space-y-4 text-gray-700">
          <div className="font-medium">Dashboard</div>
          <div className="text-gray-500">Workout</div>
          <div className="text-gray-500">Diet</div>
          <div className="text-gray-500">Motivation</div>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Fitness Plan</h1>
            <p className="text-gray-600 mt-1">
              Generated specifically for you by TrainAI
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            New Plan
          </button>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-lg">Goal</h2>
            <p className="mt-2 text-gray-700">{plan.user.goal}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-lg">Level</h2>
            <p className="mt-2 text-gray-700">{plan.user.level}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-lg">Diet</h2>
            <p className="mt-2 text-gray-700">{plan.user.diet}</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow mb-10">
          <h2 className="text-2xl font-semibold mb-4">Workout Plan</h2>

          <div className="space-y-4">
            {Object.entries(plan.workoutPlan).map(
              ([day, data]: any) => (
                <div key={day} className="rounded-xl border p-4">
                  <h3 className="font-semibold text-lg">{data.focus}</h3>

                  <ul className="mt-2 space-y-1 text-gray-700">
                    {data.exercises.map((ex: any, i: number) => (
                      <li key={i}>
                        {ex.name} — {ex.sets} × {ex.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4">Diet Plan</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Breakfast:</strong> {plan.dietPlan.breakfast}</p>
              <p><strong>Lunch:</strong> {plan.dietPlan.lunch}</p>
              <p><strong>Dinner:</strong> {plan.dietPlan.dinner}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold mb-4">Motivation</h2>
            <p className="italic text-gray-700">
              “{plan.motivation}”
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Stay consistent with your workouts</li>
            <li>Follow the diet plan closely</li>
            <li>Track progress weekly</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
