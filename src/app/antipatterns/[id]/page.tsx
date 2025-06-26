import Article from "@/components/Article/Article";
import { getAntipattern } from "@/lib/antipattern";
import React from "react";

const AntiPatternDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const antipattern = await getAntipattern(id);

  return <Article key={id} antipattern={antipattern} />;
};

export default AntiPatternDetail;
