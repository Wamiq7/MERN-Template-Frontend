import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/public/login"));
const RegisterPage = lazy(() => import("@/pages/public/register"));
const TermOfService = lazy(() => import("@/pages/public/termofservice"));
const PrivacyPolicy = lazy(() => import("@/pages/public/privacypolicy"));
const NotFoundPage = lazy(() => import("@/pages/common/404"));

export const publicRoutes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/term-of-service",
    element: <TermOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
