import PageWrapper from "@/components/PageWrapper";
import { authService } from "@/shared/services/auth.service";
import { useEffect } from "react";

export default function Authenticating() {
  const { mutateAsync: oAuthCallback } = authService.useOAuthCallback();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tokenFromUrl = params.get("token");
    if (tokenFromUrl) {
      oAuthCallback(tokenFromUrl);
    }
  }, []);

  return (
    <PageWrapper>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    </PageWrapper>
  );
}
