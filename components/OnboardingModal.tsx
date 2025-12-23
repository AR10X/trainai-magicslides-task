"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function OnboardingModal({ open, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    goal: "Muscle Gain",
    level: "Beginner",
    location: "Gym",
    diet: "Non-Veg",
  });

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    localStorage.setItem("trainai_plan", JSON.stringify(data));

    setLoading(false);
    onClose();
    router.push("/dashboard");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900">
          Get Your AI Fitness Plan
        </h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />

          <div className="flex gap-3">
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex gap-3">
            <input
              name="height"
              type="number"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />

            <input
              name="weight"
              type="number"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Gym</option>
            <option>Home</option>
            <option>Outdoor</option>
          </select>

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option>Non-Veg</option>
            <option>Veg</option>
            <option>Vegan</option>
            <option>Keto</option>
          </select>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-black py-3 text-white disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
