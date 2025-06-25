import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  getExistingAntipatterns,
  analyzeTagFrequency,
  createPrompt,
  parseAIResponse,
  validateAntipattern,
  checkTitleDuplicate,
  saveAntipattern,
} from "./utils";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_KEY,
});

// 에러 처리
function handleError(error: unknown): NextResponse {
  if (error && typeof error === "object" && "message" in error) {
    const geminiError = error as { message: string };
    if (geminiError.message?.includes("quota") || geminiError.message?.includes("limit")) {
      return NextResponse.json(
        {
          success: false,
          error: "Gemini API 할당량이 초과되었습니다. 계정 설정을 확인해주세요.",
        },
        { status: 429 },
      );
    }
  }

  return NextResponse.json(
    { success: false, error: "안티패턴 생성 중 오류가 발생했습니다.", errorMessage: error },
    { status: 500 },
  );
}

export async function POST() {
  try {
    // 1. 기존 안티패턴 조회
    const existingAntipatterns = await getExistingAntipatterns();

    // 2. 태그 사용 빈도 분석
    const overusedTags = analyzeTagFrequency(existingAntipatterns);

    // 3. AI 프롬프트 생성 및 호출
    const prompt = createPrompt(existingAntipatterns, overusedTags);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Response text:", response.text, typeof response.text);

    // 4. AI 응답 파싱
    const antipattern = parseAIResponse(response.text || "");

    if (!antipattern) {
      return NextResponse.json({ success: false, error: "AI 응답을 파싱할 수 없습니다." }, { status: 400 });
    }

    // 5. 데이터 검증
    const validatedAntipattern = validateAntipattern(antipattern);

    // 6. 제목 중복 체크
    const duplicateCheck = await checkTitleDuplicate(validatedAntipattern.title);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "동일한 제목의 안티패턴이 이미 존재합니다.",
          existingAntipattern: duplicateCheck.existingAntipattern,
        },
        { status: 409 },
      );
    }

    // 7. Firebase에 저장
    await saveAntipattern(validatedAntipattern);

    return NextResponse.json({
      success: true,
      antipattern: validatedAntipattern,
      message: "안티패턴이 성공적으로 생성되고 저장되었습니다.",
    });
  } catch (error) {
    return handleError(error);
  }
}
