import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch user's discovery results
  const discovery = await prisma.discoveryResponse.findUnique({
    where: { user_id: session.userId },
  });

  const hasDiscovery = discovery?.gift_profile;
  const gifts = discovery?.gift_profile
    ? discovery.gift_profile.split(/\n\n|\n/).filter(Boolean)
    : [];
  const responses = discovery?.responses ? JSON.parse(discovery.responses) : null;

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-primary mb-2">
            Your Genseki, {session.name.split(" ")[0]}
          </h1>
          <p className="text-charcoal/70">Your journey starts here.</p>
        </div>

        {hasDiscovery ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">✨</div>
              <h2 className="text-xl font-serif text-primary mb-2">Your gifts</h2>
              <p className="text-charcoal/70 text-sm">
                Here&apos;s what we found in your discovery journey.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {gifts.map((gift, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-1">✦</span>
                  <p className="text-charcoal/80">{gift}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-charcoal/10 pt-6">
              <Link
                href="/discovery"
                className="block w-full text-center text-primary font-medium hover:text-primary/80 transition-colors py-3"
              >
                Replay the discovery journey
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🧭</div>
              <h2 className="text-xl font-serif text-primary mb-2">Your gifts await</h2>
              <p className="text-charcoal/70 text-sm">
                Take the discovery journey to find out what makes you unique.
              </p>
            </div>

            <div className="border-t border-charcoal/10 pt-6">
              <Link
                href="/discovery"
                className="block w-full bg-accent text-white px-6 py-4 rounded-full text-center font-medium hover:bg-accent/90 transition-colors"
              >
                Take the discovery journey →
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          <Link
            href="/"
            className="text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
          >
            ← Back to home
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}