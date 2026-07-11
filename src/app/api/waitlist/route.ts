import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already on waitlist
    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({
        message: "You're already on the waitlist!",
        position: existing.position,
      });
    }

    // Get current max position
    const lastEntry = await prisma.waitlist.findFirst({
      orderBy: { position: "desc" },
    });

    const newPosition = (lastEntry?.position || 0) + 1;

    // Add to waitlist
    const entry = await prisma.waitlist.create({
      data: {
        email,
        position: newPosition,
        source: source || null,
      },
    });

    return NextResponse.json(
      {
        message: "You're on the waitlist!",
        position: entry.position,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Get waitlist count
    const count = await prisma.waitlist.count();
    
    return NextResponse.json({
      count,
    });
  } catch (err) {
    console.error("Waitlist GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}