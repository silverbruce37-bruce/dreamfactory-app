const rowOne = ["FLUX", "RUNWAY", "STABILITY", "OPENAI", "ADOBE", "LEONARDO", "IDEOGRAM", "RECRAFT"];
const rowTwo = ["KLING", "LUMA", "PIKA", "HAILUO", "MIDJOURNEY", "FIREFLY", "MAGNIFIC", "TRIPO"];

function Track({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const sequence = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden">
      <div className={`logo-track flex items-center gap-10 pr-10 ${reverse ? "reverse" : ""}`}>
        {sequence.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="whitespace-nowrap font-headline text-[13px] font-semibold tracking-[0.28em] text-white/38 md:text-sm"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoCarousel() {
  return (
    <section className="relative overflow-hidden bg-ink pb-8 pt-4 md:pb-10" aria-label="Creative tools in conversation">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.28em] text-white/35">
        In conversation with the tools you already use
      </p>
      <div className="space-y-5">
        <Track items={rowOne} />
        <Track items={rowTwo} reverse />
      </div>
    </section>
  );
}
