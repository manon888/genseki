import { prisma } from "@/lib/prisma";

export type AnalyticsEvent = 
  | "signup"
  | "login"
  | "discovery_started"
  | "discovery_completed"
  | "ai_success"
  | "ai_failed"
  | "profile_updated";

export async function trackEvent(
  event: AnalyticsEvent,
  options?: {
    userId?: string;
    metadata?: Record<string, unknown>;
  }
) {
  try {
    await prisma.analytics.create({
      data: {
        event,
        user_id: options?.userId,
        metadata: options?.metadata ? JSON.stringify(options.metadata) : null,
      },
    });
  } catch (err) {
    // Silently fail - analytics should never break the app
    console.error("[Analytics] Failed to track event:", err);
  }
}

export async function getStats() {
  const [totalUsers, totalDiscoveries, aiSuccesses, aiFailures, recentEvents] = 
    await Promise.all([
      prisma.user.count(),
      prisma.discoveryResponse.count(),
      prisma.analytics.count({ where: { event: "ai_success" } }),
      prisma.analytics.count({ where: { event: "ai_failed" } }),
      prisma.analytics.findMany({
        orderBy: { created_at: "desc" },
        take: 20,
      }),
    ]);

  const discoveriesWithGifts = await prisma.discoveryResponse.count({
    where: {
      gift_profile: {
        not: null,
      },
    },
  });

  return {
    totalUsers,
    totalDiscoveries,
    discoveriesWithGifts,
    aiSuccesses,
    aiFailures,
    aiSuccessRate: aiSuccesses + aiFailures > 0 
      ? Math.round((aiSuccesses / (aiSuccesses + aiFailures)) * 100) 
      : 0,
    recentEvents,
  };
}