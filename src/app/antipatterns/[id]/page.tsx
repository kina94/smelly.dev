import Article from "@/components/Article/Article";
import React from "react";

async function getAntipattern(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/antipatterns/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("안티패턴을 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "안티패턴을 가져오는데 실패했습니다.");
  }

  return data.antipattern;
}

const AntiPatternDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const antipattern = await getAntipattern(id);

  return (
    <div className="h-[calc(100vh-370px)]">
      <Article key={id} antipattern={antipattern} />
    </div>
  );
};

export default AntiPatternDetail;
