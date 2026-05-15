import InfiniteGallery from '@/components/ui/3d-gallery-photography';
import { reputationImages } from './gallery-images';

export default function App() {
  return (
    <main className="relative min-h-screen w-full bg-midnight">
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 md:px-8 bg-gradient-to-b from-[#050712ee] to-transparent">
        <a
          href="../index.html#hero"
          className="font-display text-sm font-semibold tracking-wide text-white hover:text-cyan transition-colors"
        >
          ← Neha Kumari
        </a>
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">Reputation</span>
      </header>

      <InfiniteGallery
        images={reputationImages}
        speed={1.1}
        visibleCount={8}
        className="h-screen w-full"
      />

      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-4 text-center mix-blend-exclusion">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white md:text-6xl">
          <span className="italic font-normal">Said the Least;</span> Did the Most.
        </h1>
      </div>

      <div className="fixed bottom-8 left-0 right-0 z-20 text-center font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
        <p>Ain't no problem when I'm the Equation.</p>
        <p className="opacity-60">Prescence noted, Observation.</p>
      </div>
    </main>
  );
}
