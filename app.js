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
  const LANG_STORAGE_KEY = "dreamfactory.lang.v1";
  const LANGS = ["ko", "en"];

  const ui = {
    ko: {
      docTitle: "드림팩토리 · Dream Factory Growth Programs",
      description:
        "드림팩토리 통합 성장 프로그램 — 아이캔 이중언어, AI 학습력, 글로벌 언어, 창의 프로젝트, 인성, 진로 로드맵을 한 시스템으로.",
      brandName: "드림팩토리",
      brandSub: "Dream Factory Growth Programs",
      navLabel: "주요 메뉴",
      nav: {
        programs: "프로그램",
        model: "성장 모델",
        audience: "대상별",
        ican: "이중언어",
        eduspace: "우주인",
        kit: "꺼내쓰기",
        metrics: "성과",
      },
      buttons: {
        exportKit: "키트 복사",
        exportKitTitle: "선택한 프로그램 브리프 복사",
        openKit: "내 키트",
        heroPrograms: "프로그램 보기",
        heroKit: "필요할 때 꺼내 쓰기",
        clearKit: "비우기",
        copyBrief: "브리프 복사",
        drawerCopy: "상세 브리프 복사",
        drawerAdd: "키트에 담기",
        drawerRemove: "키트에서 제거",
        cardAdd: "키트에 담기",
        cardAdded: "키트에 담김",
        remove: "제거",
        close: "닫기",
        loadPreset: "키트에 담기",
        loadPresetReplace: "이 키트로 교체",
        copyPresetBrief: "키트 브리프 복사",
      },
      hero: {
        eyebrow: "iCAN · 통합 성장 플랫폼",
        tagline: DF.meta.tagline,
        intro: DF.meta.intro[0],
        panelLabel: "하나의 시스템",
        panelTitle: "진단 → 설계 → 훈련 → 피드백 → 증명",
        panelBody:
          "프로그램은 독립 과목이 아닙니다. 아이캔 진단이 서술·묘사와 설명·논증으로, 인풋코어가 발표와 글로벌 보이스로 이어집니다. 리딩·라이팅·북클럽·코딩·FutureLab·해외 인큐베이팅이 한 성장 여정으로 정리됩니다.",
        statPrograms: "성장 프로그램",
        statSteps: "성장 단계",
        statMetrics: "성과 축",
        statPaths: "성장 경로 유형",
        slogans: DF.meta.slogans,
      },
      sections: {
        modelTitle: "핵심 성장 모델 5단계",
        modelSubtitle: "모든 프로그램은 이 흐름으로 연결됩니다.",
        programsTitle: "프로그램 · 카드형 카탈로그",
        programsSubtitle: "카드를 눌러 상세를 보고, 키트에 담아 필요할 때 꺼내 쓰세요.",
        audienceTitle: "대상별 운영 방향",
        modesTitle: "운영 방식",
        metricsTitle: "성과 측정 6축",
        metricsSubtitle: "성적만이 아니라 여섯 영역을 함께 관찰합니다. 각 프로그램은 최소 하나 이상의 결과물을 남깁니다.",
        kitTitle: "성장 키트 · 필요할 때 꺼내 쓰기",
        kitSubtitle:
          "선택한 프로그램을 키트에 담고, 상담·수업 설계·학부모 안내 시 브리프를 복사해 사용합니다. 추천 키트를 한 번에 담을 수도 있습니다. 이 기기 브라우저에만 저장됩니다.",
        kitPanelTitle: "내 키트",
        presetTitle: "추천 키트",
        priorityTitle: "실행 우선순위",
        icanTitle: "아이캔 이중언어 성장 경로",
        icanSubtitle:
          "대한민국에서 드림팩토리로 아이캔을 이용하는 아이·틴·청년을 위한 경로. 씨앗 서술가 → 다리 논증가 → 글로벌 보이스.",
        eduspaceTitle: "에듀스페이스 우주인 성장 경로",
        eduspaceSubtitle:
          "예비우주인 기초 → 항성여행자 → 에듀스페이스 우주인. 경험치(XP)에 따라 명예마크를 답니다.",
        ranksTitle: "진급 단계",
        marksTitle: "명예마크",
        xpTitle: "경험치(XP) 적립 방법",
        unlock: "통과 조건",
        xpRequired: "필요 XP",
      },
      filters: {
        searchLabel: "검색",
        searchPlaceholder: "프로그램, 목표, 결과물 검색…",
        audienceLabel: "대상 필터",
        pathLabel: "경로 유형 필터",
        onlyKit: "키트만 보기",
        allAudience: "전체 대상",
        allPath: "전체 경로",
        result: (visible, total) => `${visible}개 표시 · 전체 ${total}`,
      },
      paths: {
        "약점 보완형": "약점 보완",
        "강점 확장형": "강점 확장",
        "진로 탐색형": "진로 탐색",
        "프로젝트 완성형": "프로젝트 완성",
      },
      labels: {
        priority: "대표",
        internal: "내부",
        overview: "개요",
        goals: "핵심 목표",
        activities: "주요 내용",
        outcomes: "기대 결과물",
        levels: "수준별 구성",
        beginner: "초급",
        intermediate: "중급",
        advanced: "고급",
        campExamples: "캠프 예시",
        metrics: "성장 축",
        audiences: "추천 대상",
        internalAudience: "교사·내부",
        emptyDash: "—",
      },
      kit: {
        empty: "아직 담긴 프로그램이 없습니다. 카드의 「키트에 담기」를 누르거나 추천 키트를 담아 주세요.",
        emptyBrief: "키트가 비어 있습니다.",
        briefTitle: "드림팩토리 성장 키트 브리프",
        created: "생성",
        growthModel: "성장 모델: 진단 → 설계 → 훈련 → 피드백 → 증명",
        phases: "학습 단계",
        duration: "운영 기간",
        markets: "대상·시장 예시",
        programs: "포함 프로그램",
        honorMarks: "관련 명예마크",
        ranks: "진급 경로",
        presetLoaded: "추천 키트를 담았습니다.",
        presetReplaced: "추천 키트로 교체했습니다.",
      },
      toasts: {
        added: "키트에 담았습니다.",
        removed: "키트에서 제거했습니다.",
        cleared: "키트를 비웠습니다.",
        copied: "클립보드에 복사했습니다.",
        language: "한국어로 전환했습니다.",
        presetLoaded: "추천 키트를 담았습니다.",
        presetReplaced: "키트를 추천 구성으로 교체했습니다.",
      },
      footer:
        "<strong>드림팩토리</strong> — 학생의 가능성을 발견하고, 훈련하고, 표현하고, 미래를 준비하는 성장 공장",
      footerSub: "Team iCAN · 연합하여 선을 이루는 교육 공동체",
      definition: DF.meta.definition,
      priorities: DF.priorities,
    },
    en: {
      docTitle: "DreamFactory · Growth Programs",
      description:
        "DreamFactory Growth Programs connect iCAN bilingual thinking, AI learning, global language, creative projects, character, and future roadmaps in one system.",
      brandName: "DreamFactory",
      brandSub: "Growth Programs",
      navLabel: "Primary navigation",
      nav: {
        programs: "Programs",
        model: "Growth Model",
        audience: "By Age",
        ican: "Bilingual",
        eduspace: "Astronaut",
        kit: "Use Kit",
        metrics: "Outcomes",
      },
      buttons: {
        exportKit: "Copy Kit",
        exportKitTitle: "Copy selected program brief",
        openKit: "My Kit",
        heroPrograms: "View programs",
        heroKit: "Use when needed",
        clearKit: "Clear",
        copyBrief: "Copy Brief",
        drawerCopy: "Copy Detail Brief",
        drawerAdd: "Add to Kit",
        drawerRemove: "Remove from Kit",
        cardAdd: "Add to Kit",
        cardAdded: "In Kit",
        remove: "Remove",
        close: "Close",
        loadPreset: "Load Kit",
        loadPresetReplace: "Replace with this Kit",
        copyPresetBrief: "Copy Kit Brief",
      },
      hero: {
        eyebrow: "iCAN · Integrated Growth Platform",
        tagline: "Designing each child's learning and vision for the AI era.",
        intro:
          "DreamFactory is a growth platform that helps students think more deeply, communicate more precisely, and grow with stronger character.",
        panelLabel: "One connected system",
        panelTitle: "Diagnose → Design → Train → Feedback → Prove",
        panelBody:
          "Programs are not isolated classes. iCAN placement leads to narrative, description, explanation, and argument; Input Core feeds talks and Global Voice. Reading, writing, book club, coding, FutureLab, and overseas incubating become one growth journey.",
        statPrograms: "Growth programs",
        statSteps: "Growth steps",
        statMetrics: "Outcome axes",
        statPaths: "Path types",
        slogans: [
          "Designing each child's learning and vision for the AI era.",
          "Read, write, speak, make, and serve through a future-ready platform.",
          "DreamFactory reads each student's present and designs the next step.",
          "An integrated program for knowledge, language, creativity, and character.",
          "Where learning becomes evidence, and evidence becomes vision.",
          "iCAN bilingual thinking: prove it in thought, speech, and writing — not conversation drills.",
        ],
      },
      sections: {
        modelTitle: "Five-Step Growth Model",
        modelSubtitle: "Every program connects through this flow.",
        programsTitle: "Programs · Card Catalog",
        programsSubtitle: "Open a card for details, then save programs into your kit for later use.",
        audienceTitle: "Operating Direction by Age Band",
        modesTitle: "Operating Modes",
        metricsTitle: "Six Outcome Axes",
        metricsSubtitle: "We observe more than grades. Each program leaves at least one visible output.",
        kitTitle: "Growth Kit · Use When Needed",
        kitSubtitle:
          "Save selected programs and copy a brief for consultations, lesson planning, and parent guidance. You can also load a recommended kit in one click. The kit is stored only in this browser.",
        kitPanelTitle: "My Kit",
        presetTitle: "Recommended Kits",
        priorityTitle: "Execution Priorities",
        icanTitle: "iCAN Bilingual Growth Path",
        icanSubtitle:
          "For children, teens, and young adults in Korea who use iCAN through Dream Factory. Seed Narrator → Bridge Thinker → Global Voice.",
        eduspaceTitle: "EduSpace Astronaut Growth Path",
        eduspaceSubtitle:
          "Space Cadet foundations → Stellar Traveler → EduSpace Astronaut. Earn honor marks by XP.",
        ranksTitle: "Rank ladder",
        marksTitle: "Honor marks",
        xpTitle: "How XP is earned",
        unlock: "Clearance requirements",
        xpRequired: "XP required",
      },
      filters: {
        searchLabel: "Search",
        searchPlaceholder: "Search programs, goals, outcomes...",
        audienceLabel: "Audience filter",
        pathLabel: "Path type filter",
        onlyKit: "Kit only",
        allAudience: "All ages",
        allPath: "All paths",
        result: (visible, total) => `${visible} shown · ${total} total`,
      },
      paths: {
        "약점 보완형": "Weakness Support",
        "강점 확장형": "Strength Extension",
        "진로 탐색형": "Career Exploration",
        "프로젝트 완성형": "Project Completion",
      },
      labels: {
        priority: "Featured",
        internal: "Internal",
        overview: "Overview",
        goals: "Core Goals",
        activities: "Main Activities",
        outcomes: "Expected Outputs",
        levels: "Level Structure",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        campExamples: "Camp Examples",
        metrics: "Growth Axes",
        audiences: "Recommended For",
        internalAudience: "Teachers · Internal",
        emptyDash: "—",
      },
      kit: {
        empty: "No programs are in your kit yet. Add a program card or load a recommended kit.",
        emptyBrief: "Your kit is empty.",
        briefTitle: "DreamFactory Growth Kit Brief",
        created: "Created",
        growthModel: "Growth model: Diagnose → Design → Train → Feedback → Prove",
        phases: "Learning phases",
        duration: "Duration",
        markets: "Audience / market samples",
        programs: "Included programs",
        honorMarks: "Related honor marks",
        ranks: "Rank path",
        presetLoaded: "Recommended kit loaded.",
        presetReplaced: "Kit replaced with recommended stack.",
      },
      toasts: {
        added: "Added to your kit.",
        removed: "Removed from your kit.",
        cleared: "Cleared your kit.",
        copied: "Copied to clipboard.",
        language: "Switched to English.",
        presetLoaded: "Recommended kit loaded.",
        presetReplaced: "Kit replaced with the recommended stack.",
      },
      footer:
        "<strong>DreamFactory</strong> — a growth factory that discovers, trains, expresses, and prepares each student's potential",
      footerSub: "Team iCAN · An education community working together for good",
      definition:
        "DreamFactory Growth Programs form one educational system for learning, language, thinking, expression, creativity, character, and future direction. The focus is not listing many classes, but accurately diagnosing each student, connecting the right training, and making growth visible through outputs and roadmaps.",
      priorities: [
        "Program introduction pages for the website and app",
        "A one-screen card catalog of growth programs",
        "Korea iCAN bilingual path: placement → narrative/description → explain/argue → Global Voice",
        "Priority launch of the youth (study/work/civic) track and Korea home-immersion kit",
        "Operate the Cadet → Stellar Traveler → EduSpace Astronaut path",
        "Priority launch of the Overseas Local AX × English Startup Incubating Kit",
        "A diagnostic and consultation flow before enrollment",
        "Sample growth reports for parents",
        "Priority launch of vacation camps and FutureLab signature programs",
        "Internal teacher training and quality-control manuals",
      ],
    },
  };

  const programEn = {
    p1: {
      overview:
        "A course that helps students use AI to ask better questions, think more accurately, and express ideas more creatively instead of depending on tools passively.",
      goals: [
        "Build a self-directed learning routine.",
        "Create strong questions and evaluate information carefully.",
        "Use AI for research, summaries, writing, and presentation preparation.",
        "Develop honest and responsible learning habits in digital environments.",
      ],
      activities: [
        "Self-directed learning strategies",
        "Question-building practice",
        "AI-assisted research",
        "Source reliability checks",
        "AI-supported writing drafts",
        "Learning plans and reflection notes",
        "Digital literacy and learning ethics",
      ],
      outcomes: [
        "Personal learning routine plan",
        "AI research notes",
        "Topic-based question list",
        "Learning reflection journal",
        "AI-assisted essay or presentation draft",
      ],
    },
    p2: {
      overview:
        "Reading and writing training that treats English as a way to understand the world and express ideas logically, not just as test practice.",
      goals: [
        "Understand sentence, paragraph, and full-text structure.",
        "Read across genres and summarize key ideas.",
        "Use evidence to express opinions in writing.",
        "Prepare the thinking and language needed for international school, TOEFL, MAP Growth, and essay-style assessments.",
      ],
      activities: [
        "Literature reading",
        "Nonfiction reading",
        "Science, society, history, and ethics readings",
        "Summary writing",
        "Paragraph writing",
        "Opinion and persuasive writing",
        "Research-based essays",
        "Assessment-style writing practice",
      ],
      outcomes: [
        "Reading summary notes",
        "Paragraph writing portfolio",
        "Topic essays",
        "Research writing",
        "Level-based writing growth report",
      ],
      levels: {
        beginner: "Sentence comprehension, key vocabulary, basic summaries, short paragraph writing",
        intermediate: "Paragraph structure, main ideas, evidence, comparison and contrast, opinion writing",
        advanced: "Critical reading, research writing, essay structure, citation, academic and test-style writing",
      },
    },
    p3: {
      overview:
        "A communication course where students organize ideas verbally, speak with confidence, and respond thoughtfully to others.",
      goals: [
        "Build the ability to structure ideas for speaking.",
        "Reduce presentation anxiety and grow confidence.",
        "Practice logical claims and supporting evidence.",
        "Learn listening, responding, questioning, and rebuttal.",
      ],
      activities: [
        "Self-introduction speeches",
        "Storytelling presentations",
        "Topic presentations",
        "Presentation structure",
        "Pro/con debate",
        "Impromptu speaking",
        "Interview practice",
        "Persuasive speeches",
        "Voice and delivery training",
      ],
      outcomes: [
        "Speech scripts",
        "Presentation slides",
        "Debate notes",
        "Speaking feedback sheets",
        "Recorded presentation portfolio",
      ],
    },
    p4: {
      overview:
        "A book-based thinking program that develops reading habits, interpretation, discussion, and expression through shared reading experiences.",
      goals: [
        "Build a steady reading habit.",
        "Understand characters, themes, conflicts, and structure.",
        "Connect books to personal experience and the wider world.",
        "Practice discussion and written response.",
      ],
      activities: [
        "Guided reading",
        "Reading journals",
        "Character and theme analysis",
        "Discussion questions",
        "Book talks",
        "Creative response projects",
      ],
      outcomes: ["Reading journal", "Book talk presentation", "Discussion notes", "Creative book project"],
    },
    p5: {
      overview:
        "A project-based research course that guides students from question selection to investigation, organization, production, and presentation.",
      goals: [
        "Turn curiosity into a researchable question.",
        "Find, compare, and organize reliable information.",
        "Create a clear output from research.",
        "Present findings with confidence and evidence.",
      ],
      activities: [
        "Topic selection",
        "Research question design",
        "Source collection",
        "Note organization",
        "Report writing",
        "Presentation and feedback",
      ],
      outcomes: ["Research report", "Presentation deck", "Annotated notes", "Project portfolio"],
    },
    p6: {
      overview:
        "A future-roadmap program that helps students understand strengths, interests, learning patterns, and possible directions for growth.",
      goals: [
        "Identify strengths, interests, and growth needs.",
        "Connect learning habits to future goals.",
        "Design a practical next-step roadmap.",
        "Help parents and teachers support the same direction.",
      ],
      activities: [
        "Student interview",
        "Strength and interest diagnosis",
        "Learning profile review",
        "Career theme exploration",
        "Roadmap design",
        "Parent consultation",
      ],
      outcomes: ["Student growth profile", "Future roadmap", "Consultation summary", "Action plan"],
    },
    p7: {
      overview:
        "A creative technology program where students plan and build digital outputs such as apps, stories, games, and interactive projects.",
      goals: [
        "Experience the full cycle from idea to prototype.",
        "Build creative problem-solving habits.",
        "Use digital tools to express ideas.",
        "Present the process and final product clearly.",
      ],
      activities: [
        "Idea planning",
        "Storyboard or wireframe",
        "Coding and app building",
        "Prototype testing",
        "Presentation preparation",
      ],
      outcomes: ["Prototype app or project", "Planning sheet", "Demo presentation", "Reflection report"],
    },
    p8: {
      overview:
        "A parent-connected growth support program that aligns class, home, and consultation so student growth continues beyond lesson time.",
      goals: [
        "Help parents understand strengths and needs clearly.",
        "Suggest practical learning routines and conversation directions at home.",
        "Connect class, home, and consultation instead of separating them.",
        "Provide parents with growth direction, not only scores.",
      ],
      activities: [
        "Pre-enrollment consultation",
        "Student diagnostic report",
        "Monthly growth feedback",
        "Home routine suggestions",
        "Parent seminars",
        "Future-direction consultation",
      ],
      outcomes: [
        "Parent consultation report",
        "Home connection checklist",
        "Monthly growth comments",
        "Student consultation records",
        "Parent education materials",
      ],
    },
    p9: {
      overview:
        "An internal growth system for maintaining and improving educational quality. Teachers become coaches who notice blocks and design growth.",
      goals: [
        "Improve teachers' ability to diagnose students.",
        "Strengthen questioning, feedback, lesson design, and project guidance.",
        "Manage class quality through a system, not only individual skill.",
        "Provide a consistent education experience to students and parents.",
      ],
      activities: [
        "Lesson-plan sharing",
        "Class observation",
        "Feedback meetings",
        "Student case studies",
        "Level rubric development",
        "Parent communication training",
        "Project-class training",
        "Monthly teacher workshops",
      ],
      outcomes: ["Standard lesson plans", "Observation notes", "Teacher feedback notes", "Level rubrics", "Student case-study materials"],
    },
    p10: {
      overview:
        "An intensive program that trains one area deeply or helps students complete a focused project during a short vacation period.",
      goals: [
        "Turn vacation into a focused growth opportunity.",
        "Strengthen areas that are usually difficult to address.",
        "Create a sense of achievement through project completion.",
        "Leave a visible output that shows student growth.",
      ],
      activities: ["Area-focused training", "Topic research project", "Output production and showcase", "Growth report writing"],
      outcomes: [
        "Camp portfolio",
        "Showcase materials",
        "Research report",
        "Writing output",
        "App or project output",
        "Camp growth report",
      ],
      campExamples: [
        "AI Research Camp",
        "English Writing Intensive Camp",
        "Speech and Debate Camp",
        "Book Club Project Camp",
        "Coding App Camp",
        "Future Vision Camp",
        "Christian Leadership Camp",
        "International School Prep Camp",
        "TOEFL and MAP Intensive Camp",
        "Portfolio Completion Camp",
        "iCAN Narrative & Description Camp",
        "iCAN Explain & Argue Camp",
        "Youth Global Voice Camp",
        "Ortigas Immersion Bridge Camp",
      ],
    },
    p11: {
      overview:
        "An AI-era coaching program for online homework and school tasks. Students learn to understand assignments, plan work, draft responses, receive feedback, and complete submissions themselves.",
      goals: [
        "Read assignment instructions accurately and summarize requirements independently.",
        "Use AI for hints, explanations, planning, and feedback rather than answer-copying.",
        "Complete school assignments, online homework, research, writing, and presentation preparation step by step.",
        "Avoid plagiarism, ghostwriting, and missing citations while building honest study habits.",
        "Leave visible task records and growth reports that parents and teachers can review.",
      ],
      activities: [
        "Assignment instruction analysis",
        "Deadline, difficulty, and resource mapping",
        "Question-building and block diagnosis",
        "AI hint-use practice",
        "Step-by-step math and science explanation notes",
        "English, social studies, and history research drafts",
        "Pre-submission checklist",
        "Source and citation organization",
        "Progress reports for parents and teachers",
      ],
      outcomes: [
        "Weekly homework planner",
        "Assignment analysis sheet",
        "AI-use log",
        "Step-by-step explanation notes",
        "Writing and research drafts with revisions",
        "Pre-submission checklist",
        "Monthly school-task growth report",
      ],
      levels: {
        beginner: "Reading instructions, deadline management, hint requests, short explanation notes",
        intermediate: "Explaining solution steps, comparing research sources, drafting and revising",
        advanced: "Long-term project management, source verification, advanced writing feedback, presentation completion",
      },
      campExamples: [
        "Back-to-School Homework Reset",
        "AI Study Skills Bootcamp",
        "School Project Rescue Week",
        "Research & Writing Support Lab",
      ],
    },
    p13: {
      overview:
        "The entry stage for becoming space talent. Students learn solar system, Earth–Moon, stars and galaxies, rockets and orbits, astronaut life, exploration history, and space ethics—not by memorization alone, but through observation, models, journals, and short briefings that build the power to read the cosmos.",
      goals: [
        "Explain and draw the basic structure of the solar system and Earth–Moon system.",
        "Understand gravity, orbits, day/night, and seasons with everyday language and simple models.",
        "Organize cosmic scale—stars, nebulae, galaxies—through research notes and analogies.",
        "Understand rocket launch, suits, life support, and space-station life at a foundation level.",
        "Clear Cadet entry via basics quiz, space journal, and a 1-minute briefing.",
      ],
      activities: [
        "Solar-system maps and planet cards",
        "Earth–Moon–Sun models (phases, eclipses)",
        "Gravity and orbit mini-labs with sketches",
        "Constellation, nebula, and galaxy observation journals",
        "Cosmic-scale analogy writing",
        "Rocket principles and launch storyboards",
        "Astronaut daily life, food, and exercise research",
        "Virtual ISS tour notes",
        "Space exploration history timeline",
        "Space debris and planetary-protection ethics discussion",
        "English space vocabulary cards",
        "Cadet 1-minute briefing practice",
      ],
      outcomes: [
        "Solar-system / cosmic-scale poster",
        "Space observation and curiosity journal",
        "Gravity and orbit lab report",
        "Astronaut-life brief (1 page)",
        "Cadet basics quiz results",
        "1-minute space briefing video or script",
        "Nebula Initiate Mark application checklist",
      ],
      levels: {
        beginner: "Planet names and order, Earth–Moon drawing, short observation journal, 30-second intro",
        intermediate: "Orbit/gravity explanation, nebula/galaxy research, 1-minute briefing, 80% quiz",
        advanced: "English keyword brief, ethics opinion piece, team poster, Cadet clearance portfolio",
      },
      campExamples: [
        "Space Cadet Bootcamp (1 week)",
        "Solar System Maker Week",
        "Moon & Orbit Lab",
        "ISS Life Skills Day",
        "Family Space Night",
        "Cadet Clearance Demo",
      ],
    },
    p14: {
      overview:
        "After Cadet clearance, this program moves students into active space work. As Stellar Travelers they design and run missions; as EduSpace Astronauts they accumulate XP to earn Orbit, Star, Galaxy, and Honor marks. Research, models/coding, English mission briefings, teamwork, and demo day leave astronaut experience in the portfolio.",
      goals: [
        "Define a target body and mission purpose, then run a mission log with success criteria.",
        "Build mission simulations with observation data, physics models, and AI/coding tools.",
        "Train international space communication with English and Korean mission briefings.",
        "Complete team space missions with roles, risk management, and peer feedback.",
        "Accumulate XP to earn Stellar Traveler and EduSpace Astronaut honor marks.",
      ],
      activities: [
        "Stellar mission canvas (goal, risk, success criteria)",
        "Celestial data research and comparison",
        "Orbit, propulsion, and landing scenario design",
        "AI/coding mini mission simulator",
        "English Mission Brief (1–2 pages)",
        "3-minute mission briefing and Q&A",
        "Team role cards (Commander, Science, Comms, Engineer)",
        "Risk management and emergency-procedure workshop",
        "Peer-feedback rubric practice",
        "XP mission board logging",
        "Demo day and portfolio showcase",
        "Mentoring younger Cadets and service missions",
      ],
      outcomes: [
        "Stellar Mission Log",
        "Mission Canvas & Risk Sheet",
        "English Mission Brief",
        "Simulation, model, or coding output",
        "3-minute briefing video/script",
        "Team mission report",
        "XP log & honor-mark application",
        "EduSpace Astronaut portfolio",
        "12-week space growth roadmap",
      ],
      levels: {
        beginner: "One mission topic, three logs, 60-second briefing, Orbit Explorer Mark challenge (XP 100+)",
        intermediate: "Team mission, English brief, sim/model, Star Navigator Mark (XP 200+)",
        advanced: "Demo day, mentoring, Galaxy and Honor marks (XP 300–500+), career-linked portfolio",
      },
      campExamples: [
        "Stellar Traveler Sprint (2 weeks)",
        "EduSpace Astronaut Academy (4 weeks)",
        "Mission Brief in English",
        "Orbit Simulation Hack Week",
        "Demo Day: Honor Mark Ceremony",
        "Cadet-to-Astronaut Bridge Camp",
      ],
    },
    p12: {
      overview:
        "An incubating track aimed at overseas local markets. Students combine AX (AI Transformation) education with English startup training to discover a local-market problem, design an AI-assisted solution, and pitch, validate, and portfolio the venture in English—not as a language class or coding demo, but as a full startup loop of problem definition, customer validation, MVP, and pitch.",
      goals: [
        "Research a target overseas local market (city, community, or niche) in English and define a real problem.",
        "Use AX tools to design customer personas, competitive analysis, solution hypotheses, and MVP scope.",
        "Train English elevator pitches, landing copy, interview scripts, and demo presentations at a practical level.",
        "Measure market response through mock customer interviews and demo day, then document pivot rationale.",
        "Complete outputs that connect to overseas expansion, global portfolios, and future roadmaps.",
      ],
      activities: [
        "Overseas local-market scan (country, city, community selection)",
        "English local-problem interview script writing",
        "AX research: trends, competitors, regulations, pricing signals",
        "Customer persona and Jobs-to-be-Done mapping",
        "Solution hypothesis canvas (Problem–Solution Fit)",
        "AI-assisted MVP/prototype sketch and landing page",
        "English elevator pitch (30s, 60s, 3 min)",
        "Pitch deck structure (Problem → Solution → Market → Traction → Ask)",
        "Mock customer interviews and feedback loops",
        "English local-market brief writing",
        "Demo-day rehearsal and peer feedback",
        "Ethics, copyright, and AI-use transparency checks",
      ],
      outcomes: [
        "Target Local Market Brief (1–2 pages in English)",
        "Customer Persona + JTBD map",
        "Problem–Solution Canvas",
        "English Pitch Deck (8–12 slides)",
        "30s / 60s / 3min pitch scripts and recordings",
        "AI-assisted MVP / landing copy",
        "Customer Interview Log",
        "Demo Day presentation materials",
        "Overseas Growth Roadmap (next 12 weeks)",
      ],
      levels: {
        beginner:
          "Choose one market, write five English problem sentences, one persona, a 30s pitch, and a 1-page market brief",
        intermediate:
          "Competitive analysis, JTBD, solution canvas, 60s pitch, landing copy, three mock interviews, 8-slide pitch deck",
        advanced:
          "Local validation metrics, MVP prototype, 3-min pitch with Q&A, English market brief, 12-week overseas growth roadmap, demo day",
      },
      campExamples: [
        "Overseas Local Market Sprint (2 weeks)",
        "AX × English Pitch Intensive (1 week)",
        "Global Niche Startup Bootcamp (4 weeks)",
        "US/Canada Local Problem Lab",
        "SE Asia Hub City Incubator Week",
        "Diaspora Niche Venture Studio",
        "Demo Day: Pitch in English",
      ],
    },
    p15: {
      overview:
        "Not a conversation-score or CEFR-only academy test. iCAN looks at whether a learner can retell what they read as a scene, an explanation, and an evidence-based claim. We overlap learning persona with English MAP (grammar, reading, vocabulary, listening, writing) to place Seed Narrator, Bridge Thinker, or Global Voice. This is the entry for every age in Korea who starts iCAN through Dream Factory.",
      goals: [
        "Read learning style and blocks as a persona that justifies placement.",
        "Read gaps across MAP’s five areas and the five articulation modes (narrate, describe, explain, argue, persuade).",
        "Choose a starting track: G1–3 narrative/description, G4–6 explain/argue, or teen/youth Global Voice.",
        "Confirm operating form — online, Ortigas local, or camp — in consultation.",
        "Honestly filter poor-fit goals (conversation-only or short-term scores only).",
      ],
      activities: [
        "Unified application → student ID and test level",
        "Learning-type / persona interview",
        "English MAP five-area diagnosis",
        "Mini articulation interview (narrate, describe, explain, argue, persuade)",
        "Retell-as-scene / explain / argue task",
        "Goal alignment with parent or self (school, study abroad, job, confidence)",
        "Placement report linked to curriculum",
        "Six-step enrollment: apply → ID → persona+MAP → consult → schedule → class+feedback",
      ],
      outcomes: [
        "Learning-type / persona card",
        "English MAP profile",
        "Five-mode articulation snapshot",
        "Starting-track placement (Seed / Bridge / Voice)",
        "Online / local / camp operating recommendation",
        "One-page growth questions for parents or the learner",
      ],
      levels: {
        beginner: "Short scene retell, listening/vocab gap check, Seed Narrator candidate",
        intermediate: "Explainer paragraph and MAP-gap reading, Bridge Thinker candidate",
        advanced: "Argument/persuasion sample aligned to career goals, Global Voice candidate",
      },
      campExamples: [
        "Free Bilingual Placement Week",
        "MAP + Persona Reading Lab",
        "Family Placement Conference",
        "Teen/Youth Voice Audit",
      ],
    },
    p16: {
      overview:
        "The core iCAN G1–G3 routine: Read → Picture → Tell → Write. Students draw the scene they read, tell it as a story, then write it. This is not vocabulary memorization — children narrate what they saw in their own language and describe it with sensory detail. Korea online and Ortigas classrooms use the same routine.",
      goals: [
        "Tell and write a story with a beginning, middle, and end.",
        "Make characters, places, and feelings visible with sensory detail.",
        "Rebuild a reading as a drawing and oral story before writing.",
        "Rethink a Korean story in English and retell an English story in Korean.",
        "Leave four Seed Narrator portfolio pieces.",
      ],
      activities: [
        "Weekly Read–Picture–Tell–Write cycle",
        "Scene sketches and captions",
        "Story sequence cards",
        "Five-senses description games",
        "Character feeling and motive talk",
        "Short narrative writing and read-aloud",
        "Korean–English restatement (not translation)",
        "15-minute home scene missions",
      ],
      outcomes: [
        "Scene drawing + caption set",
        "Oral story recording",
        "Narrative writing portfolio",
        "Description sentence notes",
        "Seed Narrator clearance checklist",
      ],
      levels: {
        beginner: "One scene, three sentences, one drawing, 30-second talk",
        intermediate: "Beginning–middle–end, sensory detail, 1-minute story, short paragraph",
        advanced: "Character emotion shift, bilingual restatement, 2-minute story, one narrative+description piece",
      },
      campExamples: [
        "Picture-Tell-Write Camp (1 week)",
        "Story Scene Maker Week",
        "Family Story Night",
        "Ortigas Narrative Immersion",
      ],
    },
    p17: {
      overview:
        "The core iCAN G4–G6 and teen routine: Explain → Argue. Students unpack concepts with schema, claim with evidence, and revise after counterargument. The goal is explainable thinking, not surface fluency. School performance tasks, essays, and debates become the practice field.",
      goals: [
        "Organize a concept as a schema and re-explain it to someone else.",
        "Complete one argument in speech and writing with claim, evidence, example, and counterargument.",
        "Restructure English sources in Korean and Korean thinking in English.",
        "Judge source and evidence quality.",
        "Leave explainers, arguments, and a 3-minute briefing for Bridge Thinker clearance.",
      ],
      activities: [
        "Schema maps (definition–example–analogy–limit)",
        "Explain paragraphs and peer re-explanation",
        "Claim–evidence card debates",
        "Anticipate rebuttal and reply",
        "Research notes and source tables",
        "Korean–English thinking-switch workshops",
        "3-minute briefing and Q&A",
        "Rebuild school essays with the argument rubric",
      ],
      outcomes: [
        "Concept schema maps",
        "Two explainer pieces",
        "Two argument pieces",
        "Debate prep notes",
        "3-minute briefing video or script",
        "Bridge Thinker clearance portfolio",
      ],
      levels: {
        beginner: "One concept explainer, three evidence sentences, 60-second explanation",
        intermediate: "Compare/cause explainer, one counter-line, argument paragraph, 3-minute briefing",
        advanced: "Sourced argument essay, Q&A, bilingual restructure, school-task link",
      },
      campExamples: [
        "Explain & Argue Sprint (2 weeks)",
        "Evidence Debate Week",
        "School Essay Rebuild Lab",
        "Ortigas Argument Immersion",
      ],
    },
    p18: {
      overview:
        "The shared input axis for every age: Reading → Vocabulary → Schema → Output Link. Listening more does not make a bilingual thinker. Students pin what they read to vocabulary and schema, then prove it the same day with spoken or written output. This is the daily engine for learners in Korea who lack English input.",
      goals: [
        "Keep a steady stream of level-right reading.",
        "Retrieve vocabulary inside sentences and schema, not as isolated lists.",
        "Leave a diagram of the reading’s structure.",
        "Prove the same day’s input with a short spoken or written output.",
        "Feed the age track (narrative, argument, or voice).",
      ],
      activities: [
        "Leveled reading logs (literature and nonfiction)",
        "Vocab card → sentence → schema link",
        "Listening notes (meaning sketches, not dictation)",
        "One-page schema",
        "Output Link: 30-second talk or five sentences",
        "Korean–English key-sentence pairing",
        "Weekly input review (what can I re-explain?)",
        "Youth track: papers, news, and workplace documents",
      ],
      outcomes: [
        "Weekly Input Core log",
        "Vocabulary–schema notes",
        "Output Link collection",
        "Reading growth snapshot",
        "Track-connection checklist",
      ],
      levels: {
        beginner: "Short text, five key words, picture schema, one-sentence output",
        intermediate: "Paragraph reading, vocab network, cause-effect schema, five-sentence output",
        advanced: "Long nonfiction, academic/workplace vocab, multi-schema, 1-minute re-explanation",
      },
      campExamples: [
        "Input Core Reset (1 week)",
        "Reading-to-Output Bootcamp",
        "Youth News & Paper Lab",
      ],
    },
    p19: {
      overview:
        "The missing teen and young-adult extension of iCAN. Learners who have trained narrative and argument move into persuasion, leadership, and real-life language. They leave TED-style talks, study-abroad essays, job interviews, academic seminars, and civic or content pieces in Korean and English. This is not more English class — it is using thinking already built.",
      goals: [
        "Persuade an audience with one claim and handle questions.",
        "Design study-abroad, scholarship, or job documents and interview stories independently.",
        "Hold Korean identity and English thinking in the same portfolio.",
        "Use AI only as a draft tool; keep explanation, evidence, and voice as the learner’s.",
        "Leave a Global Voice mark and a 12-week next roadmap.",
      ],
      activities: [
        "Choose a voice genre (academic / job / venture / content / civic)",
        "TED-style speech structure (hook–story–claim–ask)",
        "Study-abroad and personal-statement workshop",
        "Interview story bank (failure, collaboration, conflict, learning)",
        "Seminar summary and questioning practice",
        "One bilingual content piece (essay, video, or newsletter)",
        "Bilingual identity statement",
        "Peer Q&A and rubric feedback",
      ],
      outcomes: [
        "TED/pitch script and recording",
        "One study-abroad or job essay",
        "Interview story bank",
        "Bilingual content or seminar notes",
        "Bilingual identity statement",
        "Global Voice portfolio",
        "Next 12-week roadmap",
      ],
      levels: {
        beginner: "2-minute self-story, three interview answers, one-page essay",
        intermediate: "5-minute TED, essay revision, mock interview, bilingual content draft",
        advanced: "Talk with Q&A, application package, mentoring, career-linked portfolio",
      },
      campExamples: [
        "Global Voice Bootcamp (2 weeks)",
        "College & Career Essay Lab",
        "Interview Story Week",
        "TED Night: Speak in Two Languages",
        "Youth Ortigas Immersion",
      ],
    },
    p20: {
      overview:
        "An operating program for Korean homes where English is not the daily language. Parents do not need to be native speakers. They move iCAN routines — short input, scene or explainer output, feedback — into 15-minute home slots, and put weekday Korea-online work on one calendar with vacation Ortigas camps. The rule is to grow English thinking without dropping Korean literacy or identity.",
      goals: [
        "Keep a short daily bilingual routine even without an English environment.",
        "Help parents become questioners, audiences, and recorders — not answer-teachers.",
        "Pair English output with Korean reading and conversation instead of replacing them.",
        "Turn screen time into Input Core with a clear rule.",
        "Show online regular work and Ortigas local/camp roles on one calendar.",
      ],
      activities: [
        "15-minute home mission cards (draw, retell, one sentence)",
        "Parent question lists (ask again; do not correct first)",
        "One evening scene shared in Korean and English",
        "Sibling or peer re-explanation games",
        "Screen = input, output = speech or writing",
        "Monthly growth comments (the scene retold, not a score)",
        "Weekly online ↔ Ortigas intensive bridge plan",
        "Pair a Korean book and an English book on the same theme",
      ],
      outcomes: [
        "Home immersion calendar",
        "15-minute mission log",
        "Parent question cards",
        "Paired Korean–English theme reading record",
        "Yearly online+camp bridge map",
        "Monthly home growth comments",
      ],
      levels: {
        beginner: "Four 15-minute sessions a week; parent only listens; one drawing",
        intermediate: "Five sessions; two parent questions; one Korean and one English sentence",
        advanced: "The teen runs their own routine; parent reviews the portfolio monthly",
      },
      campExamples: [
        "Korea Home Kickoff Saturday",
        "Parent Question Workshop",
        "Online-to-Ortigas Bridge Week",
        "Family Bilingual Night",
      ],
    },
  };

  const state = {
    kit: loadKit(),
    lang: loadLang(),
    audience: "all",
    path: "all",
    query: "",
    onlyKit: false,
    activeProgramId: null,
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function loadLang() {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return LANGS.includes(saved) ? saved : "ko";
  }

  function saveLang() {
    localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  }

  function t() {
    return ui[state.lang];
  }

  function programText(p) {
    if (state.lang === "en" && programEn[p.id]) {
      return { ...p, ...programEn[p.id] };
    }
    return p;
  }

  function setText(selector, text) {
    const el = $(selector);
    if (el) el.textContent = text;
  }

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
      toast(t().toasts.removed);
    } else {
      state.kit = [...state.kit, id];
      toast(t().toasts.added);
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
    toast(t().toasts.cleared);
  }

  function getPresetKits() {
    return Array.isArray(DF.presetKits) ? DF.presetKits : [];
  }

  function presetById(id) {
    return getPresetKits().find((k) => k.id === id);
  }

  function loadPresetKit(id, { replace = true } = {}) {
    const preset = presetById(id);
    if (!preset) return;
    const ids = (preset.programIds || []).filter((pid) => DF.programs.some((p) => p.id === pid));
    if (!ids.length) return;

    if (replace) {
      state.kit = [...ids];
      toast(t().toasts.presetReplaced);
    } else {
      const merged = new Set([...state.kit, ...ids]);
      state.kit = [...merged];
      toast(t().toasts.presetLoaded);
    }
    saveKit();
    renderKit();
    renderCards();
    renderPresetKits();
  }

  function getEduspacePath() {
    return DF.eduspacePath || null;
  }

  function getIcanPath() {
    return DF.icanPath || null;
  }

  function honorMarkById(id) {
    const marks = [...(DF.eduspacePath?.honorMarks || []), ...(DF.icanPath?.honorMarks || [])];
    return marks.find((m) => m.id === id) || null;
  }

  function buildPresetBrief(preset) {
    if (!preset) return t().kit.emptyBrief;
    const isEn = state.lang === "en";
    const title = isEn ? preset.titleEn : preset.titleKo;
    const subtitle = isEn ? preset.subtitleEn : preset.subtitleKo;
    const mission = isEn ? preset.missionEn : preset.missionKo;
    const duration = isEn ? preset.durationEn : preset.durationKo;
    const markets = isEn ? preset.targetMarketsEn : preset.targetMarketsKo;
    const lines = [
      t().kit.briefTitle,
      title,
      subtitle,
      `${t().kit.created}: ${new Date().toLocaleString(isEn ? "en-US" : "ko-KR")}`,
      "────────────────────────────────",
      "",
      mission,
      "",
      `■ ${t().kit.duration}`,
      `· ${duration}`,
      "",
      `■ ${t().kit.markets}`,
      ...(markets || []).map((m) => `· ${m}`),
      "",
      `■ ${t().kit.phases}`,
    ];

    (preset.phases || []).forEach((phase) => {
      const pTitle = isEn ? phase.titleEn : phase.titleKo;
      const pBody = isEn ? phase.bodyEn : phase.bodyKo;
      lines.push(`${phase.step}. ${pTitle} — ${pBody}`);
    });

    if (preset.honorPreviewIds?.length) {
      lines.push("", `■ ${t().kit.honorMarks}`);
      preset.honorPreviewIds.forEach((mid) => {
        const mark = honorMarkById(mid);
        if (!mark) return;
        const mTitle = isEn ? mark.titleEn : mark.titleKo;
        const mBody = isEn ? mark.bodyEn : mark.bodyKo;
        lines.push(`· ${mark.icon} ${mTitle} (XP ${mark.xpRequired}+) — ${mBody}`);
      });
    }

    lines.push("", `■ ${t().kit.programs}`, "");

    const programBlocks = (preset.programIds || [])
      .map((id) => programById(id))
      .filter(Boolean)
      .map((p) => buildBrief(p, true));

    lines.push(programBlocks.join("\n\n────────────────────────────────\n\n"));
    lines.push("", "────────────────────────────────", t().kit.growthModel, t().definition);
    return lines.join("\n");
  }

  function audienceLabel(id) {
    const audience = DF.audiences.find((a) => a.id === id);
    if (!audience) return id;
    return state.lang === "en" && audience.labelEn ? audience.labelEn : audience.label;
  }

  function metricTitle(id) {
    const metric = DF.metrics.find((m) => m.id === id);
    if (!metric) return id;
    return state.lang === "en" && metric.titleEn ? metric.titleEn : metric.title;
  }

  function pathLabel(path) {
    return t().paths[path] || path;
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
        programEn[p.id]?.overview,
        ...(p.goals || []),
        ...(programEn[p.id]?.goals || []),
        ...(p.activities || []),
        ...(programEn[p.id]?.activities || []),
        ...(p.outcomes || []),
        ...(programEn[p.id]?.outcomes || []),
        ...(p.campExamples || []),
        ...(programEn[p.id]?.campExamples || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!blob.includes(q)) return false;
    }

    return true;
  }

  function buildBrief(p, compact = false) {
    const content = programText(p);
    const labels = t().labels;
    const lines = [
      `[${p.num}] ${state.lang === "en" ? p.titleEn : p.titleKo} (${state.lang === "en" ? p.titleKo : p.titleEn})`,
      "",
      `■ ${labels.overview}`,
      content.overview,
      "",
      `■ ${labels.goals}`,
      ...content.goals.map((g) => `· ${g}`),
      "",
      `■ ${labels.activities}`,
      ...content.activities.map((a) => `· ${a}`),
      "",
      `■ ${labels.outcomes}`,
      ...content.outcomes.map((o) => `· ${o}`),
    ];

    if (content.levels) {
      lines.push("", `■ ${labels.levels}`);
      lines.push(`· ${labels.beginner}: ${content.levels.beginner}`);
      lines.push(`· ${labels.intermediate}: ${content.levels.intermediate}`);
      lines.push(`· ${labels.advanced}: ${content.levels.advanced}`);
    }

    if (content.campExamples?.length) {
      lines.push("", `■ ${labels.campExamples}`);
      content.campExamples.forEach((c) => lines.push(`· ${c}`));
    }

    if (!compact) {
      lines.push(
        "",
        `■ ${labels.metrics}`,
        `· ${(p.metrics || []).map(metricTitle).join(", ") || labels.emptyDash}`,
        "",
        `■ ${labels.audiences}`,
        `· ${(p.audiences || []).map(audienceLabel).join(", ") || (p.internal ? labels.internalAudience : labels.emptyDash)}`
      );
    }

    return lines.join("\n");
  }

  function buildKitBrief() {
    if (!state.kit.length) return t().kit.emptyBrief;

    // If the current kit exactly matches a recommended preset, use the richer brief.
    const matchedPreset = getPresetKits().find((preset) => {
      const ids = preset.programIds || [];
      if (ids.length !== state.kit.length) return false;
      return ids.every((id) => state.kit.includes(id));
    });
    if (matchedPreset) return buildPresetBrief(matchedPreset);

    const header = [
      t().kit.briefTitle,
      t().hero.tagline,
      `${t().kit.created}: ${new Date().toLocaleString(state.lang === "en" ? "en-US" : "ko-KR")}`,
      "────────────────────────────────",
      "",
    ].join("\n");

    const body = state.kit
      .map((id) => buildBrief(programById(id), true))
      .join("\n\n────────────────────────────────\n\n");

    const footer = [
      "",
      "────────────────────────────────",
      t().kit.growthModel,
      t().definition,
    ].join("\n");

    return header + body + footer;
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast(t().toasts.copied);
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
      toast(t().toasts.copied);
    }
  }

  /* ── Render static sections ── */

  function renderHero() {
    $("#heroTagline").textContent = t().hero.tagline;
    $("#heroIntro").textContent = t().hero.intro;
    $("#heroPanelLabel").textContent = t().hero.panelLabel;
    $("#heroPanelTitle").textContent = t().hero.panelTitle;
    $("#heroPanelBody").textContent = t().hero.panelBody;
    $("#statPrograms").textContent = t().hero.statPrograms;
    $("#statProgramCount").textContent = DF.programs.length;
    $("#statSteps").textContent = t().hero.statSteps;
    $("#statMetrics").textContent = t().hero.statMetrics;
    $("#statPaths").textContent = t().hero.statPaths;
    const slogans = t().hero.slogans.slice(0, 4);
    $("#sloganRow").innerHTML = slogans.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  }

  function renderStaticText() {
    document.documentElement.lang = state.lang;
    document.title = t().docTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t().description);

    setText(".brand strong", t().brandName);
    setText(".brand small", t().brandSub);
    $(".nav").setAttribute("aria-label", t().navLabel);
    $("#languageToggle").setAttribute("aria-label", state.lang === "ko" ? "언어 선택" : "Choose language");
    $$("#languageToggle button").forEach((btn) => {
      const active = btn.dataset.lang === state.lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    setText("#navPrograms", t().nav.programs);
    setText("#navModel", t().nav.model);
    setText("#navAudience", t().nav.audience);
    setText("#navIcan", t().nav.ican);
    setText("#navEduspace", t().nav.eduspace);
    setText("#navKit", t().nav.kit);
    setText("#navMetrics", t().nav.metrics);
    setText("#btnExportKit", t().buttons.exportKit);
    $("#btnExportKit").setAttribute("title", t().buttons.exportKitTitle);
    setText("#btnOpenKit", t().buttons.openKit);
    setText(".hero-actions .primary", t().buttons.heroPrograms);
    setText(".hero-actions .button:not(.primary)", t().buttons.heroKit);

    setText("#modelTitle", t().sections.modelTitle);
    setText("#modelSubtitle", t().sections.modelSubtitle);
    setText("#programsTitle", t().sections.programsTitle);
    setText("#programsSubtitle", t().sections.programsSubtitle);
    setText("#audienceTitle", t().sections.audienceTitle);
    setText("#modesTitle", t().sections.modesTitle);
    setText("#metricsTitle", t().sections.metricsTitle);
    setText("#metricsSubtitle", t().sections.metricsSubtitle);
    setText("#kitTitle", t().sections.kitTitle);
    setText("#kitSubtitle", t().sections.kitSubtitle);
    setText("#kitPanelTitle", t().sections.kitPanelTitle);
    setText("#presetTitle", t().sections.presetTitle);
    setText("#priorityTitle", t().sections.priorityTitle);
    setText("#icanTitle", t().sections.icanTitle);
    setText("#icanSubtitle", t().sections.icanSubtitle);
    setText("#eduspaceTitle", t().sections.eduspaceTitle);
    setText("#eduspaceSubtitle", t().sections.eduspaceSubtitle);

    $(".search-field .sr-only").textContent = t().filters.searchLabel;
    $("#searchInput").setAttribute("placeholder", t().filters.searchPlaceholder);
    $("#audienceChips").setAttribute("aria-label", t().filters.audienceLabel);
    $("#pathChips").setAttribute("aria-label", t().filters.pathLabel);
    setText("#onlyKitLabel", t().filters.onlyKit);
    setText("#btnClearKit", t().buttons.clearKit);
    setText("#btnCopyKit", t().buttons.copyBrief);
    setText("#drawerCopy", t().buttons.drawerCopy);
    $("#drawerClose").setAttribute("aria-label", t().buttons.close);
    $("#kitEmpty").textContent = t().kit.empty;
    $("#footerLine").innerHTML = t().footer;
    setText("#footerSubline", t().footerSub);
  }

  function renderModel() {
    $("#modelTrack").innerHTML = DF.growthModel
      .map(
        (m) => `
      <li>
        <span class="step-num">${m.step}</span>
        <h3>${escapeHtml(state.lang === "en" ? m.en : m.title)}</h3>
        <span class="en">${escapeHtml(state.lang === "en" ? m.title : m.en)}</span>
        <p>${escapeHtml(state.lang === "en" && m.bodyEn ? m.bodyEn : m.body)}</p>
      </li>`
      )
      .join("");
  }

  function renderAudienceChips() {
    const chips = [
      { id: "all", label: t().filters.allAudience },
      ...DF.audiences.map((a) => ({ id: a.id, label: audienceLabel(a.id) })),
    ];
    $("#audienceChips").innerHTML = chips
      .map(
        (c) =>
          `<button type="button" class="chip${c.id === state.audience ? " active" : ""}" data-audience="${c.id}">${escapeHtml(c.label)}</button>`
      )
      .join("");
  }

  function renderPathChips() {
    const paths = ["약점 보완형", "강점 확장형", "진로 탐색형", "프로젝트 완성형"];
    const chips = [{ id: "all", label: t().filters.allPath }, ...paths.map((path) => ({ id: path, label: pathLabel(path) }))];
    $("#pathChips").innerHTML = chips
      .map(
        (c) =>
          `<button type="button" class="chip${c.id === state.path ? " active" : ""}" data-path="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`
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
          <h3>${escapeHtml(audienceLabel(a.id))}</h3>
          <p class="focus">${escapeHtml(state.lang === "en" && a.focusEn ? a.focusEn : a.focus)}</p>
          <p>${escapeHtml(state.lang === "en" && a.noteEn ? a.noteEn : a.note)}</p>
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
        <h3>${escapeHtml(state.lang === "en" && m.titleEn ? m.titleEn : m.title)}</h3>
        <p>${escapeHtml(state.lang === "en" && m.bodyEn ? m.bodyEn : m.body)}</p>
      </article>`
      )
      .join("");
  }

  function renderMetrics() {
    $("#metricGrid").innerHTML = DF.metrics
      .map(
        (m) => `
      <article class="metric-card">
        <h3>${escapeHtml(metricTitle(m.id))}</h3>
        <p>${escapeHtml(state.lang === "en" && m.bodyEn ? m.bodyEn : m.body)}</p>
      </article>`
      )
      .join("");
  }

  function renderPriorities() {
    $("#priorityList").innerHTML = t().priorities.map((p) => `<li>${escapeHtml(p)}</li>`).join("");
    $("#definitionBlock").textContent = t().definition;
  }

  function renderCards() {
    const grid = $("#programGrid");
    const visible = DF.programs.filter(matchesFilters);

    grid.innerHTML = DF.programs
      .map((p) => {
        const content = programText(p);
        const hidden = !matchesFilters(p);
        const inKit = isInKit(p.id);
        const badges = [];
        if (p.priority) badges.push(`<span class="badge flag">${escapeHtml(t().labels.priority)}</span>`);
        if (p.internal) badges.push(`<span class="badge internal">${escapeHtml(t().labels.internal)}</span>`);
        if (p.category === "flagship") badges.push('<span class="badge flag">Flagship</span>');
        if (p.icanRank || (p.kitBundleId && String(p.kitBundleId).startsWith("kit-ican")) || ["p15", "p16", "p17", "p18", "p19", "p20"].includes(p.id)) {
          badges.push('<span class="badge ican">iCAN</span>');
        }
        const title = state.lang === "en" ? p.titleEn : p.titleKo;
        const subtitle = state.lang === "en" ? p.titleKo : p.titleEn;

        return `
        <article
          class="program-card${hidden ? " hidden" : ""}${inKit ? " in-kit" : ""}"
          data-id="${p.id}"
          style="--accent: ${p.accent}"
          tabindex="0"
          role="button"
          aria-label="${escapeHtml(title)} ${state.lang === "en" ? "details" : "상세 보기"}"
        >
          <div class="card-top">
            <span class="card-icon" aria-hidden="true">${p.icon}</span>
            <div class="card-badges">${badges.join("")}</div>
          </div>
          <h3>${escapeHtml(title)}</h3>
          <p class="en-title">${escapeHtml(subtitle)}</p>
          <p class="overview">${escapeHtml(content.overview)}</p>
          <div class="card-foot">
            <span class="num">${String(p.num).padStart(2, "0")}</span>
            <button type="button" class="kit-btn${inKit ? " on" : ""}" data-kit="${p.id}">
              ${inKit ? t().buttons.cardAdded : t().buttons.cardAdd}
            </button>
          </div>
        </article>`;
      })
      .join("");

    $("#resultCount").textContent = t().filters.result(visible.length, DF.programs.length);
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
        const title = state.lang === "en" ? p.titleEn : p.titleKo;
        const subtitle = state.lang === "en" ? p.titleKo : p.titleEn;
        return `
        <li>
          <div>
            <strong>${p.icon} ${escapeHtml(title)}</strong>
            <small>${escapeHtml(subtitle)}</small>
          </div>
          <button type="button" data-remove="${p.id}">${t().buttons.remove}</button>
        </li>`;
      })
      .join("");
  }

  function renderPresetKits() {
    const root = $("#presetKitList");
    if (!root) return;
    const isEn = state.lang === "en";
    const presets = getPresetKits();

    if (!presets.length) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML = presets
      .map((kit) => {
        const title = isEn ? kit.titleEn : kit.titleKo;
        const subtitle = isEn ? kit.subtitleEn : kit.subtitleKo;
        const mission = isEn ? kit.missionEn : kit.missionKo;
        const duration = isEn ? kit.durationEn : kit.durationKo;
        const markets = isEn ? kit.targetMarketsEn : kit.targetMarketsKo;
        const phases = (kit.phases || [])
          .map((phase) => {
            const pTitle = isEn ? phase.titleEn : phase.titleKo;
            const pBody = isEn ? phase.bodyEn : phase.bodyKo;
            return `<li><strong>${phase.step}. ${escapeHtml(pTitle)}</strong> ${escapeHtml(pBody)}</li>`;
          })
          .join("");
        const programChips = (kit.programIds || [])
          .map((id) => programById(id))
          .filter(Boolean)
          .map((p) => {
            const label = isEn ? p.titleEn : p.titleKo;
            return `<span class="preset-chip">${p.icon} ${escapeHtml(label)}</span>`;
          })
          .join("");
        const marketChips = (markets || []).map((m) => `<span class="preset-chip soft">${escapeHtml(m)}</span>`).join("");
        const honorChips = (kit.honorPreviewIds || [])
          .map((mid) => honorMarkById(mid))
          .filter(Boolean)
          .map((mark) => {
            const mTitle = isEn ? mark.titleEn : mark.titleKo;
            return `<span class="preset-chip honor">${mark.icon} ${escapeHtml(mTitle)} · XP ${mark.xpRequired}+</span>`;
          })
          .join("");
        const featured = kit.featured ? `<span class="badge flag">${escapeHtml(t().labels.priority)}</span>` : "";
        const allLoaded = (kit.programIds || []).every((id) => isInKit(id));
        const pathClass = kit.pathId === "eduspace" ? " space" : kit.pathId === "ican" ? " bilingual" : "";

        return `
          <article class="preset-card${kit.featured ? " featured" : ""}${pathClass}" data-preset="${kit.id}">
            <div class="preset-head">
              <span class="preset-icon" aria-hidden="true">${kit.icon}</span>
              <div>
                <div class="preset-badges">${featured}</div>
                <h4>${escapeHtml(title)}</h4>
                <p class="preset-sub">${escapeHtml(subtitle)}</p>
              </div>
            </div>
            <p class="preset-mission">${escapeHtml(mission)}</p>
            <p class="preset-meta"><strong>${escapeHtml(t().kit.duration)}</strong> ${escapeHtml(duration)}</p>
            <div class="preset-chips">${programChips}</div>
            <div class="preset-chips markets">${marketChips}</div>
            ${honorChips ? `<div class="preset-chips honors">${honorChips}</div>` : ""}
            <ol class="preset-phases">${phases}</ol>
            <div class="preset-actions">
              <button type="button" class="primary" data-load-preset="${kit.id}" data-replace="true">
                ${allLoaded ? escapeHtml(t().buttons.cardAdded) : escapeHtml(t().buttons.loadPresetReplace)}
              </button>
              <button type="button" class="ghost" data-copy-preset="${kit.id}">
                ${escapeHtml(t().buttons.copyPresetBrief)}
              </button>
            </div>
          </article>`;
      })
      .join("");
  }

  function renderGrowthPath(root, path) {
    if (!root) return;
    const isEn = state.lang === "en";
    if (!path) {
      root.innerHTML = "";
      return;
    }

    const mission = isEn ? path.missionEn : path.missionKo;
    const xpNote = isEn ? path.xpNoteEn : path.xpNoteKo;

    const ranksHtml = (path.ranks || [])
      .map((rank) => {
        const title = isEn ? rank.titleEn : rank.titleKo;
        const stage = isEn ? rank.stageEn : rank.stageKo;
        const body = isEn ? rank.bodyEn : rank.bodyKo;
        const unlock = isEn ? rank.unlockEn : rank.unlockKo;
        const xpLabel =
          rank.xpMax == null
            ? `XP ${rank.xpMin}+`
            : `XP ${rank.xpMin}–${rank.xpMax}`;
        const kitBtn = rank.kitId
          ? `<button type="button" class="ghost small" data-load-preset="${rank.kitId}" data-replace="true">${escapeHtml(t().buttons.loadPresetReplace)}</button>`
          : "";
        return `
          <article class="rank-card" style="--rank-color:${rank.color}">
            <div class="rank-top">
              <span class="rank-icon" aria-hidden="true">${rank.icon}</span>
              <div>
                <p class="rank-order">${rank.order}</p>
                <h4>${escapeHtml(title)}</h4>
                <p class="rank-stage">${escapeHtml(stage)}</p>
              </div>
            </div>
            <p class="rank-xp">${escapeHtml(xpLabel)}</p>
            <p class="rank-body">${escapeHtml(body)}</p>
            <p class="rank-unlock"><strong>${escapeHtml(t().sections.unlock)}</strong> ${escapeHtml(unlock)}</p>
            ${kitBtn}
          </article>`;
      })
      .join("");

    const marksHtml = (path.honorMarks || [])
      .map((mark) => {
        const title = isEn ? mark.titleEn : mark.titleKo;
        const body = isEn ? mark.bodyEn : mark.bodyKo;
        return `
          <article class="mark-card">
            <span class="mark-icon" aria-hidden="true">${mark.icon}</span>
            <h4>${escapeHtml(title)}</h4>
            <p class="mark-xp">${escapeHtml(t().sections.xpRequired)} ${mark.xpRequired}+</p>
            <p>${escapeHtml(body)}</p>
          </article>`;
      })
      .join("");

    const xpHtml = (path.xpActions || [])
      .map((action) => {
        const title = isEn ? action.titleEn : action.titleKo;
        return `<li><span>${escapeHtml(title)}</span><strong>+${action.xp} XP</strong></li>`;
      })
      .join("");

    root.innerHTML = `
      <p class="eduspace-mission">${escapeHtml(mission)}</p>
      <p class="eduspace-note">${escapeHtml(xpNote)}</p>
      <h3 class="eduspace-h3">${escapeHtml(t().sections.ranksTitle)}</h3>
      <div class="rank-grid">${ranksHtml}</div>
      <h3 class="eduspace-h3">${escapeHtml(t().sections.marksTitle)}</h3>
      <div class="mark-grid">${marksHtml}</div>
      <h3 class="eduspace-h3">${escapeHtml(t().sections.xpTitle)}</h3>
      <ul class="xp-list">${xpHtml}</ul>
    `;
  }

  function renderEduspacePath() {
    renderGrowthPath($("#eduspaceRoot"), getEduspacePath());
  }

  function renderIcanPath() {
    renderGrowthPath($("#icanRoot"), getIcanPath());
  }

  /* ── Drawer ── */

  function openDrawer(id) {
    const p = programById(id);
    if (!p) return;
    const content = programText(p);
    state.activeProgramId = id;

    $("#drawerEn").textContent = state.lang === "en" ? p.titleKo : p.titleEn;
    $("#drawerTitle").textContent = state.lang === "en" ? p.titleEn : p.titleKo;

    let levelsHtml = "";
    if (content.levels) {
      levelsHtml = `
        <h3>${escapeHtml(t().labels.levels)}</h3>
        <div class="level-box">
          <div><strong>${escapeHtml(t().labels.beginner)}</strong>${escapeHtml(content.levels.beginner)}</div>
          <div><strong>${escapeHtml(t().labels.intermediate)}</strong>${escapeHtml(content.levels.intermediate)}</div>
          <div><strong>${escapeHtml(t().labels.advanced)}</strong>${escapeHtml(content.levels.advanced)}</div>
        </div>`;
    }

    let campHtml = "";
    if (content.campExamples?.length) {
      campHtml = `
        <h3>${escapeHtml(t().labels.campExamples)}</h3>
        <ul>${content.campExamples.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
    }

    const tags = [
      ...(p.pathTypes || []).map(pathLabel),
      ...(p.audiences || []).map(audienceLabel),
      ...(p.metrics || []).map(metricTitle),
    ];

    $("#drawerBody").innerHTML = `
      <h3>${escapeHtml(t().labels.overview)}</h3>
      <p>${escapeHtml(content.overview)}</p>
      <div class="drawer-tags">${tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      <h3>${escapeHtml(t().labels.goals)}</h3>
      <ul>${content.goals.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ul>
      <h3>${escapeHtml(t().labels.activities)}</h3>
      <ul>${content.activities.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
      <h3>${escapeHtml(t().labels.outcomes)}</h3>
      <ul>${content.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
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
    btn.textContent = on ? t().buttons.drawerRemove : t().buttons.drawerAdd;
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
    $("#languageToggle").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lang]");
      if (!btn || btn.dataset.lang === state.lang) return;
      state.lang = btn.dataset.lang;
      saveLang();
      renderAll();
      toast(t().toasts.language);
    });

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

    const onPresetClick = (e) => {
      const loadBtn = e.target.closest("[data-load-preset]");
      if (loadBtn) {
        loadPresetKit(loadBtn.dataset.loadPreset, { replace: loadBtn.dataset.replace !== "false" });
        document.getElementById("kit")?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      const copyBtn = e.target.closest("[data-copy-preset]");
      if (copyBtn) {
        const preset = presetById(copyBtn.dataset.copyPreset);
        if (preset) copyText(buildPresetBrief(preset));
      }
    };
    $("#presetKitList")?.addEventListener("click", onPresetClick);
    $("#eduspaceRoot")?.addEventListener("click", onPresetClick);
    $("#icanRoot")?.addEventListener("click", onPresetClick);

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

  function renderAll() {
    renderStaticText();
    renderHero();
    renderModel();
    renderAudienceChips();
    renderPathChips();
    renderAudienceGrid();
    renderModes();
    renderMetrics();
    renderPriorities();
    renderCards();
    renderKit();
    renderPresetKits();
    renderEduspacePath();
    renderIcanPath();
    if (state.activeProgramId) openDrawer(state.activeProgramId);
  }

  function init() {
    renderAll();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
