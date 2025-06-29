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

// 한국 시간으로 날짜 생성하는 함수
const getKoreanTimeISOString = () => {
  const now = new Date();
  const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
  return koreanTime.toISOString();
};

// Firebase에서 프롬프트 템플릿 조회
const getPromptTemplate = async () => {
  try {
    const promptRef = db.collection("config").doc("ai-prompt");
    const promptDoc = await promptRef.get();

    if (!promptDoc.exists) {
      console.error("❌ AI 프롬프트 템플릿이 Firebase에 설정되지 않았습니다.");
      console.log("Firebase의 'config' 컬렉션에 'ai-prompt' 문서를 생성하고 프롬프트를 설정해주세요.");
      process.exit(1);
    }

    const promptData = promptDoc.data();
    return promptData.template || "";
  } catch (error) {
    console.error("프롬프트 템플릿 조회 실패:", error);
    process.exit(1);
  }
};

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
const createPrompt = async (existingAntipatterns, overusedTags) => {
  const promptTemplate = await getPromptTemplate();

  const existingInfo = existingAntipatterns
    .map((ap, index) => `${index + 1}. 제목: ${ap.title}, 요약: ${ap.summary}, 태그: ${ap.tags.join(", ")}`)
    .join("\n");

  // 프롬프트 템플릿의 플레이스홀더를 실제 데이터로 치환
  return promptTemplate
    .replace("{{EXISTING_ANTIPATTERNS}}", existingInfo)
    .replace("{{OVERUSED_TAGS}}", overusedTags.join(", "));
};

// AI 응답 파싱
const parseAIResponse = (responseText) => {
  if (!responseText) {
    console.error("응답 텍스트가 비어있습니다.");
    return null;
  }

  // 1. 코드 블록으로 감싸진 JSON 추출 시도
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
  const jsonBlockMatch = responseText.match(jsonBlockRegex);

  if (jsonBlockMatch) {
    try {
      const jsonContent = jsonBlockMatch[1].trim();
      console.log("코드 블록에서 JSON 추출됨:", jsonContent);
      return { ...JSON.parse(jsonContent), updatedAt: getKoreanTimeISOString() };
    } catch (error) {
      console.error("코드 블록 JSON 파싱 실패:", error);
    }
  }

  // 2. 코드블록 없이 중괄호로 감싸진 JSON 객체 찾기
  const jsonObjectRegex = /\{[\s\S]*\}/;
  const jsonObjectMatch = responseText.match(jsonObjectRegex);

  if (jsonObjectMatch) {
    try {
      const jsonContent = jsonObjectMatch[0];
      console.log("중괄호로 감싸진 JSON 추출됨:", jsonContent);
      return { ...JSON.parse(jsonContent), updatedAt: getKoreanTimeISOString() };
    } catch (error) {
      console.error("중괄호 JSON 파싱 실패:", error);
    }
  }

  // 3. 코드블록 없이 전체 텍스트에서 특수문자 처리
  try {
    const cleanedJSON = responseText.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");

    return { ...JSON.parse(cleanedJSON), updatedAt: getKoreanTimeISOString() };
  } catch (error) {
    console.error("첫 번째 파싱 시도 실패:", error);
  }

  // 4. 마지막 시도 (원본 텍스트 그대로)
  try {
    return { ...JSON.parse(responseText), updatedAt: getKoreanTimeISOString() };
  } catch (secondError) {
    console.error("모든 파싱 시도 실패:", secondError);
    console.error("원본 응답:", responseText);
    return null;
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
    id: antipattern?.id || getKoreanTimeISOString(),
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
    updatedAt: getKoreanTimeISOString(),
    viewCount: 0,
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
    const prompt = await createPrompt(existingAntipatterns, overusedTags);
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
