import React from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex min-h-[calc(100dvh-134px)] w-full max-w-6xl items-center justify-between p-4 md:p-6">
      {children}
    </div>
  );
}
