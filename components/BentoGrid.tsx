const cards = [
  {
    id: "text-to-image",
    title: "Text to image",
    copy: "A single sentence becomes a still with depth, grain, and light that holds.",
    className: "md:col-span-7 md:row-span-2 min-h-[340px] md:min-h-[460px]",
    visual: "nebula",
  },
  {
    id: "styles",
    title: "Style library",
    copy: "Editorial, product, nocturne, and film looks — kept tight, never noisy.",
    className: "md:col-span-5 min-h-[210px]",
    visual: "chips",
  },
  {
    id: "variations",
    title: "Quiet variations",
    copy: "Explore nearby frames without losing the first idea.",
    className: "md:col-span-5 min-h-[210px]",
    visual: "tiles",
  },
  {
    id: "inpaint",
    title: "Inpaint",
    copy: "Rewrite only the part that needs another chance.",
    className: "md:col-span-4 min-h-[220px]",
    visual: "mask",
  },
  {
    id: "upscale",
    title: "Cinematic upscale",
    copy: "Hold detail at print scale. Soft edges stay soft.",
    className: "md:col-span-8 min-h-[220px]",
    visual: "wide",
  },
];

function Visual({ kind }: { kind: string }) {
  if (kind === "nebula") {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_78%_18%,rgba(168,130,255,0.55),transparent_58%),radial-gradient(50%_55%_at_20%_88%,rgba(255,122,61,0.28),transparent_58%),linear-gradient(160deg,#241833,#0c0a12)]" />
        <div className="absolute -right-6 bottom-[-10%] h-56 w-56 rounded-full bg-pink/25 blur-3xl" />
        <div className="absolute bottom-7 right-7 h-36 w-28 rounded-[22px] border border-white/15 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]" />
        <div className="absolute bottom-16 right-16 h-36 w-28 rotate-6 rounded-[22px] border border-white/10 bg-gradient-to-br from-lavender/40 to-violet/20" />
      </div>
    );
  }

  if (kind === "chips") {
    return (
      <div className="absolute inset-x-6 bottom-6 flex flex-wrap gap-2">
        {["Nocturne", "Editorial", "35mm", "Porcelain"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.16em] text-white/70"
          >
            {label}
          </span>
        ))}
      </div>
    );
  }

  if (kind === "tiles") {
    return (
      <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="h-12 w-12 rounded-xl border border-white/10"
            style={{
              background: `linear-gradient(145deg, rgba(216,200,255,${0.18 + item * 0.12}), rgba(16,12,24,0.8))`,
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "mask") {
    return (
      <div className="absolute bottom-6 right-6 h-20 w-28 overflow-hidden rounded-2xl border border-white/10">
        <div className="h-full w-full bg-gradient-to-br from-violet/50 to-ink" />
        <div className="absolute inset-4 rounded-full border border-dashed border-white/50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-r from-violet/20 via-pink/20 to-ember/20" />
  );
}

export function BentoGrid() {
  return (
    <section id="features" className="relative bg-ink px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-lavender/70">The studio</p>
          <h2 className="font-headline mt-3 text-[clamp(2rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.04em] text-white">
            A quieter way to generate.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/55">
            Built as an editorial instrument, not a slot machine. Every surface stays dark, glassy, and a little violet at the edges.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {cards.map((card) => (
            <article
              key={card.id}
              className={`bento-card relative overflow-hidden rounded-[28px] p-6 md:p-7 ${card.className}`}
            >
              <Visual kind={card.visual} />
              <div className="relative z-10 max-w-sm">
                <h3 className="font-headline text-xl font-semibold tracking-[-0.03em] text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{card.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
