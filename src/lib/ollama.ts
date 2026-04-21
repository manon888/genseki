const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";

// Primary model: nemotron-mini is stable and fast for this use case
const PRIMARY_MODEL = "nemotron-mini:4b";
// Fallback if nemotron fails
const FALLBACK_MODEL = "qwen3.5:latest";

export interface OllamaResult {
  analysis: string;
  error?: string;
}

async function callOllama(model: string, prompt: string, timeoutMs = 30000): Promise<{ analysis: string; usedFallback: boolean }> {
  const payload = {
    model,
    prompt,
    stream: false,
    options: {
      temperature: 0.8,
      num_predict: 500,
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`Ollama responded with status ${response.status}`);
    }

    const data = await response.json();

    // Try response field first, then thinking field (reasoning models use thinking)
    let text = (data.response || "").trim();
    if (!text && data.thinking) {
      // Reasoning models like minimax write actual content to thinking field
      text = data.thinking.trim();
    }

    if (!text) {
      throw new Error("empty_response");
    }

    return { analysis: text, usedFallback: model !== PRIMARY_MODEL };
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

export async function analyzeGensekiProfile(
  responses: Record<string, string>,
  questions: Array<{ id: number; question: string; type: string }>
): Promise<OllamaResult> {
  // Build the context from user's responses
  const responseLines = questions
    .map((q) => {
      const answer = responses[q.id];
      if (answer === undefined) return null;
      return `Q${q.id} (${q.type}): "${q.question}"\nA: ${answer}`;
    })
    .filter(Boolean)
    .join("\n\n");

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

  // Try primary model first
  try {
    const { analysis, usedFallback } = await callOllama(PRIMARY_MODEL, prompt);
    return { analysis };
  } catch (primaryErr) {
    console.warn("[Genseki] Primary model failed, trying fallback:", primaryErr instanceof Error ? primaryErr.message : String(primaryErr));
  }

  // Try fallback model
  try {
    const { analysis } = await callOllama(FALLBACK_MODEL, prompt);
    return { analysis };
  } catch (fallbackErr) {
    console.error("[Genseki] Both models failed:", fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr));
    return {
      analysis: "Your gifts are still coming into focus. Check back soon.",
      error: fallbackErr instanceof Error ? fallbackErr.message : "All models failed",
    };
  }
}
