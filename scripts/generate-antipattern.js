/* eslint-disable */
const { GoogleGenAI } = require("@google/genai");
const admin = require("firebase-admin");

require("dotenv").config(); // <-- 이거 꼭 넣어야 .env에서 불러옵니다

// 환경변수 검증
const requiredEnvVars = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY", "GOOGLE_AI_KEY"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ 필수 환경변수가 누락되었습니다: ${envVar}`);
    process.exit(1);
  }
}

console.log("✅ 환경변수 검증 완료");

// Firebase Admin SDK 초기화
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

console.log("Firebase 설정:", {
  projectId: serviceAccount.projectId,
  clientEmail: serviceAccount.clientEmail,
  privateKeyLength: serviceAccount.privateKey?.length || 0,
});

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const db = admin.firestore();
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_KEY,
});

// 기존 안티패턴 조회
const getExistingAntipatterns = async () => {
  try {
    const existingAntipatternsRef = db.collection("antipatterns");
    const existingSnapshot = await existingAntipatternsRef.orderBy("updatedAt", "desc").limit(20).get();

    return existingSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        title: data.title,
        summary: data.summary,
        tags: data.tags || [],
      };
    });
  } catch (error) {
    console.error("기존 안티패턴 조회 실패:", error);
    return [];
  }
};

// 태그 사용 빈도 분석
const analyzeTagFrequency = (antipatterns) => {
  const recentTags = antipatterns.slice(0, 5).flatMap((ap) => ap.tags);
  const tagFrequency = {};

  recentTags.forEach((tag) => {
    tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
  });

  return Object.entries(tagFrequency)
    .filter(([, count]) => count >= 3)
    .map(([tag]) => tag);
};

// AI 프롬프트 생성
const createPrompt = (existingAntipatterns, overusedTags) => {
  const existingInfo = existingAntipatterns
    .map((ap, index) => `${index + 1}. 제목: ${ap.title}, 요약: ${ap.summary}, 태그: ${ap.tags.join(", ")}`)
    .join("\n");

  return `너는 프론트엔드 안티패턴 학습 콘텐츠를 생성하는 AI야.

⚠️ 매우 중요한 제약사항:
1. 아래 기존에 생성된 안티패턴들과 절대 중복되지 않는 새로운 안티패턴을 만들어야 해.
2. 제목, 내용, 개념이 비슷하거나 유사한 것은 절대 생성하지 마.
3. 최근에 자주 사용된 태그들(${overusedTags.join(", ")})은 피해서 다른 태그 조합을 사용해줘.

기존 안티패턴 목록:
${existingInfo}

위 목록과 완전히 다른 새로운 안티패턴을 아래 형식으로 한 개만 만들어줘. 바로 파싱할거니까 코드블록 없이 응답해줘.

{
  "id": "오늘의 날짜와 시간",
  "title": "안티패턴 제목 (이모지 포함 가능)",
  "whyWrong": "왜 이 패턴이 문제인지 설명",
  "howToFix": "어떻게 수정해야 하는지 설명",
  "summary": "간단한 요약",
  "beforeCode": "문제가 있는 코드 예시",
  "afterCode": "수정된 코드 예시",
  "links": ["관련 링크1", "관련 링크2"],
  "tags": ["JavaScript","TypeScript","React","CSS","HTML/접근성","UX","성능","보안","상태관리","테스트","빌드&번들링","애니메이션/UI","컴포넌트","네이밍&구조"],
  "type": "프론트엔드|백엔드|데이터베이스|기타",
  "difficulty": "초급|중급|고급",
  "updatedAt": "오늘의 날짜와 시간"
}

내부 콘텐츠는 마크다운 문법으로 만들어.
내용은 tags를 기반으로 실제 프론트엔드 실무에 흔히 있는 문제를 중심으로 유익하게 만들어줘.
코드 예시는 React, JS 중심이며, 보안/접근성/렌더링/UX 등 여러 주제를 고루 포함할 수 있어야 해.
이러한 현상이 왜 일어나는지 디테일하게 접근해줘. (예시: translate는 레이아웃을 발생시키지 않고 리페인트만 발생시키기 때문에 position보다 translate를 사용하는 것이 더 빠릅니다.)
퀄리티가 중요하니까 신경써서 생성해줘.

다시 한 번 강조하지만, 위 기존 목록과 절대 중복되지 않는 완전히 새로운 안티패턴을 만들어야 해.`;
};

