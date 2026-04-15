"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatBroughtYou, setWhatBroughtYou] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, whatBroughtYou }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/discovery");
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-primary mb-2">Join SparkFun</h1>
          <p className="text-charcoal/70">Let&apos;s start your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="What should we call you?"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label htmlFor="whatBroughtYou" className="block text-sm font-medium text-charcoal mb-1">
              What brought you here? (optional)
            </label>
            <textarea
              id="whatBroughtYou"
              value={whatBroughtYou}
              onChange={(e) => setWhatBroughtYou(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              rows={3}
              placeholder="Something you're curious about, something you're stuck on..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-charcoal/60 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}