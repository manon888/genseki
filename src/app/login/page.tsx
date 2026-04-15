"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-primary mb-2">Welcome back</h1>
          <p className="text-charcoal/70">Good to see you again.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

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
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-charcoal/60 mt-6 text-sm">
          New to SparkFun?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}