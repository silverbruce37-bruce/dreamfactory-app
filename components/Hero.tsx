import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <div className="hero-aurora absolute inset-0" />
      <div className="hero-veil absolute inset-0" />
      <div className="grain" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[92vw] flex-col justify-between pb-[min(8vh,72px)] pt-28 md:pt-32">
        <div className="max-w-xl pl-1 md:pl-2">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
            <span className="avail-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Image Generator
          </p>

          <h1 className="font-headline headline-gradient text-[clamp(2.4rem,5.6vw,5.1rem)] font-extrabold leading-[0.96] tracking-[-0.045em]">
            Create images
            <br />
            that feel inevitable.
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-7 text-white/68 md:text-base">
            DreamFrame turns a quiet line of intent into cinematic stills — editorial, product, and film-grade frames with a darkroom’s restraint.
          </p>

          <div className="mt-8">
            <Link
              href="/create"
              className="cta-orb inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Start Creating
            </Link>
          </div>
        </div>

        <h2
          aria-hidden
          className="brand-wordmark font-display mx-auto w-[90vw] text-center text-[clamp(3.4rem,14.5vw,13.5rem)] font-medium leading-[0.78] tracking-[-0.04em]"
        >
          DREAMFRAME
        </h2>
      </div>
    </section>
  );
}
