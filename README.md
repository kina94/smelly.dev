# 🧠 오늘의 안티패턴 (Today's Antipattern)

> 이 프로젝트는 ChatGPT의 도움을 받아 기획하고 개발해보고 싶어서 시작한 개인 학습 및 실험 프로젝트입니다. AI 협업을 통해 실제로 실무에 적용 가능한 콘텐츠 생성 및 구조 설계를 경험해보고자 했습니다.

프론트엔드 개발자들을 위한 데일리 학습 웹앱입니다.  
매일 하나씩 실무에서 자주 발생하는 **프론트엔드 안티패턴**을 소개하며, 문제 원인부터 해결법, 전/후 코드 비교, 공식 링크까지 구조화된 학습 경험을 제공합니다.

> Next.js 14 + TypeScript + TailwindCSS + Firebase 기반으로 개발되었으며, FSD(Feature-Sliced Design) 아키텍처를 적용하였습니다.

---

## ✅ 주요 기능

- 📆 매일 새로운 프론트엔드 안티패턴 콘텐츠 제공
- 🧠 문제 발생 원인 → 해결법 → 요약 → 전/후 코드 비교 → 공식 링크 순의 구성
- 🔗 `/article/today` API로 콘텐츠 로딩
- 📱 모바일 친화적인 UI + 다크 모드 지원 예정
- 🚀 Vercel을 통한 자동 배포

---

## 📁 프로젝트 구조 (FSD 기반)

```
src/
├── app/                # Next.js App Router
├── entities/           # 핵심 도메인 단위 (예: article)
│   └── article/
│       ├── model/      # 타입, 상태
│       ├── ui/         # UI 컴포넌트 (예: ArticleCard)
│       └── lib/        # 도메인 로직 (예: 템플릿 파서)
├── features/           # 사용자 행동 단위 (예: 북마크)
├── widgets/            # UI 조합 영역 (예: TodayArticleSection)
├── shared/             # 전역 UI, 유틸, 타입
│   ├── ui/
│   ├── lib/
│   └── types/
└── styles/
```

---

## 🔧 기술 스택

- **Next.js 14 (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Firebase / GitHub Pages** (정적 콘텐츠 API용)
- **Vercel** (배포)
- **FSD (Feature-Sliced Design)**

---

## 📦 설치 및 실행

```bash
pnpm install
pnpm dev
```

---

## ✍️ 콘텐츠 형식 (예시)

```json
{
  "id": "2025-06-25-key-index",
  "title": "❌ React에서 key에 index 사용하기",
  "whyWrong": "...",
  "howToFix": "...",
  "summary": "...",
  "beforeCode": "...",
  "afterCode": "...",
  "links": [...],
  "tags": ["React", "Rendering", "AntiPattern"],
  "type": "렌더링",
  "difficulty": "중급"
}
```

---

## 📮 향후 계획

- [ ] 북마크 기능
- [ ] 지난 콘텐츠 아카이브
- [ ] 태그 필터 및 검색
- [ ] 모바일 최적화 UI 개선

---

## 📱 앱 배포 계획

- 본 프로젝트는 웹앱(FWA)으로 시작하며, 모바일 앱스토어(Android, iOS) 출시를 예정하고 있습니다.
- Capacitor 기반 WebView 패키징을 통해 App Store / Google Play 배포
- 향후 푸시 알림, 오프라인 캐시, 북마크 싱크 등 네이티브 기능을 점진적 지원 예정입니다.

---

## 🧑‍💻 제작자

- **프로젝트 기획 & 개발**: 김기나
- **콘텐츠 생성**: ChatGPT (자동화 API 기반)
