import { Button } from "@/shared/ui";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          {/* 에러 아이콘 */}
          <div className="w-16 h-16 bg-semantic-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-semantic-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* 제목 */}
          <h3 className="text-2xl font-semibold text-foreground dark:text-[#EEEEEE] mb-2">오류가 발생했습니다</h3>

          {/* 에러 메시지 */}
          <p className="text-destructive mb-4 text-sm">{message}</p>
        </div>

        {/* 새로고침 버튼 */}
        <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
          새로고침
        </Button>
      </div>
    </div>
  );
}
