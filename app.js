/**
 * Dream Factory Growth Programs — interactive catalog
 * 프로그램을 키트에 담아 필요할 때 꺼내 쓰는 운영 앱
 */
(function () {
  "use strict";

  const DF = window.DREAM_FACTORY;
  if (!DF) {
    console.error("DREAM_FACTORY data missing. Load data/programs.js first.");
    return;
  }

  const STORAGE_KEY = "dreamfactory.kit.v1";
  const state = {
    kit: loadKit(),
    audience: "all",
    path: "all",
    query: "",
    onlyKit: false,
    activeProgramId: null,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function loadKit() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ids = raw ? JSON.parse(raw) : [];
      return Array.isArray(ids) ? ids.filter((id) => DF.programs.some((p) => p.id === id)) : [];
    } catch {
      return [];
    }
  }

  function saveKit() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.kit));
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2200);
  }

  function programById(id) {
    return DF.programs.find((p) => p.id === id);
  }

  function isInKit(id) {
    return state.kit.includes(id);
  }

  function toggleKit(id) {
    if (isInKit(id)) {
      state.kit = state.kit.filter((x) => x !== id);
      toast("키트에서 제거했습니다.");
    } else {
      state.kit = [...state.kit, id];
      toast("키트에 담았습니다.");
    }
    saveKit();
    renderKit();
    renderCards();
    syncDrawerKitButton();
  }

  function clearKit() {
    if (!state.kit.length) return;
    state.kit = [];
    saveKit();
    renderKit();
    renderCards();
    toast("키트를 비웠습니다.");
  }

  function audienceLabel(id) {
    return DF.audiences.find((a) => a.id === id)?.label || id;
  }

  function metricTitle(id) {
    return DF.metrics.find((m) => m.id === id)?.title || id;
  }

  function matchesFilters(p) {
    if (state.onlyKit && !isInKit(p.id)) return false;

    if (state.audience !== "all") {
      if (p.internal && state.audience !== "internal") {
        // teacher program only when all or internal filter — keep visible for "all"
      }
      if (!p.internal && !p.audiences.includes(state.audience)) return false;
      if (p.internal && state.audience !== "all") return false;
    }

    if (state.path !== "all") {
      if (!p.pathTypes || !p.pathTypes.includes(state.path)) return false;
    }

    if (state.query.trim()) {
      const q = state.query.trim().toLowerCase();
      const blob = [
        p.titleKo,
        p.titleEn,
        p.overview,
        ...(p.goals || []),
        ...(p.activities || []),
        ...(p.outcomes || []),
        ...(p.campExamples || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!blob.includes(q)) return false;
    }

    return true;
  }

  function buildBrief(p, compact = false) {
    const lines = [
      `[${p.num}] ${p.titleKo} (${p.titleEn})`,
      "",
      "■ 개요",
      p.overview,
      "",
      "■ 핵심 목표",
      ...p.goals.map((g) => `· ${g}`),
      "",
      "■ 주요 내용",
      ...p.activities.map((a) => `· ${a}`),
      "",
      "■ 기대 결과물",
      ...p.outcomes.map((o) => `· ${o}`),
    ];

    if (p.levels) {
      lines.push("", "■ 수준별 구성");
      lines.push(`· 초급: ${p.levels.beginner}`);
      lines.push(`· 중급: ${p.levels.intermediate}`);
      lines.push(`· 고급: ${p.levels.advanced}`);
    }

    if (p.campExamples?.length) {
      lines.push("", "■ 캠프 예시");
      p.campExamples.forEach((c) => lines.push(`· ${c}`));
    }

    if (!compact) {
      lines.push(
        "",
        "■ 성장 축",
        `· ${(p.metrics || []).map(metricTitle).join(", ") || "—"}`,
        "",
        "■ 추천 대상",
        `· ${(p.audiences || []).map(audienceLabel).join(", ") || (p.internal ? "교사·내부" : "—")}`
      );
    }

    return lines.join("\n");
  }

  function buildKitBrief() {
    if (!state.kit.length) return "키트가 비어 있습니다.";
    const header = [
      "드림팩토리 성장 키트 브리프",
      DF.meta.tagline,
      `생성: ${new Date().toLocaleString("ko-KR")}`,
      "────────────────────────────────",
      "",
    ].join("\n");

    const body = state.kit
      .map((id) => buildBrief(programById(id), true))
      .join("\n\n────────────────────────────────\n\n");

    const footer = [
      "",
      "────────────────────────────────",
      "성장 모델: 진단 → 설계 → 훈련 → 피드백 → 증명",
      DF.meta.definition,
    ].join("\n");

    return header + body + footer;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("클립보드에 복사했습니다.");
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast("클립보드에 복사했습니다.");
    }
  }

  /* ── Render static sections ── */

  function renderHero() {
    $("#heroTagline").textContent = DF.meta.tagline;
    $("#heroIntro").textContent = DF.meta.intro[0];
    const slogans = DF.meta.slogans.slice(0, 4);
    $("#sloganRow").innerHTML = slogans.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  }

  function renderModel() {
    $("#modelTrack").innerHTML = DF.growthModel
      .map(
        (m) => `
      <li>
        <span class="step-num">${m.step}</span>
        <h3>${escapeHtml(m.title)}</h3>
        <span class="en">${escapeHtml(m.en)}</span>
        <p>${escapeHtml(m.body)}</p>
      </li>`
      )
      .join("");
  }

  function renderAudienceChips() {
    const chips = [
      { id: "all", label: "전체 대상" },
      ...DF.audiences.map((a) => ({ id: a.id, label: a.label })),
    ];
    $("#audienceChips").innerHTML = chips
      .map(
        (c) =>
          `<button type="button" class="chip${c.id === state.audience ? " active" : ""}" data-audience="${c.id}">${escapeHtml(c.label)}</button>`
      )
      .join("");
  }

  function renderAudienceGrid() {
    $("#audienceGrid").innerHTML = DF.audiences
      .map((a) => {
        const tags = a.programs
          .map((id) => programById(id))
          .filter(Boolean)
          .map((p) => `<span>${escapeHtml(p.titleEn)}</span>`)
          .join("");
        return `
        <article class="audience-card">
          <h3>${escapeHtml(a.label)}</h3>
          <p class="focus">${escapeHtml(a.focus)}</p>
          <p>${escapeHtml(a.note)}</p>
          <div class="tags">${tags}</div>
        </article>`;
      })
      .join("");
  }

  function renderModes() {
    $("#modeGrid").innerHTML = DF.operatingModes
      .map(
        (m) => `
      <article class="mode-card">
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.body)}</p>
      </article>`
      )
      .join("");
  }

  function renderMetrics() {
    $("#metricGrid").innerHTML = DF.metrics
      .map(
        (m) => `
      <article class="metric-card">
        <h3>${escapeHtml(m.title)}</h3>
        <p>${escapeHtml(m.body)}</p>
      </article>`
      )
      .join("");
  }

  function renderPriorities() {
    $("#priorityList").innerHTML = DF.priorities.map((p) => `<li>${escapeHtml(p)}</li>`).join("");
    $("#definitionBlock").textContent = DF.meta.definition;
  }

  function renderCards() {
    const grid = $("#programGrid");
    const visible = DF.programs.filter(matchesFilters);

    grid.innerHTML = DF.programs
      .map((p) => {
        const hidden = !matchesFilters(p);
        const inKit = isInKit(p.id);
        const badges = [];
        if (p.priority) badges.push('<span class="badge flag">대표</span>');
        if (p.internal) badges.push('<span class="badge internal">내부</span>');
        if (p.category === "flagship") badges.push('<span class="badge flag">Flagship</span>');

        return `
        <article
          class="program-card${hidden ? " hidden" : ""}${inKit ? " in-kit" : ""}"
          data-id="${p.id}"
          style="--accent: ${p.accent}"
          tabindex="0"
          role="button"
          aria-label="${escapeHtml(p.titleKo)} 상세 보기"
        >
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${p.icon}</span>
            <div class="card-badges">${badges.join("")}</div>
          </div>
          <h3>${escapeHtml(p.titleKo)}</h3>
          <p class="en-title">${escapeHtml(p.titleEn)}</p>
          <p class="overview">${escapeHtml(p.overview)}</p>
          <div class="card-foot">
            <span class="num">${String(p.num).padStart(2, "0")}</span>
            <button type="button" class="kit-btn${inKit ? " on" : ""}" data-kit="${p.id}">
              ${inKit ? "키트에 담김" : "키트에 담기"}
            </button>
          </div>
        </article>`;
      })
      .join("");

    $("#resultCount").textContent = `${visible.length}개 표시 · 전체 ${DF.programs.length}`;
  }

  function renderKit() {
    const list = $("#kitList");
    const empty = $("#kitEmpty");
    $("#kitCount").textContent = `(${state.kit.length})`;

    if (!state.kit.length) {
      list.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    list.innerHTML = state.kit
      .map((id) => {
        const p = programById(id);
        if (!p) return "";
        return `
        <li>
          <div>
            <strong>${p.icon} ${escapeHtml(p.titleKo)}</strong>
            <small>${escapeHtml(p.titleEn)}</small>
          </div>
          <button type="button" data-remove="${p.id}">제거</button>
        </li>`;
      })
      .join("");
  }

  /* ── Drawer ── */

  function openDrawer(id) {
    const p = programById(id);
    if (!p) return;
    state.activeProgramId = id;

    $("#drawerEn").textContent = p.titleEn;
    $("#drawerTitle").textContent = p.titleKo;

    let levelsHtml = "";
    if (p.levels) {
      levelsHtml = `
        <h3>수준별 구성</h3>
        <div class="level-box">
          <div><strong>초급</strong>${escapeHtml(p.levels.beginner)}</div>
          <div><strong>중급</strong>${escapeHtml(p.levels.intermediate)}</div>
          <div><strong>고급</strong>${escapeHtml(p.levels.advanced)}</div>
        </div>`;
    }

    let campHtml = "";
    if (p.campExamples?.length) {
      campHtml = `
        <h3>캠프 예시</h3>
        <ul>${p.campExamples.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
    }

    const tags = [
      ...(p.pathTypes || []),
      ...(p.audiences || []).map(audienceLabel),
      ...(p.metrics || []).map(metricTitle),
    ];

    $("#drawerBody").innerHTML = `
      <h3>개요</h3>
      <p>${escapeHtml(p.overview)}</p>
      <div class="drawer-tags">${tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      <h3>핵심 목표</h3>
      <ul>${p.goals.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ul>
      <h3>주요 내용</h3>
      <ul>${p.activities.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
      <h3>기대 결과물</h3>
      <ul>${p.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
      ${levelsHtml}
      ${campHtml}
    `;

    syncDrawerKitButton();
    $("#drawer").hidden = false;
    $("#drawerBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
    $("#drawerClose").focus();
  }

  function closeDrawer() {
    state.activeProgramId = null;
    $("#drawer").hidden = true;
    $("#drawerBackdrop").hidden = true;
    document.body.style.overflow = "";
  }

  function syncDrawerKitButton() {
    const btn = $("#drawerKit");
    if (!state.activeProgramId) return;
    const on = isInKit(state.activeProgramId);
    btn.textContent = on ? "키트에서 제거" : "키트에 담기";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── Events ── */

  function bindEvents() {
    $("#audienceChips").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-audience]");
      if (!btn) return;
      state.audience = btn.dataset.audience;
      $$("#audienceChips .chip").forEach((c) => c.classList.toggle("active", c === btn));
      renderCards();
    });

    $("#pathChips").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-path]");
      if (!btn) return;
      state.path = btn.dataset.path;
      $$("#pathChips .chip").forEach((c) => c.classList.toggle("active", c === btn));
      renderCards();
    });

    $("#searchInput").addEventListener("input", (e) => {
      state.query = e.target.value;
      renderCards();
    });

    $("#onlyKit").addEventListener("change", (e) => {
      state.onlyKit = e.target.checked;
      renderCards();
    });

    $("#programGrid").addEventListener("click", (e) => {
      const kitBtn = e.target.closest("[data-kit]");
      if (kitBtn) {
        e.stopPropagation();
        toggleKit(kitBtn.dataset.kit);
        return;
      }
      const card = e.target.closest(".program-card");
      if (card) openDrawer(card.dataset.id);
    });

    $("#programGrid").addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".program-card");
      if (!card) return;
      e.preventDefault();
      openDrawer(card.dataset.id);
    });

    $("#kitList").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove]");
      if (!btn) return;
      toggleKit(btn.dataset.remove);
    });

    $("#btnClearKit").addEventListener("click", clearKit);
    $("#btnCopyKit").addEventListener("click", () => copyText(buildKitBrief()));
    $("#btnExportKit").addEventListener("click", () => copyText(buildKitBrief()));
    $("#btnOpenKit").addEventListener("click", () => {
      document.getElementById("kit").scrollIntoView({ behavior: "smooth" });
    });

    $("#drawerClose").addEventListener("click", closeDrawer);
    $("#drawerBackdrop").addEventListener("click", closeDrawer);
    $("#drawerCopy").addEventListener("click", () => {
      const p = programById(state.activeProgramId);
      if (p) copyText(buildBrief(p));
    });
    $("#drawerKit").addEventListener("click", () => {
      if (state.activeProgramId) toggleKit(state.activeProgramId);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#drawer").hidden) closeDrawer();
    });
  }

  function init() {
    renderHero();
    renderModel();
    renderAudienceChips();
    renderAudienceGrid();
    renderModes();
    renderMetrics();
    renderPriorities();
    renderCards();
    renderKit();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
