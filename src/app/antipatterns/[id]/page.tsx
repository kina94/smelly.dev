import { adminDb } from "@/shared/config/firebase-admin";
import Article from "@/components/Article/Article";
import React from "react";

async function getAntipattern(id: string) {
  const antipattern = await adminDb.collection("antipatterns").doc(id).get();
  const data = antipattern.data();

  // Firebase 데이터를 직렬화 가능한 형태로 변환
  return JSON.parse(
    JSON.stringify({
      ...data,
      id: antipattern.id, // 문서 ID를 사용
    }),
  );
}

const AntiPatternDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const antipattern = await getAntipattern(id);

  return (
    <div className="h-[calc(100vh-320px)]">
      <Article key={id} antipattern={antipattern} />
    </div>
  );
};

export default AntiPatternDetail;
