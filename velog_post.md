# 🚫 프론트엔드 안티패턴 학습 웹앱 개발기 - Day 1

> AI와 함께 만드는 실무 중심 학습 플랫폼

## 📋 오늘의 개발 일지

오늘은 **"오늘의 안티패턴"**이라는 프론트엔드 개발자들을 위한 데일리 학습 웹앱을 개발했다. ChatGPT와의 협업을 통해 기획하고 개발한 개인 학습 및 실험 프로젝트인데, 생각보다 많은 트러블슈팅을 겪었다.

### 🎯 프로젝트 목표

- 매일 하나씩 실무에서 자주 발생하는 **프론트엔드 안티패턴** 소개
- 문제 원인 → 해결법 → 전/후 코드 비교 → 공식 링크까지 구조화된 학습 경험 제공
- AI 협업을 통한 실제 실무 적용 가능한 콘텐츠 생성 및 구조 설계 경험

## 🛠️ 기술 스택

```
Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS
Backend: Firebase (Firestore)
AI: Google Gemini API
Architecture: FSD (Feature-Sliced Design)
Deployment: Vercel (예정)
```

## 🏗️ 프로젝트 구조 (FSD 기반)

```
src/
├── app/                # Next.js App Router
│   ├── api/           # API 라우트
│   │   └── antipattern/
│   │       ├── create/ # 안티패턴 생성 API
│   │       └── list/   # 안티패턴 목록 조회 API
│   ├── layout.tsx     # 루트 레이아웃
│   └── page.tsx       # 메인 페이지
├── entities/          # 핵심 도메인 단위
├── features/          # 사용자 행동 단위
├── widgets/           # UI 조합 영역
└── shared/            # 전역 UI, 유틸, 타입
    ├── types/         # TypeScript 타입 정의
    ├── config/        # Firebase 설정
    └── ui/            # 공통 UI 컴포넌트
```

## 🔧 개발 과정과 트러블슈팅

### 1. 안티패턴 데이터 모델 설계

먼저 안티패턴 데이터의 구조를 설계했다. TypeScript 인터페이스로 타입 안정성을 확보하려고 했는데, 처음에는 너무 복잡하게 설계할 뻔했다.

```typescript
export interface Antipattern {
  id?: string;
  title: string;
  whyWrong: string; // 문제점 설명
  howToFix: string; // 해결 방법
  summary: string; // 간단 요약
  beforeCode: string; // 문제가 있는 코드
  afterCode: string; // 수정된 코드
  links: string[]; // 관련 링크
  tags: string[]; // 태그 (JavaScript, React, CSS 등)
  type: "프론트엔드" | "백엔드" | "데이터베이스" | "기타";
  difficulty: "초급" | "중급" | "고급";
  updatedAt?: Date;
}
```

**트러블슈팅**: 처음에 `type`과 `difficulty`를 string으로 했는데, 나중에 유니온 타입으로 바꿨다. 이렇게 하니까 타입 안정성이 훨씬 좋아졌다.

### 2. AI 기반 안티패턴 생성 API - 가장 어려웠던 부분

Google Gemini API를 활용해서 자동으로 안티패턴 콘텐츠를 생성하는 API를 만들었다. 이게 오늘 가장 어려웠던 부분이었다.

**첫 번째 문제: JSON 파싱 에러**

```typescript
// 처음에는 이렇게 했는데 계속 파싱 에러가 났다
const antipattern = JSON.parse(response.text);
```

Gemini API가 반환하는 응답이 항상 깔끔한 JSON이 아니었다. 때로는 추가 설명이나 마크다운 코드블록이 포함되어 있어서 파싱이 실패했다.

**해결책:**

```typescript
// 줄바꿈과 공백을 정리하고, 두 번의 파싱 시도를 했다
const cleanedJSON = extractedJSON.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");

try {
  antipattern = JSON.parse(cleanedJSON);
} catch (error) {
  // 두 번째 시도: 원본 텍스트에서 직접 파싱
  try {
    antipattern = JSON.parse(extractedJSON);
  } catch (secondError) {
    antipattern = null;
  }
}
```

**두 번째 문제: 중복 콘텐츠 생성**
AI가 비슷한 내용의 안티패턴을 계속 생성하는 문제가 있었다.

**해결책:**

```typescript
// 기존 안티패턴들을 조회하여 중복 방지
const existingAntipatterns = existingSnapshot.docs.map((doc) => {
  const data = doc.data();
  return {
    title: data.title,
    summary: data.summary,
    tags: data.tags || [],
  };
});

// 최근 사용된 태그 분석
const recentTags = existingAntipatterns.slice(0, 5).flatMap((ap) => ap.tags);
const tagFrequency: { [key: string]: number } = {};
recentTags.forEach((tag) => {
  tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
});

// 자주 사용된 태그들을 피해서 새로운 태그 조합 사용
const overusedTags = Object.entries(tagFrequency)
  .filter(([, count]) => count >= 3)
  .map(([tag]) => tag);
```

