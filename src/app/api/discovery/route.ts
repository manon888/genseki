import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { analyzeGensekiProfile } from "@/lib/ollama";
import { discoveryQuestions } from "@/lib/questions";
import { trackEvent } from "@/lib/analytics";
import { onDiscoveryComplete } from "@/lib/email";

// Fire-and-forget background analysis
async function runBackgroundAnalysis(userId: string, responses: Record<string, string>) {
  try {
    const { analysis, error } = await analyzeGensekiProfile(
      responses,
      discoveryQuestions.map((q) => ({ id: q.id, question: q.question, type: q.type }))
    );

    // Update the discovery record with the analysis
    await prisma.discoveryResponse.update({
      where: { user_id: userId },
      data: { gift_profile: analysis },
    });
    
    // Track AI success
    trackEvent("ai_success", { userId });
    
    // Send completion email (fire-and-forget)
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user && analysis && !analysis.includes("Analyzing")) {
      onDiscoveryComplete(user.email, user.name, analysis).catch(err => {
        console.error("[Email] Failed to send:", err);
      });
    }
    
    console.log(`[Genseki] Background analysis complete for user ${userId}`);
  } catch (err) {
    console.error(`[Genseki] Background analysis failed for user ${userId}:`, err);
    // Track AI failure
    trackEvent("ai_failed", { userId, metadata: { error: String(err) } });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { responses } = await req.json();

    if (!responses) {
      return NextResponse.json(
        { error: "Responses are required" },
        { status: 400 }
      );
    }

    // Save discovery responses first (with placeholder gift_profile)
    const discovery = await prisma.discoveryResponse.upsert({
      where: { user_id: session.userId },
      update: {
        responses: JSON.stringify(responses),
        gift_profile: "Analyzing your gifts...", // Placeholder while processing
      },
      create: {
        user_id: session.userId,
        responses: JSON.stringify(responses),
        gift_profile: "Analyzing your gifts...",
      },
    });

    // Track discovery started
    trackEvent("discovery_started", { userId: session.userId });

    // Fire-and-forget: start background analysis
    // Don't await - return immediately to user
    runBackgroundAnalysis(session.userId, responses);

    return NextResponse.json(
      { message: "Discovery submitted", discoveryId: discovery.id, status: "processing" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Discovery error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}