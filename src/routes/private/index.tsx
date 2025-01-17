import { lazy } from "react";

const NotFoundPage = lazy(() => import("@/pages/common/404"));

export const privateRoutes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