이렇게 하니까 AI가 더 다양한 주제의 안티패턴을 생성하게 되었다.

### 3. 마크다운 렌더링 문제

React Markdown을 사용해서 AI가 생성한 콘텐츠를 렌더링하려고 했는데, 줄바꿈 처리가 어려웠다.

**문제**: AI가 생성한 텍스트에서 `\n`이 실제 줄바꿈으로 변환되지 않았다.

**해결책**:

```typescript
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
  {antipattern.whyWrong.replace(/\\n/g, "\n")}
</ReactMarkdown>;
```

`replace(/\\n/g, "\n")`로 이스케이프된 줄바꿈을 실제 줄바꿈으로 변환했다.

### 4. Firebase 연동에서 겪은 문제

Firebase Admin SDK 설정이 처음에는 복잡했다. 환경변수 설정과 서비스 계정 키 파일 관리가 까다로웠다.

**문제**: 개발 환경에서 Firebase Admin SDK 초기화가 안 됐다.

**해결책**:

```typescript
// firebase-admin.ts
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}");

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminDb = getFirestore();
```

환경변수에 서비스 계정 키를 JSON 문자열로 저장하고, 파싱해서 사용했다.

### 5. UI 상태 관리의 복잡성

로딩 상태, 에러 상태, 성공 상태를 모두 관리하려고 하니까 코드가 복잡해졌다.

**문제**: 여러 상태를 동시에 관리하면서 UI가 깜빡이거나 상태가 꼬이는 현상이 있었다.

**해결책**:

```typescript
const [loading, setLoading] = useState(false);
const [antipatterns, setAntipatterns] = useState<Antipattern[]>([]);
const [message, setMessage] = useState("");

// 각 작업 시작할 때마다 메시지 초기화
const createAntipattern = async () => {
  setLoading(true);
  setMessage(""); // 메시지 초기화

  try {
    // ... API 호출
  } catch (error) {
    setMessage(`❌ 네트워크 오류: ${error}`);
  } finally {
    setLoading(false);
  }
};
```

각 작업 시작 시 메시지를 초기화하고, finally 블록에서 로딩 상태를 해제하도록 했다.

## 🎨 UI/UX 구현

메인 페이지는 간단하게 만들었다:

- **안티패턴 생성 버튼**: AI를 통한 새로운 콘텐츠 생성
- **목록 불러오기 버튼**: 기존 안티패턴 조회
- **실시간 상태 표시**: 로딩 상태 및 결과 메시지
- **카드 형태의 콘텐츠 표시**: 태그, 난이도, 제목, 내용을 구조화하여 표시

TailwindCSS를 사용해서 모바일 친화적으로 만들었는데, 생각보다 쉽게 반응형을 구현할 수 있었다.

## 💡 오늘 배운 점

### 1. AI API 활용의 어려움

- **JSON 파싱**: AI 응답은 항상 예측하기 어려워서 여러 단계의 파싱 로직이 필요하다
- **할당량 관리**: API 호출 횟수를 제한해야 한다
- **중복 방지**: AI가 비슷한 내용을 생성하지 않도록 로직이 필요하다

### 2. FSD 아키텍처의 장점

처음에는 폴더 구조가 복잡해 보였는데, 실제로 개발해보니 코드 관리가 훨씬 쉬웠다. 기능별로 분리되어 있어서 나중에 기능을 추가하기도 편했다.

### 3. TypeScript의 중요성

런타임 에러를 미리 잡을 수 있어서 디버깅 시간이 많이 줄었다. 특히 API 응답 타입을 명확히 정의하니까 개발할 때 훨씬 안심이 됐다.

## 🚀 내일 할 일

- [ ] 북마크 기능 구현
- [ ] 지난 콘텐츠 아카이브 페이지
- [ ] 태그 필터 및 검색 기능
- [ ] Vercel 배포

## 📝 마무리

오늘은 AI와 함께하는 프론트엔드 학습 플랫폼의 기초를 다졌다. 생각보다 많은 트러블슈팅을 겪었지만, 하나씩 해결해나가면서 많이 배웠다. 특히 AI API 활용과 JSON 파싱 부분에서 시간을 많이 썼는데, 이제는 더 안정적으로 작동한다.

내일은 사용자 경험을 더욱 향상시키는 기능들을 추가하고, 실제 배포까지 진행해보겠다! 🚀

---

**#프론트엔드 #Next.js #TypeScript #AI #Firebase #FSD #개발일지 #트러블슈팅**
