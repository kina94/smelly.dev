import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { Title } from "@/shared/ui";
import ArticlePreview from "@/widgets/ArticlePreview";

async function getAntipatterns() {
  const antipatterns = await adminDb.collection("antipatterns").get();
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
    <div className="max-w-4xl mx-auto px-4">
      <Title title={"Antipatterns"} />
      <div className="flex flex-col gap-16">
        {antipatterns.map((antipattern) => (
          <ArticlePreview key={antipattern.id} antipattern={antipattern} />
        ))}
      </div>
    </div>
  );
}