// AI 응답 파싱
const parseAIResponse = (responseText) => {
  try {
    const cleanedJSON = responseText.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");

    return JSON.parse(cleanedJSON);
  } catch (error) {
    console.error("첫 번째 파싱 시도 실패:", error);

    try {
      return JSON.parse(responseText);
    } catch (secondError) {
      console.error("두 번째 파싱 시도도 실패:", secondError);
      return null;
    }
  }
};

// 제목 중복 체크
const checkTitleDuplicate = async (title) => {
  try {
    const titleCheckRef = db.collection("antipatterns");
    const titleCheckSnapshot = await titleCheckRef.where("title", "==", title).get();

    return !titleCheckSnapshot.empty;
  } catch (error) {
    console.error("제목 중복 체크 실패:", error);
    return false;
  }
};

// 안티패턴 데이터 검증 및 기본값 설정
const validateAntipattern = (antipattern) => {
  return {
    id: antipattern?.id || new Date().toISOString(),
    title: antipattern?.title || "제목 없음",
    whyWrong: antipattern?.whyWrong || "설명 없음",
    howToFix: antipattern?.howToFix || "해결 방법 없음",
    summary: antipattern?.summary || "요약 없음",
    beforeCode: antipattern?.beforeCode || "",
    afterCode: antipattern?.afterCode || "",
    links: Array.isArray(antipattern?.links) ? antipattern.links : [],
    tags: Array.isArray(antipattern?.tags) ? antipattern.tags : [],
    type: antipattern?.type || "기타",
    difficulty: antipattern?.difficulty || "중급",
    updatedAt: new Date(),
  };
};

// Firebase에 저장
const saveAntipattern = async (antipattern) => {
  try {
    const antipatternRef = db.collection("antipatterns");
    await antipatternRef.add(antipattern);
    console.log("안티패턴이 성공적으로 저장되었습니다:", antipattern.title);
    return true;
  } catch (error) {
    console.error("Firebase 저장 실패:", error);
    return false;
  }
};

// 메인 함수
const generateAndSaveAntipattern = async () => {
  console.log("🚀 안티패턴 자동 생성 시작...");

  try {
    // 1. 기존 안티패턴 조회
    console.log("📋 기존 안티패턴 조회 중...");
    const existingAntipatterns = await getExistingAntipatterns();
    console.log(`기존 안티패턴 ${existingAntipatterns.length}개 발견`);

    // 2. 태그 사용 빈도 분석
    const overusedTags = analyzeTagFrequency(existingAntipatterns);
    console.log("자주 사용된 태그:", overusedTags);

    // 3. AI 프롬프트 생성 및 호출
    console.log("🤖 AI에게 안티패턴 생성 요청 중...");
    const prompt = createPrompt(existingAntipatterns, overusedTags);
    const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
    const responseText = response.text;

    console.log("AI 응답 받음", responseText);

    // 4. AI 응답 파싱
    const antipattern = parseAIResponse(responseText || "");

    if (!antipattern) {
      console.error("❌ AI 응답을 파싱할 수 없습니다.");
      process.exit(1);
    }

    console.log("✅ AI 응답 파싱 완료:", antipattern.title);

    // 5. 데이터 검증
    const validatedAntipattern = validateAntipattern(antipattern);

    // 6. 제목 중복 체크
    const isDuplicate = await checkTitleDuplicate(validatedAntipattern.title);
    if (isDuplicate) {
      console.error("❌ 동일한 제목의 안티패턴이 이미 존재합니다:", validatedAntipattern.title);
      process.exit(1);
    }

    // 7. Firebase에 저장
    const saveSuccess = await saveAntipattern(validatedAntipattern);

    if (saveSuccess) {
      console.log("🎉 안티패턴 자동 생성 완료!");
      console.log("제목:", validatedAntipattern.title);
      console.log("태그:", validatedAntipattern.tags.join(", "));
      console.log("난이도:", validatedAntipattern.difficulty);
    } else {
      console.error("❌ 저장 실패");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ 안티패턴 생성 중 오류 발생:", error);
    process.exit(1);
  }
};

// 스크립트 실행
if (require.main === module) {
  generateAndSaveAntipattern()
    .then(() => {
      console.log("✅ 스크립트 실행 완료");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ 스크립트 실행 실패:", error);
      process.exit(1);
    });
}

module.exports = { generateAndSaveAntipattern };
