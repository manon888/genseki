"use client";

import { Pathway, getPathwaysForGift, getPathwayCategories } from "@/lib/pathways";

interface PathwayDisplayProps {
  giftProfile: string;
}

export default function PathwayDisplay({ giftProfile }: PathwayDisplayProps) {
  const pathways = getPathwaysForGift(giftProfile);
  const categories = getPathwayCategories(giftProfile);

  if (pathways.length === 0) {
    return null;
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "community": return "bg-primary/10 text-primary";
      case "resource": return "bg-accent/20 text-charcoal";
      case "tool": return "bg-green-100 text-green-700";
      case "action": return "bg-purple-100 text-purple-700";
      default: return "bg-charcoal/10 text-charcoal";
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-charcoal/10">
      <h3 className="text-xl font-serif text-primary mb-4">
        Ways to Use Your Gifts
      </h3>
      <p className="text-charcoal/60 text-sm mb-6">
        Based on your unique profile, here are some pathways to explore:
      </p>

      <div className="grid gap-4">
        {pathways.map((pathway: Pathway) => (
          <a
            key={pathway.id}
            href={pathway.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-cream rounded-xl p-4 hover:bg-charcoal/5 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-charcoal">{pathway.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(pathway.type)}`}>
                {pathway.type}
              </span>
            </div>
            <p className="text-sm text-charcoal/70 mb-2">{pathway.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal/50">{pathway.category}</span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs text-charcoal/40 mt-4 text-center">
        These are starting points — explore what resonates with you.
      </p>
    </div>
  );
}