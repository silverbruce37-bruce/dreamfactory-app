# 드림팩토리 통합 성장 프로그램 앱

**Dream Factory Growth Programs**

학생이 더 많이 공부하는 곳이 아니라, **진단 → 설계 → 훈련 → 피드백 → 증명**으로 성장을 설계하는 드림팩토리의 프로그램 카탈로그·운영 키트입니다.

## 목적

기획안(`dreamfactory_program_plan.md`)의 10개 프로그램을 **앱 안에 구조화**해 두고, 상담·수업 설계·학부모 안내 때 **필요할 때마다 꺼내 쓰기** 위함입니다.

## 라이브 (Production)

| 항목 | URL |
|------|-----|
| **프로덕션** | https://dreamfactory-app.vercel.app |
| Vercel 대시보드 | https://vercel.com/ican-eduspaces-projects/dreamfactory-app |
| GitHub | https://github.com/silverbruce37-bruce/dreamfactory-app |

`main` 브랜치 push 시 Vercel 자동 배포가 연결됩니다.

## 로컬 실행

브라우저에서 바로 열 수 있습니다. (빌드 없음)

```bash
# 방법 1: 파일 직접 열기
open /Users/worker64/dreamfactory-app/index.html

# 방법 2: 로컬 서버
cd /Users/worker64/dreamfactory-app && python3 -m http.server 8791
# → http://localhost:8791
```

## 재배포

```bash
cd /Users/worker64/dreamfactory-app
vercel deploy --prod --yes
```

## 구성

| 파일 | 역할 |
|------|------|
| `index.html` | 앱 셸 · 섹션 레이아웃 |
| `styles.css` | UI |
| `app.js` | 필터, 상세 드로어, 키트, 클립보드 |
| `data/programs.js` | 10개 프로그램 + 성장 모델 + 대상별 운영 **소스 오브 트루스** |

## 기능

1. **프로그램 카드** — 한 화면 카탈로그 (아이캔 이중언어 트랙 포함)
2. **상세 드로어** — 개요, 목표, 주요 내용, 결과물, 수준별·캠프 예시
3. **필터** — 대상(초등 저/고, 중, 고), 경로 유형(약점 보완·강점 확장·진로 탐색·프로젝트 완성), 검색
4. **성장 키트** — 프로그램을 담아 두고, 브리프를 클립보드에 복사 (localStorage)
5. **성장 모델 5단계 · 성과 6축 · 운영 방식 · 실행 우선순위** 안내

## 프로그램 (메뉴)

1. AI Learning Lab  
2. Global Reading & Writing  
3. Speech & Debate Studio  
4. Book Club & Research Mission  
5. Coding & Creative Project  
6. Roadmap FutureLab *(대표)*  
7. Christian Leadership  
8. Parent Partnership  
9. Teacher Growth Lab *(내부)*  
10. Vacation Intensive Camp *(대표)*  
11. AI Homework & School Task Studio *(대표)*  
12. Overseas Local AX × English Startup Incubator *(대표 · 해외 시장)*  
13. Space Cadet Foundations *(대표 · 예비우주인)*  
14. Stellar Traveler · EduSpace Astronaut *(대표 · 항성여행자/우주인)*  
15. iCAN Bilingual Placement Studio *(대표 · 이중언어 진단)*  
16. iCAN Narrative & Description Track *(대표 · G1–3 서술묘사)*  
17. iCAN Explain & Argue Track *(대표 · G4–6·틴 설명논증)*  
18. iCAN Input Core *(인풋코어)*  
19. iCAN Teen & Youth Global Voice *(대표 · 틴·청년)*  
20. iCAN Korea Home Bilingual Partnership *(한국 가정 이머전)*  

### 아이캔 이중언어 진급 (XP)

대한민국에서 드림팩토리를 통해 아이캔을 이용하는 아이·틴에이저·청년을 위한 경로입니다. 회화·입시가 아니라 **읽고 생각하고 서술·논증·설득으로 증명**합니다.

