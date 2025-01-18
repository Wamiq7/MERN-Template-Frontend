import React from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex max-w-6xl items-center justify-between p-4 md:p-6">
      {children}
    </div>
  );
}
