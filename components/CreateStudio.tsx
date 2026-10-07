"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const ratios = ["1:1", "4:5", "16:9", "3:2"] as const;
const looks = ["Editorial", "Nocturne", "Porcelain", "Film still"] as const;
type Ratio = (typeof ratios)[number];
type Look = (typeof looks)[number];
type Tool = "image" | "styles" | "variations" | "inpaint" | "upscale";

const lookFrames: Record<Look, { background: string; ink: string }> = {
  Editorial: {
    background: "linear-gradient(165deg,#1a1816 0%,#3c342c 42%,#c9bfb2 100%)",
    ink: "rgba(255,255,255,0.86)",
  },
  Nocturne: {
    background:
      "radial-gradient(70% 60% at 30% 20%, rgba(90,110,180,0.45), transparent 60%), linear-gradient(165deg,#070814,#12182c)",
    ink: "rgba(236,240,255,0.82)",
  },
  Porcelain: {
    background: "linear-gradient(180deg,#f7f4ef,#ddd6cc)",
    ink: "rgba(20,16,24,0.78)",
  },
  "Film still": {
    background:
      "radial-gradient(80% 70% at 70% 20%, rgba(139,108,255,0.55), transparent 55%), radial-gradient(60% 50% at 30% 80%, rgba(255,122,61,0.28), transparent 60%), linear-gradient(160deg,#1b1528,#08070d)",
    ink: "rgba(255,255,255,0.82)",
  },
};

const nearby = [
  { id: "closer", label: "Closer", ratio: "4:5", look: "Film still" },
  { id: "quieter", label: "Quieter", ratio: "4:5", look: "Nocturne" },
  { id: "wider", label: "Wider", ratio: "16:9", look: "Editorial" },
] as const satisfies ReadonlyArray<{ id: string; label: string; ratio: Ratio; look: Look }>;

