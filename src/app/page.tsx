import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="px-6 py-24 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6 leading-tight">
            You have something powerful inside you.
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 mb-10 leading-relaxed">
            Let&apos;s find it — and put it to work.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Start your discovery
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-16 bg-primary/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-primary mb-4">Why this exists</h2>
          <p className="text-charcoal/80 leading-relaxed">
            Most of us have gifts we don&apos;t even know about. Hidden strengths,
            latent talents, things that come naturally to us but feel ordinary.
            We believe everyone deserves to discover what&apos;s already inside them —
            and find real ways to use it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-charcoal/70 mb-6">Free to start. No credit card required.</p>
          <Link
            href="/signup"
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Take the first step →
          </Link>
        </div>
      </section>
    </main>
  );
}