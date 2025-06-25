# 🧠 오늘의 안티패턴 (Today's Antipattern)

> 이 프로젝트는 ChatGPT의 도움을 받아 기획하고 개발해보고 싶어서 시작한 개인 학습 및 실험 프로젝트입니다. AI 협업을 통해 실제로 실무에 적용 가능한 콘텐츠 생성 및 구조 설계를 경험해보고자 했습니다.

프론트엔드 개발자들을 위한 데일리 학습 웹앱입니다.  
매일 하나씩 실무에서 자주 발생하는 **프론트엔드 안티패턴**을 소개하며, 문제 원인부터 해결법, 전/후 코드 비교, 공식 링크까지 구조화된 학습 경험을 제공합니다.

> Next.js 14 + TypeScript + TailwindCSS + Firebase 기반으로 개발되었으며, FSD(Feature-Sliced Design) 아키텍처를 적용하였습니다.

---

## ✅ 주요 기능

- 📆 매일 새로운 프론트엔드 안티패턴 콘텐츠 제공
- 🤖 **GitHub Actions를 통한 매일 12시 자동 콘텐츠 생성**
- 🧠 문제 발생 원인 → 해결법 → 요약 → 전/후 코드 비교 → 공식 링크 순의 구성
- 🔗 `/article/today` API로 콘텐츠 로딩
- 📱 모바일 친화적인 UI + 다크 모드 지원 예정
- 🚀 Vercel을 통한 자동 배포

---

## 🤖 자동화 설정

### GitHub Actions 자동화

이 프로젝트는 GitHub Actions를 통해 매일 12시(UTC)에 자동으로 새로운 안티패턴을 생성하고 Firebase DB에 업로드합니다.

#### 1. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 환경변수들을 설정해주세요:

```
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-service-account-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key
GOOGLE_GENAI_API_KEY=your-google-genai-api-key
```

#### 2. Firebase 서비스 계정 키 설정

1. Firebase Console에서 프로젝트 설정 > 서비스 계정 탭으로 이동
2. "새 비공개 키 생성" 클릭
3. 다운로드된 JSON 파일에서 다음 정보를 추출:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (전체 private_key 문자열)

#### 3. Google Gemini API 키 설정

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에서 API 키 생성
2. 생성된 키를 `GOOGLE_GENAI_API_KEY`에 설정

#### 4. 워크플로우 확인

`.github/workflows/daily-antipattern.yml` 파일이 자동으로 매일 12시(UTC)에 실행됩니다.

수동 실행도 가능합니다:

1. GitHub 저장소의 Actions 탭으로 이동
2. "Daily Antipattern Generation" 워크플로우 선택
3. "Run workflow" 버튼 클릭

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
- **GitHub Actions** (자동화)

---

## 📦 설치 및 실행

```bash
pnpm install
pnpm dev
```

### 자동화 스크립트 테스트

```bash
npm run generate-antipattern
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

// ㄴ중에 글쓸때 참조
https://dev.to/algoorgoal/nextjs-tailwindcsse-pretendard-ponteu-jeogyonghagi-1g87
