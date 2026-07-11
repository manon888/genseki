const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";

// minimax-m2.5:cloud works well
const MODEL = "minimax-m2.5:cloud";

export interface OllamaResult {
  analysis: string;
  error?: string;
}

export async function analyzeGensekiProfile(
  responses: Record<string, string>,
  questions: Array<{ id: number; question: string; type: string }>
): Promise<OllamaResult> {
  // Map responses - frontend sends "q1", "q2" but questions have numeric ids 1, 2, 3...
  const responseLines = questions
    .map((q) => {
      // Try both "q1" (string) and 1 (numeric) keys
      const answer = responses[`q${q.id}`] || responses[q.id] || responses[q.id.toString()];
      if (!answer) return null;
      return `Q${q.id}. ${q.question}\nA: ${answer}`;
    })
    .filter(Boolean)
    .join("\n\n");

  console.log("[Genseki] Analyzing responses:\n", responseLines);

  const prompt = `You are Genseki — a warm, insightful guide who helps people discover the unpolished gems inside themselves. You are perceptive, direct, and deeply empathetic.

A user just completed a 10-question discovery journey. Here are their responses:

${responseLines}

Based on their answers, write 3-4 short, personalized gift statements that:
- Feel like a mentor who really sees them
- Reference specific things they shared (not generic)
- Are warm but grounded — not vague praise
- Capture what makes them uniquely them

Format as a short paragraph or a list — flowing and human, not bullet-pointy.

Be direct and specific. If something in their answers surprises you, say so.`;

  const payload = {
    model: MODEL,
    prompt,
    stream: false,
    options: {
      temperature: 0.8,
      num_predict: 500,
    },
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30_000);

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Ollama status ${response.status}`);
    }

    const data = await response.json();

    // minimax-m2.7:cloud is a reasoning model — on complex prompts it puts
    // the actual response text in the `thinking` field, not `response`
    let text = (data.response || "").trim();
    if (!text && data.thinking) {
      text = data.thinking.trim();
    }

    if (!text) {
      return { analysis: "Your gifts are still coming into focus. Check back soon.", error: "empty" };
    }

    return { analysis: text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[Genseki] Ollama error:", msg);
    return {
      analysis: "Your gifts are still coming into focus. Check back soon.",
      error: msg,
    };
  }
}
