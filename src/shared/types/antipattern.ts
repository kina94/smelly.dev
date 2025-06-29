export interface Antipattern {
  id?: string;
  title: string;
  whyWrong: string;
  howToFix: string;
  summary: string;
  beforeCode: string;
  afterCode: string;
  links: { relatedTo: string; link: string }[];
  tags: string[];
  type: string[];
  difficulty: "초급" | "중급" | "고급";
  updatedAt: string;
  viewCount: number;
  lastViewed: string;
}
