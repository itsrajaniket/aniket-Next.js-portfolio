import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        {/* Glitch 404 */}
        <h1 
          className="text-8xl font-black font-display text-transparent"
          style={{ WebkitTextStroke: "2px rgba(167, 139, 250, 0.4)" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-bold text-main">Page Not Found</h2>
        <p className="text-muted">
          Looks like this page drifted into the void. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 glass border border-surfaceBorder/10 text-main font-bold rounded-xl hover:border-accent hover:text-accent transition-all"
        >
          <i className="fas fa-home" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
