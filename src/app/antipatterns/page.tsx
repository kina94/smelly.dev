import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import ArticlePreview from "@/widgets/ArticlePreview";

async function getAntipatterns() {
  const antipatterns = await adminDb.collection("antipatterns").orderBy("updatedAt", "desc").get();
  return antipatterns.docs.map((doc) => {
    const data = doc.data();
    // Firebase 데이터를 직렬화 가능한 형태로 변환
    return JSON.parse(
      JSON.stringify({
        ...data,
        id: doc.id,
      }),
    ) as Antipattern;
  });
}

export default async function AntipatternsPage() {
  const antipatterns = await getAntipatterns();

  return (
    <div className="h-[calc(100vh-330px)]">
      <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col gap-12">
        {antipatterns.map((antipattern, index) => (
          <ArticlePreview key={antipattern.id} antipattern={antipattern} index={index} />
        ))}
      </div>
      <div className="sticky top-0 bg-white z-10 pb-4">pageNation</div>
    </div>
  );
}
