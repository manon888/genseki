"use client";

import { useState, useEffect } from "react";

export default function AnalysisChecker({ onReady }: { onReady?: () => void }) {
  const [dots, setDots] = useState(".");

  // Check every 5 seconds if analysis is complete
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          // User is authenticated, check if we need to reload
          const data = await res.json();
          // Trigger a page refresh to get new analysis
          if (data.giftProfile && !data.giftProfile.includes("Analyzing")) {
            window.location.reload();
          }
        }
      } catch (e) {
        // Ignore errors
      }
    };

    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "." : d + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-4xl mb-4">✨</div>
      <h2 className="text-xl font-serif text-primary mb-2">Analyzing your gifts{dots}</h2>
      <p className="text-charcoal/70 text-sm">
        This usually takes about 30 seconds...
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 text-primary underline text-sm hover:text-primary/80"
      >
        Click to refresh
      </button>
    </div>
  );
}