export interface DiscoveryQuestion {
  id: number;
  question: string;
  subtext: string;
  type: 'text' | 'choice' | 'scale';
  options?: string[];
  scale_labels?: { low: string; high: string };
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: 1,
    question: "What's something you do that makes time disappear?",
    subtext: "That thing you could do for hours without even noticing the clock.",
    type: 'text',
  },
  {
    id: 2,
    question: "When have you felt most alive?",
    subtext: "Not necessarily successful — just deeply present and engaged.",
    type: 'text',
  },
  {
    id: 3,
    question: "What do people often ask you for help with?",
    subtext: "The thing that comes naturally to you that others struggle with.",
    type: 'text',
  },
  {
    id: 4,
    question: "How do you prefer to learn new things?",
    subtext: "Pick the one that feels most like you.",
    type: 'choice',
    options: [
      "Diving in and figuring it out as I go",
      "Reading and studying first",
      "Watching someone do it first",
      "Breaking it into pieces and practicing each one",
    ],
  },
  {
    id: 5,
    question: "When you imagine your ideal day, what's happening?",
    subtext: "Not the vacation fantasy — the real, grounded version.",
    type: 'text',
  },
  {
    id: 6,
    question: "What topic could you talk about for hours without getting bored?",
    subtext: "The thing that makes your eyes light up.",
    type: 'text',
  },
  {
    id: 7,
    question: "How often do you trust your gut instinct?",
    subtext: "Your intuition — that quiet inner voice.",
    type: 'scale',
    scale_labels: {
      low: "I usually overthink it",
      high: "I always trust it",
    },
  },
  {
    id: 8,
    question: "What's a skill you have that surprised you?",
    subtext: "Something you didn't learn formally — it just happened.",
    type: 'text',
  },
  {
    id: 9,
    question: "What kind of impact do you want to have?",
    subtext: "How do you want to show up in the world?",
    type: 'choice',
    options: [
      "Creating something new",
      "Helping and supporting others",
      "Teaching and sharing knowledge",
      "Solving problems and fixing things",
      "Inspiring and motivating people",
    ],
  },
  {
    id: 10,
    question: "If you had no fear and full resources, what would you create?",
    subtext: "The thing that lives in the back of your mind but feels too big to say out loud.",
    type: 'text',
  },
];