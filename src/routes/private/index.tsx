import { lazy } from "react";

const NotFoundPage = lazy(() => import("@/pages/common/404"));
const Users = lazy(() => import("@/pages/private/users"));

export const privateRoutes = [
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
