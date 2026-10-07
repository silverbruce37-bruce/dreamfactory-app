"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const ratios = ["1:1", "4:5", "16:9", "3:2"] as const;
type Ratio = (typeof ratios)[number];

const looks = [
  { id: "편집", field: "#E6E8ED", paper: "#FFFFFF", ink: "#14171C", accent: "#14171C" },
  { id: "밤", field: "#14171C", paper: "#F7F8FA", ink: "#F7F8FA", accent: "#FFE14A" },
  { id: "하양", field: "#F7F6F3", paper: "#FFFFFF", ink: "#14171C", accent: "#E4DDD4" },
  { id: "영화", field: "#1B1916", paper: "#F6F3EC", ink: "#F6F3EC", accent: "#F0C36A" },
] as const;

type LookId = (typeof looks)[number]["id"];

const ratioBox: Record<Ratio, { w: number; h: number }> = {
  "1:1": { w: 22, h: 22 },
  "4:5": { w: 18, h: 22 },
  "16:9": { w: 28, h: 16 },
  "3:2": { w: 27, h: 18 },
};

function aspectClass(ratio: Ratio) {
  if (ratio === "1:1") return "aspect-square";
  if (ratio === "16:9") return "aspect-video";
  if (ratio === "3:2") return "aspect-[3/2]";
  return "aspect-[4/5]";
}

