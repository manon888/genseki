import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-primary mb-2">Your SparkFun</h1>
          <p className="text-charcoal/70">Your journey starts here.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal/10">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl font-serif text-primary mb-2">Your gifts</h2>
            <p className="text-charcoal/70 text-sm">
              Discovery results will appear here after you complete the journey.
            </p>
          </div>

          <div className="border-t border-charcoal/10 pt-6">
            <Link
              href="/discovery"
              className="block w-full bg-accent text-white px-6 py-4 rounded-full text-center font-medium hover:bg-accent/90 transition-colors"
            >
              {">"} Take the discovery journey
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-charcoal/50 hover:text-charcoal/70 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}