"use client";

import ShareButton from "./ShareButton";
import PathwayDisplay from "./PathwayDisplay";

interface GiftDisplayProps {
  gifts: string[];
  userName: string;
}

export default function GiftDisplay({ gifts, userName }: GiftDisplayProps) {
  const giftProfile = gifts.join("\n");
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">✨</div>
        <h2 className="text-xl font-serif text-primary mb-2">Your gifts</h2>
        <p className="text-charcoal/70 text-sm">
          Here&apos;s what we found in your discovery journey.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {gifts.map((gift, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-accent mt-1">✦</span>
            <p className="text-charcoal/80">{gift}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <ShareButton gifts={gifts} userName={userName} />
      </div>

      <PathwayDisplay giftProfile={giftProfile} />

      <div className="border-t border-charcoal/10 pt-6 mt-8">
        <a
          href="/discovery"
          className="block w-full text-center text-primary font-medium hover:text-primary/80 transition-colors py-3"
        >
          Replay the discovery journey
        </a>
      </div>
    </div>
  );
}