import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStats } from "@/lib/analytics";

export async function GET() {
  try {
    const session = await getSession();
    
    // Only allow access if authenticated
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const stats = await getStats();
    
    return NextResponse.json(stats, { status: 200 });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}