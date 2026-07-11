"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: source || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setPosition(data.position);
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-primary mb-2">Genseki</h1>
          <p className="text-charcoal/70">Discover what makes you unique</p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
          {status === "success" ? (
            <div>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-serif text-primary mb-4">
                You&apos;re on the list!
              </h2>
              <p className="text-charcoal/70 mb-4">{message}</p>
              <div className="bg-cream rounded-xl p-4 mb-6">
                <p className="text-sm text-charcoal/60">Your position</p>
                <p className="text-3xl font-bold text-accent">#{position}</p>
              </div>
              <p className="text-sm text-charcoal/50">
                We&apos;ll notify you when it&apos;s your turn!
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-serif text-primary mb-4">
                Join the Waitlist
              </h2>
              <p className="text-charcoal/70 mb-6">
                Be among the first to discover your gifts. 
                We&apos;re opening access gradually to ensure the best experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-full border border-charcoal/20 
                             focus:outline-none focus:border-primary text-charcoal
                             placeholder:text-charcoal/40"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="How did you hear about us? (optional)"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-charcoal/20 
                             focus:outline-none focus:border-primary text-charcoal
                             placeholder:text-charcoal/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-accent text-charcoal px-6 py-3 rounded-full 
                           font-medium hover:bg-accent/90 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-lg shadow-accent/25"
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                </button>

                {status === "error" && (
                  <p className="text-red-600 text-sm">{message}</p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Bottom links */}
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <Link href="/" className="text-charcoal/50 hover:text-charcoal/70">
            Home
          </Link>
          <Link href="/login" className="text-charcoal/50 hover:text-charcoal/70">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}