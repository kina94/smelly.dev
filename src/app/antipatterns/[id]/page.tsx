import { adminDb } from "@/shared/config/firebase-admin";
import { Title } from "@/shared/ui";
import Article from "@/widgets/Article";
import React from "react";

async function getAntipattern(id: string) {
  const antipattern = await adminDb.collection("antipatterns").doc(id).get();
  const data = antipattern.data();
  // Firebase 데이터를 직렬화 가능한 형태로 변환
  return JSON.parse(
    JSON.stringify({
      ...data,
      id: antipattern.id,
    }),
  );
}

const AntiPatternDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  console.log(id);

  const antipattern = await getAntipattern(id);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Title title={"Details"} />
      <div className="flex flex-col gap-16">
        <Article key={id} antipattern={antipattern} />
      </div>
    </div>
  );
};

export default AntiPatternDetail;
