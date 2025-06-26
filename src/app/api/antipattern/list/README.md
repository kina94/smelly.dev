# 안티패턴 리스트 페이지네이션 API

## 개요

안티패턴 목록을 페이지네이션으로 조회하는 API입니다.

## 엔드포인트

```
GET /api/antipattern/list
```

## 쿼리 파라미터

- `page` (optional): 페이지 번호 (기본값: 1)
- `limit` (optional): 한 페이지당 항목 수 (기본값: 10, 최대: 100)

## 사용 예시

### 기본 조회 (첫 페이지, 10개씩)

```
GET /api/antipattern/list
```

### 특정 페이지 조회

```
GET /api/antipattern/list?page=2
```

### 페이지당 항목 수 지정

```
GET /api/antipattern/list?page=1&limit=20
```

## 응답 형식

### 성공 응답

```json
{
  "success": true,
  "antipatterns": [
    {
      "id": "antipattern_id",
      "title": "안티패턴 제목",
      "whyWrong": "왜 잘못되었는지",
      "howToFix": "어떻게 수정하는지",
      "summary": "요약",
      "beforeCode": "수정 전 코드",
      "afterCode": "수정 후 코드",
      "links": ["링크1", "링크2"],
      "tags": ["태그1", "태그2"],
      "type": "프론트엔드",
      "difficulty": "중급",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalCount": 50,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 에러 응답

```json
{
  "success": false,
  "error": "에러 메시지"
}
```

## 에러 코드

- `400`: 잘못된 페이지 번호 또는 limit 값
- `500`: 서버 내부 오류

## 정렬

- `updatedAt` 필드를 기준으로 내림차순 정렬 (최신순)
- 정렬이 실패할 경우 정렬 없이 조회
