import { FallbackProps } from 'react-error-boundary';
import Button from './ui/Button';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center h-full p-4 bg-red-50 text-red-800"
    >
      <h2 className="text-lg font-semibold mb-2">이런, 문제가 발생했습니다.</h2>
      <p className="mb-4">오류: {error.message}</p>
      <Button
        variant="secondary"
        onClick={resetErrorBoundary}
        className="bg-red-100 hover:bg-red-200 text-red-800"
      >
        다시 시도
      </Button>
    </div>
  );
}

export default ErrorFallback;
