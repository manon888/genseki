"use client";

import { useState, useEffect } from "react";

interface Stats {
  totalUsers: number;
  totalDiscoveries: number;
  discoveriesWithGifts: number;
  aiSuccesses: number;
  aiFailures: number;
  aiSuccessRate: number;
  recentEvents: Array<{
    id: string;
    event: string;
    user_id: string | null;
    created_at: string;
  }>;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setError("Not authenticated");
        }
      } catch (e) {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-cream px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-charcoal/60">Loading stats...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-cream px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-serif text-primary mb-8">Analytics</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
            <div className="text-3xl font-bold text-primary">{stats?.totalUsers}</div>
            <div className="text-charcoal/60 text-sm">Total Users</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
            <div className="text-3xl font-bold text-primary">{stats?.totalDiscoveries}</div>
            <div className="text-charcoal/60 text-sm">Discovery Submissions</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
            <div className="text-3xl font-bold text-primary">{stats?.discoveriesWithGifts}</div>
            <div className="text-charcoal/60 text-sm">Completed Gift Profiles</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
            <div className="text-3xl font-bold text-primary">{stats?.aiSuccessRate}%</div>
            <div className="text-charcoal/60 text-sm">AI Success Rate</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
          <h2 className="text-xl font-serif text-primary mb-4">Recent Events</h2>
          
          {stats?.recentEvents && stats.recentEvents.length > 0 ? (
            <div className="space-y-2">
              {stats.recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between text-sm">
                  <span className="text-charcoal">{event.event}</span>
                  <span className="text-charcoal/50">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-charcoal/50">No events yet</p>
          )}
        </div>

        <div className="mt-8">
          <a href="/dashboard" className="text-primary hover:text-primary/80">
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}