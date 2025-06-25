// 타입 정의
export interface AntipatternData {
  title: string;
  summary: string;
  tags: string[];
}

export interface GeneratedAntipattern {
  id?: string;
  title?: string;
  whyWrong?: string;
  howToFix?: string;
  summary?: string;
  beforeCode?: string;
  afterCode?: string;
  links?: string[];
  tags?: string[];
  type?: string;
  difficulty?: string;
  updatedAt?: string;
}

export interface ValidatedAntipattern {
  id: string;
  title: string;
  whyWrong: string;
  howToFix: string;
  summary: string;
  beforeCode: string;
  afterCode: string;
  links: string[];
  tags: string[];
  type: string;
  difficulty: string;
  updatedAt: Date;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  existingAntipattern?: {
    id: string;
    title: string;
    summary: string;
    whyWrong: string;
    howToFix: string;
    beforeCode: string;
    afterCode: string;
    links: string[];
    tags: string[];
    type: string;
    difficulty: string;
    updatedAt: Date;
  };
}
