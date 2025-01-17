import { lazy } from "react";

const NotFoundPage = lazy(() => import("@/pages/common/404"));

export const commonRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
