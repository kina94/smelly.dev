"use client";

import { useState } from "react";
import { Antipattern } from "@/shared/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [antipatterns, setAntipatterns] = useState<Antipattern[]>([]);
  const [message, setMessage] = useState("");

  // 안티패턴 생성
  const createAntipattern = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/antipattern/create", {
        method: "POST",
      });

      // 응답 상태 확인
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          // 중복 오류인 경우
          setMessage(`⚠️ ${errorData.error} 다시 시도해주세요.`);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답 텍스트 확인
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      // JSON 파싱
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);

        // 두 번째 시도: 응답에서 JSON 부분만 추출
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
            console.log("JSON 추출 후 파싱 성공:", data);
          } else {
            setMessage(`❌ JSON 파싱 오류: ${responseText.substring(0, 200)}...`);
            return;
          }
        } catch (secondError) {
          console.error("두 번째 파싱 시도도 실패:", secondError);
          setMessage(`❌ JSON 파싱 오류: ${responseText.substring(0, 200)}...`);
          return;
        }
      }

      if (data.success) {
        setMessage("✅ 안티패턴이 성공적으로 생성되었습니다!");
        // 새로 생성된 안티패턴을 목록에 추가
        if (data.antipattern) {
          setAntipatterns((prev) => [data.antipattern, ...prev]);
        }
      } else {
        setMessage(`❌ 오류: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage(`❌ 네트워크 오류: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // 안티패턴 목록 조회
  const fetchAntipatterns = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/antipattern/list");
      const data = await response.json();

      console.log("API 응답:", data);
      if (data.success) {
        console.log("불러온 안티패턴 개수:", data.antipatterns?.length);
        setAntipatterns(data.antipatterns || []);
        setMessage(`📋 총 ${data.antipatterns?.length || 0}개의 안티패턴을 불러왔습니다.`);
      } else {
        setMessage(`❌ 오류: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ 네트워크 오류: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (date: Date | string | unknown) => {
    // Firebase Timestamp 객체 처리
    if (date && typeof date === "object" && date !== null) {
      const dateObj = date as { _seconds?: number; _nanoseconds?: number; toDate?: () => Date };
      if (dateObj._seconds) {
        // Firebase Timestamp 객체
        return new Date(dateObj._seconds * 1000).toLocaleDateString("ko-KR");
      } else if (dateObj.toDate) {
        // Firebase Timestamp 객체 (toDate 메서드가 있는 경우)
        return dateObj.toDate().toLocaleDateString("ko-KR");
      }
    }

    // 문자열인 경우
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("ko-KR");
    }

    // Date 객체인 경우
    if (date instanceof Date) {
      return date.toLocaleDateString("ko-KR");
    }

    // 기타 경우
    return "날짜 없음";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🚫 안티패턴 생성기</h1>

        {/* 버튼 영역 */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={createAntipattern}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? "🔄 생성 중..." : "✨ 새 안티패턴 생성"}
          </button>

          <button
            onClick={fetchAntipatterns}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? "🔄 로딩 중..." : "📋 목록 불러오기"}
          </button>
        </div>

        {/* 메시지 */}
        {message && (
          <div
            className={`text-center mb-6 p-4 rounded-lg shadow ${
              message.includes("⚠️")
                ? "bg-yellow-50 border border-yellow-200"
                : message.includes("❌")
                ? "bg-red-50 border border-red-200"
                : "bg-white"
            }`}
          >
            <p
              className={`${
                message.includes("⚠️") ? "text-yellow-800" : message.includes("❌") ? "text-red-700" : "text-gray-700"
              }`}
            >
              {message}
            </p>
          </div>
        )}

        {/* 안티패턴 목록 */}
        {antipatterns.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">📚 안티패턴 목록</h2>
            {antipatterns.map((antipattern, index) => (
              <div key={antipattern.id || index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{antipattern.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{antipattern.type}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {antipattern.difficulty}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-red-600 mb-2">❌ 문제점</h4>
                    <div className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mb-2 [&>p]:mb-2 [&>strong]:font-bold [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {antipattern.whyWrong.replace(/\\n/g, "\n")}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-600 mb-2">✅ 해결 방법</h4>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {antipattern.howToFix.replace(/\\n/g, "\n")}
                    </ReactMarkdown>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-600 mb-2">📝 요약</h4>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {antipattern.summary.replace(/\\n/g, "\n")}
                    </ReactMarkdown>
                  </div>

                  {antipattern.beforeCode && (
                    <div>
                      <h4 className="font-medium text-red-600 mb-2">🚫 문제 코드</h4>
                      <pre className="bg-red-50 p-3 rounded text-sm overflow-x-auto">
                        <code>
                          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                            {antipattern.beforeCode}
                          </ReactMarkdown>
                        </code>
                      </pre>
                    </div>
                  )}

                  {antipattern.afterCode && (
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">✅ 개선 코드</h4>
                      <pre className="bg-green-50 p-3 rounded text-sm overflow-x-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{antipattern.afterCode}</ReactMarkdown>
                      </pre>
                    </div>
                  )}

                  {antipattern.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-600 mb-2">🏷️ 태그</h4>
                      <div className="flex gap-2 flex-wrap">
                        {antipattern.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    업데이트: {antipattern.updatedAt ? formatDate(antipattern.updatedAt) : "날짜 없음"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
