import { lazy } from 'react';

const NotFoundPage = lazy(() => import('@/pages/common/404'));
const Users = lazy(() => import('@/pages/private/users'));
const Profile = lazy(() => import('@/pages/private/profile'));

export const privateRoutes = [
  {
    path: '/',
    element: <Users />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
