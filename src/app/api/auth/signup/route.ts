import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession, setSessionCookie } from "@/lib/auth";
import { trackEvent } from "@/lib/analytics";
import { onSignup } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashed = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashed,
      },
    });

    // Create session and set cookie
    const token = await createSession({ userId: user.id, name: user.name, email: user.email });
    await setSessionCookie(token);

    // Track analytics
    trackEvent("signup", { userId: user.id });

    // Send welcome email (fire-and-forget)
    onSignup(user.email, user.name).catch(err => {
      console.error("[Email] Failed to send welcome:", err);
    });

    return NextResponse.json(
      { message: "Account created", userId: user.id, name: user.name },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}