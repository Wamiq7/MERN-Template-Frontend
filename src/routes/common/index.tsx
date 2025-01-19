import { lazy } from 'react';

const Authenticating = lazy(() => import('@/pages/common/authenticating'));
const NotFoundPage = lazy(() => import('@/pages/common/404'));

export const commonRoutes = [
  {
    path: '/authenticating',
    element: <Authenticating />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
