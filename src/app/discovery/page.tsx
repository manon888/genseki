"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { discoveryQuestions } from "@/lib/questions";

export default function DiscoveryPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = discoveryQuestions[currentIndex];
  const isLast = currentIndex === discoveryQuestions.length - 1;
  const isComplete = currentIndex >= discoveryQuestions.length;

  function handleNext(value: string) {
    const updated = { ...responses, [currentQuestion.id]: value };
    setResponses(updated);

    if (isLast) {
      submitDiscovery(updated);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  async function submitDiscovery(responses: Record<string, string>) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-2xl font-serif text-primary mb-2">Analyzing...</h2>
          <p className="text-charcoal/70">Finding your gifts</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="h-1 bg-charcoal/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / discoveryQuestions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-charcoal/50 text-sm mt-2 text-right">
            {currentIndex + 1} of {discoveryQuestions.length}
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif text-primary mb-2">
          {currentQuestion.question}
        </h2>
        <p className="text-charcoal/60 mb-8">{currentQuestion.subtext}</p>

        {currentQuestion.type === "text" && (
          <TextInput onNext={handleNext} />
        )}
        {currentQuestion.type === "choice" && (
          <ChoiceOptions
            options={currentQuestion.options || []}
            onNext={handleNext}
          />
        )}
        {currentQuestion.type === "scale" && (
          <ScaleInput
            labels={currentQuestion.scale_labels!}
            onNext={handleNext}
          />
        )}
      </div>
    </main>
  );
}

function TextInput({ onNext }: { onNext: (v: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-4">
      <textarea
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-4 rounded-xl border border-charcoal/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-lg resize-none"
        rows={4}
        placeholder="Take your time..."
      />
      <button
        onClick={() => value.trim() && onNext(value.trim())}
        disabled={!value.trim()}
        className="w-full bg-primary text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  );
}

function ChoiceOptions({
  options,
  onNext,
}: {
  options: string[];
  onNext: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onNext(option)}
          className="w-full text-left px-6 py-4 rounded-xl border border-charcoal/20 bg-white hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ScaleInput({
  labels,
  onNext,
}: {
  labels: { low: string; high: string };
  onNext: (v: string) => void;
}) {
  const [value, setValue] = useState(5);
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-sm text-charcoal/60">
        <span>{labels.low}</span>
        <span>{labels.high}</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-charcoal/10 rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="text-center text-2xl font-medium text-primary">{value}</div>
      <button
        onClick={() => onNext(String(value))}
        className="w-full bg-primary text-white px-6 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Continue
      </button>
    </div>
  );
}