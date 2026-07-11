"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  userId: string;
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setName(data.name || "");
        } else {
          window.location.href = "/login";
        }
      } catch (e) {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setMessage("Profile updated!");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update");
      }
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-primary">Redirecting...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-primary mb-2">Your Profile</h1>
          <p className="text-charcoal/70">Manage your account details.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
          <form onSubmit={handleSave}>
            <div className="mb-6">
              <label className="block text-charcoal/70 text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-cream text-charcoal/50 px-4 py-3 rounded-lg border border-charcoal/10 cursor-not-allowed"
              />
              <p className="text-xs text-charcoal/40 mt-1">Email cannot be changed</p>
            </div>

            <div className="mb-6">
              <label className="block text-charcoal/70 text-sm mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-cream text-charcoal px-4 py-3 rounded-lg border border-charcoal/10 focus:border-primary focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="w-full bg-accent text-charcoal px-6 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/dashboard"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Link
            href="/"
            className="text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
          >
            ← Back to home
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}