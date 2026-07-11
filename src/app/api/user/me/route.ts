import { NextResponse } from "next/server";
import { getSession, createSession, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        userId: session.userId, 
        name: session.name, 
        email: session.email 
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { name } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Update user name
    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: { name: name.trim() },
    });

    // Re-create session with new name
    const token = await createSession({
      userId: updated.id,
      name: updated.name,
      email: updated.email,
    });
    await setSessionCookie(token);

    return NextResponse.json(
      { 
        userId: updated.id, 
        name: updated.name, 
        email: updated.email,
        message: "Profile updated"
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}