| 단계 | XP | 의미 |
|------|-----|------|
| 씨앗 서술가 | 0–99 | G1–3 Read–Picture–Tell–Write |
| 다리 논증가 | 100–299 | G4–6·틴 Explain–Argue |
| 글로벌 보이스 | 300+ | 틴·청년 설득·TED·실전 언어 |

조음력 명예마크: 서술 → 묘사 → 설명 → 논증 → 설득·TED

### 추천 키트

- **아이캔 키즈 이중언어 키트** (`kit-ican-kids`)  
  - 포함: p15 + p16 + p18 + Global R&W + Speech + 한국 가정 파트너십  
  - 단계: 진단 → 인풋코어 → 장면 그리기·말하기 → 서술·묘사 쓰기 → 가정 미션 증명  
  - 명예마크: 서술 → 묘사  
- **아이캔 틴 이중언어 키트** (`kit-ican-teen`)  
  - 포함: p15 + p17 + p18 + p19 + Global R&W + Speech  
  - 단계: 재진단 → 스키마 설명 → 근거 논증 → 사고 전환 → 3분 브리핑  
  - 명예마크: 설명 → 논증  
- **아이캔 청년 글로벌 보이스 키트** (`kit-ican-youth`)  
  - 포함: p15 + p18 + p19 + Speech + FutureLab + 해외 인큐베이팅  
  - 단계: 보이스 진단 → 학술·직장 언어 → 설득 퍼포먼스 → 진로 연결 → 포트폴리오  
  - 명예마크: 논증 → 설득·TED  

- **예비우주인 기초 학습 키트** (`kit-eduspace-cadet`)  
  - 포함: p13 + AI Learning Lab + Global R&W + Book Club + Coding  
  - 단계: 우주 지도 → 빛·중력·궤도 → 별·은하 → 로켓·우주인 생활 → 자격 증명  
  - 명예마크: 성운 입문 → 궤도 탐색가  
- **항성여행자 · 에듀스페이스 우주인 키트** (`kit-eduspace-traveler`)  
  - 포함: p14 + p13 + Global R&W + Speech + Coding + FutureLab  
  - 단계: 항성 미션 설계 → 데이터·모형·코딩 → 영어 브리핑 → 팀 미션 → 명예마크·포트폴리오  
  - 명예마크: 궤도 → 항성 → 은하 → 명예 우주인 (XP 기반)  
- **해외 로컬시장 인큐베이팅 키트** (`kit-overseas-ax-startup`)  
  - 포함: p12 + AI Learning Lab + Global R&W + Speech + Coding + FutureLab  
  - 단계: 시장 진단 → Ax 설계 → 영어 스타트업 훈련 → 로컬 검증 → 포트폴리오 증명  
  - 키트 섹션에서 원클릭 담기 · 브리프 복사 가능  

### 에듀스페이스 진급 (XP)

| 단계 | XP | 의미 |
|------|-----|------|
| 예비우주인 | 0–99 | 우주 기초 배경지식 |
| 항성여행자 | 100–299 | 본격 미션·브리핑 |
| 에듀스페이스 우주인 | 300+ | 명예마크 수여 |

## 데이터 수정

프로그램 내용·목표·결과물을 바꾸려면 `data/programs.js`만 수정하면 됩니다. UI는 자동 반영됩니다.

## 다음 단계 (기획 실행 우선순위)

1. 홈페이지/포털에 이 앱 링크 연결  
2. 아이캔 이중언어 진단(레벨테스트)과 드림팩토리 배치 연결  
3. 진단·상담 플로우와 신청 전 단계 연결  
4. 학부모용 성장 리포트 샘플 추가  
5. FutureLab · 방학 캠프 운영 템플릿 심화  
6. 교사 품질 관리 매뉴얼 연동   

## 슬로건

> AI 시대, 아이의 배움과 비전을 설계합니다.
