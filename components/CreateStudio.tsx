"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const ratios = ["1:1", "4:5", "16:9", "3:2"] as const;
const looks = ["Editorial", "Nocturne", "Porcelain", "Film still"] as const;

export function CreateStudio() {
  const params = useSearchParams();
  const initialMode = params.get("mode") === "3d" ? "3d" : "image";
  const [mode, setMode] = useState<"image" | "3d">(initialMode);
  const [prompt, setPrompt] = useState(
    "A quiet hotel corridor at blue hour, one door ajar, cinematic still, 50mm",
  );
  const [ratio, setRatio] = useState<(typeof ratios)[number]>("4:5");
  const [look, setLook] = useState<(typeof looks)[number]>("Film still");
  const [status, setStatus] = useState<"idle" | "rendering">("idle");

  const previewStyle = useMemo(
    () => ({
      background:
        mode === "3d"
          ? "radial-gradient(circle at 50% 42%, #f6f4f8, #d9d6de 70%)"
          : "radial-gradient(80% 70% at 70% 20%, rgba(139,108,255,0.55), transparent 55%), radial-gradient(60% 50% at 30% 80%, rgba(255,122,61,0.28), transparent 60%), linear-gradient(160deg,#1b1528,#08070d)",
    }),
    [mode],
  );

  function onGenerate(event: React.FormEvent) {
    event.preventDefault();
    setStatus("rendering");
    window.setTimeout(() => setStatus("idle"), 900);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">Studio</p>
          <h1 className="font-headline mt-2 text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
            Start creating
          </h1>
        </div>
        <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-sm">
          {(["image", "3d"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`rounded-full px-4 py-1.5 ${mode === value ? "bg-white text-ink" : "text-white/65"}`}
            >
              {value === "image" ? "Image" : "3D model"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <form onSubmit={onGenerate} className="bento-card rounded-[28px] p-6">
          <label className="block text-sm text-white/70">
            Prompt
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={6}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-lavender/50"
            />
          </label>

          {mode === "image" ? (
            <>
              <fieldset className="mt-5">
                <legend className="text-sm text-white/70">Aspect</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ratios.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRatio(value)}
                      className={`rounded-full px-3 py-1.5 text-xs ${
                        ratio === value ? "bg-white text-ink" : "border border-white/10 text-white/70"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-5">
                <legend className="text-sm text-white/70">Look</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {looks.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setLook(value)}
                      className={`rounded-full px-3 py-1.5 text-xs ${
                        look === value ? "bg-white text-ink" : "border border-white/10 text-white/70"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          ) : (
            <p className="mt-5 text-sm leading-6 text-white/55">
              Image-to-mesh stays on a light gray stage. Orbit, then export OBJ or GLB.
            </p>
          )}

          <button type="submit" className="cta-orb mt-8 w-full rounded-full py-3 text-sm font-semibold text-white">
            {status === "rendering" ? "Rendering…" : mode === "3d" ? "Sculpt model" : "Generate still"}
          </button>
        </form>

        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-black/40">
          <div className="flex items-center justify-between px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
            <span>Preview</span>
            <span>{mode === "3d" ? "Mesh" : `${ratio} · ${look}`}</span>
          </div>
          <div className="grid min-h-[420px] place-items-center px-6 pb-6">
            <div
              className={`relative w-full max-w-md overflow-hidden rounded-[24px] ${
                mode === "image" && ratio === "16:9"
                  ? "aspect-video"
                  : mode === "image" && ratio === "1:1"
                    ? "aspect-square"
                    : "aspect-[4/5]"
              }`}
              style={previewStyle}
            >
              {mode === "3d" ? (
                <div className="grid h-full place-items-center">
                  <div className="wire-spin h-36 w-36">
                    <svg viewBox="0 0 160 160" className="h-full w-full" aria-hidden>
                      <ellipse cx="80" cy="80" rx="54" ry="20" fill="none" stroke="#8a8494" strokeWidth="1" />
                      <circle cx="80" cy="80" r="54" fill="none" stroke="#6f6878" strokeWidth="1.1" />
                      <path d="M80 26 L126 106 H34 Z" fill="none" stroke="#111018" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
              ) : (
                <p className="absolute inset-x-8 bottom-8 text-sm leading-6 text-white/70">{prompt}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
