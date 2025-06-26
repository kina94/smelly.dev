import Article from "@/components/Article/Article";
import { getAntipattern } from "@/lib/antipattern";
import React from "react";

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
