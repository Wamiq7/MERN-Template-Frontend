import { authService } from '@/shared/services/auth.service';

export default function index() {
  const { data } = authService.useOAuthCallback();

  return (
    <div className="flex h-[calc(100dvh-65.1px)] w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        <p className="text-gray-500 dark:text-gray-400">Authenticating...</p>
      </div>
    </div>
  );
}
