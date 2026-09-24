import Link from "next/link";

export function ModelCreator() {
  return (
    <section id="models" className="bg-mist px-4 py-20 text-ink md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40">
              3D Model Creator
            </p>
            <h2 className="font-headline mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              From one still,
              <br />
              a form you can orbit.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-black/55">
              DreamFrame sculpts a clean mesh from a generated frame. No center spectacle — just proportion, silhouette, and light on gray.
            </p>
            <Link
              href="/create?mode=3d"
              className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
            >
              Create a 3D model
            </Link>
          </div>

          <div className="studio-window overflow-hidden rounded-[28px] border border-black/5">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9d6dc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9d6dc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d9d6dc]" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-black/35">Viewport · Studio</p>
              <p className="text-[11px] text-black/30">OBJ · GLB</p>
            </div>

            <div className="grid min-h-[320px] grid-cols-1 bg-[#eceaee] md:min-h-[360px] md:grid-cols-[52px_1fr_148px]">
              <aside className="hidden flex-col items-center gap-3 border-r border-black/5 py-5 text-[10px] uppercase tracking-[0.16em] text-black/35 md:flex">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm">Or</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl">Mv</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl">Lt</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl">Sh</span>
              </aside>

              <div className="relative grid min-h-[280px] place-items-center">
                <div className="wire-spin h-44 w-44">
                  <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
                    <ellipse cx="80" cy="80" rx="54" ry="20" fill="none" stroke="#5c5666" strokeWidth="1.2" />
                    <ellipse cx="80" cy="80" rx="20" ry="54" fill="none" stroke="#5c5666" strokeWidth="1.2" />
                    <circle cx="80" cy="80" r="54" fill="none" stroke="#2b2733" strokeWidth="1.35" />
                    <path d="M80 26 L126 106 H34 Z" fill="none" stroke="#111018" strokeWidth="1.4" />
                    <circle cx="80" cy="80" r="3" fill="#111018" />
                  </svg>
                </div>
              </div>

              <aside className="hidden space-y-4 border-l border-black/5 p-4 text-[11px] text-black/45 md:block">
                <div>
                  <p className="uppercase tracking-[0.16em] text-black/30">Form</p>
                  <p className="mt-1 text-ink">Wire sculpture</p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.16em] text-black/30">Light</p>
                  <p className="mt-1">Soft north</p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.16em] text-black/30">Scale</p>
                  <p className="mt-1">1.00</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
