import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSimpleGiftProfile(responses: Record<string, string>): string {
  // Very lightweight gift profile generation for MVP
  // Phase 2 will have full AI-powered analysis
  const total = Object.values(responses).length;
  const textResponses = Object.values(responses).filter(v => isNaN(Number(v))).length;
  const scaleResponses = Object.values(responses).filter(v => !isNaN(Number(v))).length;

  // Simple heuristic-based gift suggestions
  const gifts: string[] = [];

  if (textResponses >= 6) {
    gifts.push("You naturally see patterns and connections others miss");
    gifts.push("Your intuition is strong — you often know things before you can explain why");
  }

  if (scaleResponses >= 3) {
    gifts.push("You have a grounded sense of self-awareness");
  }

  if (gifts.length === 0) {
    gifts.push("You have a unique perspective worth exploring");
    gifts.push("Your diverse interests are part of your gift");
  }

  return gifts.join(" | ");
}

export async function POST(req: Request) {
  try {
    const { responses } = await req.json();

    if (!responses) {
      return NextResponse.json(
        { error: "Responses are required" },
        { status: 400 }
      );
    }

    // For MVP, userId comes from session/cookie in real app
    // Here we just return the computed profile
    const giftProfile = generateSimpleGiftProfile(responses);

    return NextResponse.json(
      { message: "Discovery complete", giftProfile },
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