import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { analyzeGensekiProfile } from "@/lib/ollama";
import { discoveryQuestions } from "@/lib/questions";

export async function POST(req: Request) {
  try {
    // Get session from cookie to associate with user
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

    const { analysis, error } = await analyzeGensekiProfile(
      responses,
      discoveryQuestions.map((q) => ({ id: q.id, question: q.question, type: q.type }))
    );

    const giftProfile = analysis;

    // Upsert discovery response (in case they redo it)
    const discovery = await prisma.discoveryResponse.upsert({
      where: { user_id: session.userId },
      update: {
        responses: JSON.stringify(responses),
        gift_profile: giftProfile,
      },
      create: {
        user_id: session.userId,
        responses: JSON.stringify(responses),
        gift_profile: giftProfile,
      },
    });

    return NextResponse.json(
      { message: "Discovery complete", giftProfile, discoveryId: discovery.id },
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