export function CreateStudio() {
  const params = useSearchParams();
  const [mode, setMode] = useState<"image" | "3d">("image");
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<Ratio>("4:5");
  const [lookId, setLookId] = useState<LookId>("편집");
  const [openTune, setOpenTune] = useState(false);
  const [made, setMade] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#models" || params.get("mode") === "3d") {
      setMode("3d");
    }
  }, [params]);

  useEffect(() => {
    const onHash = () => {
      setMode(window.location.hash === "#models" ? "3d" : "image");
      setMade(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function chooseMode(next: "image" | "3d") {
    setMode(next);
    setMade(false);
    window.history.replaceState(null, "", next === "3d" ? "/create#models" : "/create");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim()) {
      setMissing(true);
      document.getElementById("line")?.focus();
      return;
    }
    setMissing(false);
    setMade(true);
    const frame = document.getElementById("preview");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    frame?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    frame?.focus();
  }

  const look = looks.find((item) => item.id === lookId) ?? looks[0];
  const title = mode === "3d" ? "입체로 만들 장면을 적어 주세요." : "만들 장면을 적어 주세요.";

  return (
    <section id="models" className="mx-auto max-w-[1080px] px-5 pb-16 pt-2 md:px-8 md:pt-6">
      <h1 className="max-w-[12em] text-[32px] font-black leading-[1.3] tracking-[-0.045em] text-ink md:text-[40px]">
        {title}
      </h1>
      <button
        type="button"
        onClick={() => chooseMode(mode === "image" ? "3d" : "image")}
        className="mt-4 text-[15px] font-bold text-muted hover:text-ink"
      >
        {mode === "image" ? "입체로 만들기" : "그림으로 만들기"}
      </button>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <form onSubmit={onSubmit}>
          <label className="block" htmlFor="line">
            <span className="text-[13px] font-bold text-muted">한 줄</span>
            <textarea
              id="line"
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                setMade(false);
                if (event.target.value.trim()) setMissing(false);
              }}
              rows={4}
              placeholder="파란 시간, 호텔 복도, 문이 조금 열려 있다"
              aria-invalid={missing}
              autoComplete="off"
              spellCheck={false}
              className="mt-2 w-full resize-none rounded-[20px] bg-white px-4 py-4 text-[18px] leading-[1.55] tracking-[-0.02em] text-ink outline-none placeholder:text-[#626B76]"
            />
          </label>
          {missing ? (
            <p className="mt-2 text-[14px] font-bold text-clay" role="alert">
              한 줄을 적어 주세요.
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-5 flex h-14 w-full items-center justify-center rounded-2xl bg-ink text-[17px] font-bold tracking-[-0.02em] text-white hover:bg-black"
          >
            {made ? "만들었습니다" : "만들기"}
          </button>
          <p className="sr-only" role="status">
            {made ? "만들었습니다." : ""}
          </p>

          {mode === "image" ? (
            <div className="mt-3">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-between rounded-xl bg-white px-4 text-[14px] font-bold text-ink"
                aria-expanded={openTune}
                onClick={() => setOpenTune((value) => !value)}
              >
                <span>비율 · 결</span>
                <span className="text-muted">
                  {ratio} · {lookId}
                </span>
              </button>
              {openTune ? (
                <div className="mt-3 space-y-4">
                  <fieldset>
                    <legend className="text-[13px] font-bold text-muted">비율</legend>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {ratios.map((value) => {
                        const on = ratio === value;
                        const box = ratioBox[value];
                        return (
                          <button
                            key={value}
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              setRatio(value);
                              setMade(false);
                            }}
                            className={`flex flex-col items-center gap-2 rounded-xl py-3 text-[13px] font-bold ${
                              on ? "bg-ink text-white" : "bg-white text-ink"
                            }`}
                          >
                            <span
                              className={on ? "bg-white" : "bg-ink"}
                              style={{ width: box.w, height: box.h, borderRadius: 3 }}
                            />
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-[13px] font-bold text-muted">결</legend>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      {looks.map((item) => {
                        const on = lookId === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => {
                              setLookId(item.id);
                              setMade(false);
                            }}
                            className={`flex flex-col items-center gap-2 rounded-xl py-3 text-[13px] font-bold ${
                              on ? "bg-ink text-white" : "bg-white text-ink"
                            }`}
                          >
                            <span
                              className="block h-6 w-6 rounded-md"
                              style={{
                                background: item.field,
                                boxShadow: "inset 0 0 0 1px rgba(20,23,28,0.12)",
                              }}
                            />
                            {item.id}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-3 flex h-12 items-center justify-between rounded-xl bg-white px-4 text-[14px] font-bold">
              <span>파일</span>
              <span className="text-muted">OBJ · GLB</span>
            </div>
          )}
        </form>

        <div
          id="preview"
          tabIndex={-1}
          role="region"
          aria-label="미리보기"
          className="outline-none lg:sticky lg:top-8"
        >
          {mode === "3d" ? (
            <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-8 rounded-[24px] bg-[#E6E8ED] px-6 py-10">
              <div className="relative h-52 w-52 shrink-0" aria-hidden="true">
                <div className="absolute left-0 top-14 h-32 w-16 rounded-[20px] bg-[#C8CDD6]" />
                <div className="absolute left-10 top-0 h-14 w-32 rounded-[20px] bg-[#F4F6F8]" />
                <div className="absolute left-10 top-10 h-32 w-32 rounded-[22px] bg-white" />
              </div>
              {prompt.trim() ? (
                <p className="line-clamp-3 text-center text-[16px] font-bold leading-[1.45] tracking-[-0.03em] text-ink">
                  {prompt}
                </p>
              ) : null}
            </div>
          ) : (
            <div
              className={`relative w-full overflow-hidden rounded-[24px] ${aspectClass(ratio)}`}
              style={{ background: look.field }}
            >
              <div
                aria-hidden="true"
                className="absolute left-[8%] top-[8%] h-[26%] w-[32%] rounded-[16px]"
                style={{ background: look.paper }}
              />
              <div
                aria-hidden="true"
                className="absolute right-[8%] top-[20%] h-[20%] w-[24%] rounded-[16px]"
                style={{ background: look.accent }}
              />
              {prompt.trim() ? (
                <p
                  className="absolute inset-x-5 bottom-5 z-10 line-clamp-4 text-[16px] font-bold leading-[1.45] tracking-[-0.03em]"
                  style={{ color: look.ink }}
                >
                  {prompt}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
