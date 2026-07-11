export interface Pathway {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "community" | "resource" | "action" | "tool";
  url?: string;
  tags: string[];
}

export const pathwayCategories = [
  "Creative Expression",
  "Teaching & Mentoring",
  "Building & Creating",
  "Connecting & Supporting",
  "Leadership & Vision",
];

export const pathways: Pathway[] = [
  // Creative Expression
  {
    id: "creative-1",
    title: "Dribbble",
    description: "Showcase your creative work and connect with designers.",
    category: "Creative Expression",
    type: "community",
    url: "https://dribbble.com",
    tags: ["design", "creative", "portfolio"],
  },
  {
    id: "creative-2",
    title: "Behance",
    description: "Build a creative portfolio and discover inspiring work.",
    category: "Creative Expression",
    type: "community",
    url: "https://behance.net",
    tags: ["design", "art", "portfolio"],
  },
  {
    id: "creative-3",
    title: "Creative Mornings",
    description: "Monthly breakfast lectures for creatives worldwide.",
    category: "Creative Expression",
    type: "community",
    url: "https://creativemornings.com",
    tags: ["events", "networking", "inspiration"],
  },
  // Teaching & Mentoring
  {
    id: "teach-1",
    title: "Mentorship Platforms",
    description: "Find mentorship opportunities or become a mentor.",
    category: "Teaching & Mentoring",
    type: "community",
    url: "https://mentorcruise.com",
    tags: ["mentorship", "career", "growth"],
  },
  {
    id: "teach-2",
    title: "Teaching Resources",
    description: "Tools and platforms for sharing your knowledge.",
    category: "Teaching & Mentoring",
    type: "tool",
    url: "https://udemy.com",
    tags: ["teaching", "courses", "income"],
  },
  {
    id: "teach-3",
    title: "Toastmasters",
    description: "Improve public speaking and leadership skills.",
    category: "Teaching & Mentoring",
    type: "community",
    url: "https://toastmasters.org",
    tags: ["speaking", "leadership", "confidence"],
  },
  // Building & Creating
  {
    id: "build-1",
    title: "Product Hunt",
    description: "Launch and discover new products and side projects.",
    category: "Building & Creating",
    type: "community",
    url: "https://producthunt.com",
    tags: ["launch", "products", "feedback"],
  },
  {
    id: "build-2",
    title: "GitHub",
    description: "Collaborate on code and build projects with others.",
    category: "Building & Creating",
    type: "tool",
    url: "https://github.com",
    tags: ["code", "collaboration", "open-source"],
  },
  {
    id: "build-3",
    title: "Indie Hackers",
    description: "Build in public and learn from solo founders.",
    category: "Building & Creating",
    type: "community",
    url: "https://indiehackers.com",
    tags: ["startup", "business", "side-project"],
  },
  // Connecting & Supporting
  {
    id: "connect-1",
    title: "Meetup",
    description: "Find local groups and events around your interests.",
    category: "Connecting & Supporting",
    type: "community",
    url: "https://meetup.com",
    tags: ["networking", "local", "events"],
  },
  {
    id: "connect-2",
    title: "Volunteer Platforms",
    description: "Find opportunities to use your gifts to help others.",
    category: "Connecting & Supporting",
    type: "action",
    url: "https://volunteermatch.org",
    tags: ["volunteer", "impact", "community"],
  },
  {
    id: "connect-3",
    title: "Local Chambers",
    description: "Connect with local business communities.",
    category: "Connecting & Supporting",
    type: "community",
    tags: ["business", "networking", "local"],
  },
  // Leadership & Vision
  {
    id: "lead-1",
    title: "TED Talks",
    description: "Watch inspiring talks and consider giving one yourself.",
    category: "Leadership & Vision",
    type: "resource",
    url: "https://ted.com",
    tags: ["inspiration", "ideas", "speaking"],
  },
  {
    id: "lead-2",
    title: "LinkedIn",
    description: "Build your professional brand and network.",
    category: "Leadership & Vision",
    type: "community",
    url: "https://linkedin.com",
    tags: ["professional", "networking", "career"],
  },
  {
    id: "lead-3",
    title: "Mastermind Groups",
    description: "Join peer groups for accountability and growth.",
    category: "Leadership & Vision",
    type: "community",
    tags: ["accountability", "growth", "peers"],
  },
];

// Map gift keywords to pathway categories
const categoryKeywords: Record<string, string[]> = {
  "Creative Expression": ["create", "art", "design", "beauty", "aesthetic", "visual", "express", "imagine", "craft"],
  "Teaching & Mentoring": ["teach", "learn", "share", "explain", "mentor", "guide", "help others", "explain"],
  "Building & Creating": ["build", "make", "create", "code", "design", "develop", "construct", "problem"],
  "Connecting & Supporting": ["connect", "support", "help", "community", "people", "relate", "together", "team"],
  "Leadership & Vision": ["lead", "vision", "direction", "strategy", "inspire", "influence", "guide", "future"],
};

export function getPathwaysForGift(giftProfile: string): Pathway[] {
  const lowerGift = giftProfile.toLowerCase();
  
  // Find matching categories based on keywords
  const matchedCategories: string[] = [];
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerGift.includes(keyword)) {
        matchedCategories.push(category);
        break;
      }
    }
  }
  
  // If no matches, return a mix of pathways
  if (matchedCategories.length === 0) {
    return pathways.slice(0, 4);
  }
  
  // Get pathways for matched categories
  const matched = pathways.filter(p => matchedCategories.includes(p.category));
  
  // Return up to 4 pathways
  return matched.slice(0, 4);
}

export function getPathwayCategories(giftProfile: string): string[] {
  const lowerGift = giftProfile.toLowerCase();
  
  const matchedCategories: string[] = [];
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerGift.includes(keyword)) {
        matchedCategories.push(category);
        break;
      }
    }
  }
  
  return matchedCategories.length > 0 ? matchedCategories : pathwayCategories;
}