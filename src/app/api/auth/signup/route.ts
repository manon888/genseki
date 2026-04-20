import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password, whatBroughtYou } = await req.json();

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
        password: hashed,
      },
    });

    // Create session and set cookie
    const token = await createSession({ userId: user.id, name: user.name, email: user.email });
    await setSessionCookie(token);

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