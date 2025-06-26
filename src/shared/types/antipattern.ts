export interface Antipattern {
  id?: string;
  title: string;
  whyWrong: string;
  howToFix: string;
  summary: string;
  beforeCode: string;
  afterCode: string;
  links: string[];
  tags: string[];
  type: "프론트엔드" | "백엔드" | "데이터베이스" | "기타";
  difficulty: "초급" | "중급" | "고급";
  updatedAt?: Date;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AntipatternResponse {
  success: boolean;
  antipattern?: Antipattern;
  antipatterns?: Antipattern[];
  pagination?: PaginationInfo;
  message?: string;
  error?: string;
}
