import { useRoutes } from "react-router-dom";
import { commonRoutes } from "./common";
import { privateRoutes } from "./private";
import { publicRoutes } from "./public";
import { authService } from "@/shared/services/auth.service";

const { useAuth } = authService;

export const AppRoutes = () => {
  const isSignIn = useAuth();
  // const isSignIn = true;
  const routes = isSignIn ? privateRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