export function CreateStudio() {
  const params = useSearchParams();
  const initialMode = params.get("mode") === "3d" ? "3d" : "image";
  const [mode, setMode] = useState<"image" | "3d">(initialMode);
  const [tool, setTool] = useState<Tool>("image");
  const [prompt, setPrompt] = useState(
    "A quiet hotel corridor at blue hour, one door ajar, cinematic still, 50mm",
  );
  const [ratio, setRatio] = useState<Ratio>("4:5");
  const [look, setLook] = useState<Look>("Film still");
  const [scale, setScale] = useState<1 | 2>(1);
  const [part, setPart] = useState("one door ajar");
  const [rewrite, setRewrite] = useState("one lamp still lit");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "rendering" | "ready">("idle");

  const frame = lookFrames[look];
  const previewStyle = useMemo(
    () => ({
      background:
        mode === "3d" ? "radial-gradient(circle at 50% 42%, #f6f4f8, #d9d6de 70%)" : frame.background,
    }),
    [mode, frame.background],
  );

  useEffect(() => {
    function syncTool() {
      const hash = window.location.hash;
      if (hash === "#styles") setTool("styles");
      else if (hash === "#variations") setTool("variations");
      else if (hash === "#inpaint") setTool("inpaint");
      else if (hash === "#upscale") {
        setTool("upscale");
        setScale(2);
      } else if (hash === "") {
        setTool("image");
      }
    }
    syncTool();
    window.addEventListener("hashchange", syncTool);
    return () => window.removeEventListener("hashchange", syncTool);
  }, []);

  useEffect(() => {
    if (tool === "image") return;
    const node = document.getElementById(tool);
    const target = node?.querySelector("legend, p") ?? node;
    if (!target) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    root.style.scrollBehavior = previous;
  }, [tool]);

  function markIdle() {
    setStatus("idle");
    setNote("");
  }

  function onGenerate(event: React.FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) {
      setNote("Write one line first.");
      return;
    }
    setNote("");
    setStatus("rendering");
    window.setTimeout(() => setStatus("ready"), 600);
  }

  function applyRewrite() {
    const from = part.trim();
    const to = rewrite.trim();
    if (!from || !to) {
      setNote("Name the part, then the new words.");
      return;
    }
    if (!prompt.includes(from)) {
      setNote("That part is not in the line.");
      return;
    }
    setPrompt((current) => current.replace(from, to));
    setNote("");
    setStatus("idle");
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
              onChange={(event) => {
                setPrompt(event.target.value);
                markIdle();
              }}
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
                      onClick={() => {
                        setRatio(value);
                        markIdle();
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs ${
                        ratio === value ? "bg-white text-ink" : "border border-white/10 text-white/70"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset id="styles" className="mt-5 scroll-mt-28">
                <legend className="text-sm text-white/70">Look</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {looks.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setLook(value);
                        markIdle();
                      }}
                      className={`rounded-full px-3 py-1.5 text-xs ${
                        look === value ? "bg-white text-ink" : "border border-white/10 text-white/70"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>

              {tool === "variations" ? (
                <fieldset id="variations" className="mt-5 scroll-mt-28">
                  <legend className="text-sm text-white/70">Nearby frames</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {nearby.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setRatio(item.ratio);
                          setLook(item.look);
                          markIdle();
                        }}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {tool === "inpaint" ? (
                <div id="inpaint" className="mt-5 scroll-mt-28">
                  <p className="text-sm text-white/70">Rewrite one part</p>
                  <label className="mt-2 block text-xs text-white/45">
                    Part in the line
                    <input
                      value={part}
                      onChange={(event) => setPart(event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
                    />
                  </label>
                  <label className="mt-3 block text-xs text-white/45">
                    New words
                    <input
                      value={rewrite}
                      onChange={(event) => setRewrite(event.target.value)}
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={applyRewrite}
                    className="mt-3 rounded-full border border-white/15 px-4 py-2 text-xs text-white"
                  >
                    Rewrite part
                  </button>
                </div>
              ) : null}

              {tool === "upscale" ? (
                <fieldset id="upscale" className="mt-5 scroll-mt-28">
                  <legend className="text-sm text-white/70">Scale</legend>
                  <div className="mt-2 flex gap-2">
                    {([1, 2] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setScale(value);
                          markIdle();
                        }}
                        className={`rounded-full px-3 py-1.5 text-xs ${
                          scale === value ? "bg-white text-ink" : "border border-white/10 text-white/70"
                        }`}
                      >
                        {value}×
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}
            </>
          ) : (
            <p className="mt-5 text-sm leading-6 text-white/55">
              Image-to-mesh stays on a light gray stage. Orbit, then export OBJ or GLB.
            </p>
          )}

          {note ? <p className="mt-4 text-sm text-white/70">{note}</p> : null}
          <button type="submit" className="cta-orb mt-8 w-full rounded-full py-3 text-sm font-semibold text-white">
            {status === "rendering" ? "Rendering…" : status === "ready" ? "Still ready" : mode === "3d" ? "Sculpt model" : "Generate still"}
          </button>
        </form>

        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-black/40">
          <div className="flex items-center justify-between px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
            <span>Preview</span>
            <span>{mode === "3d" ? "Mesh" : `${ratio} · ${look}${scale === 2 ? " · 2×" : ""}`}</span>
          </div>
          <div className="grid min-h-[420px] place-items-center px-6 pb-6">
            <div
              className={`relative w-full overflow-hidden rounded-[24px] ${
                scale === 2 ? "max-w-2xl" : "max-w-md"
              } ${
                mode !== "3d" && ratio === "16:9"
                  ? "aspect-video"
                  : mode !== "3d" && ratio === "1:1"
                    ? "aspect-square"
                    : mode !== "3d" && ratio === "3:2"
                      ? "aspect-[3/2]"
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
                <>
                  {status === "ready" ? (
                    <p className="absolute left-8 top-8 text-[11px] uppercase tracking-[0.18em]" style={{ color: frame.ink }}>
                      Ready
                    </p>
                  ) : null}
                  <p className="absolute inset-x-8 bottom-8 text-sm leading-6" style={{ color: frame.ink }}>
                    {prompt}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
