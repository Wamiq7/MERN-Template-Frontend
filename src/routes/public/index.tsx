import { lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/public/login'));
const RegisterPage = lazy(() => import('@/pages/public/register'));
const VerifyOtp = lazy(() => import('@/pages/public/verify-otp'));
const ForgotPassword = lazy(() => import('@/pages/public/forgot-password'));
const ResetPassword = lazy(() => import('@/pages/public/reset-password'));
const TermOfService = lazy(() => import('@/pages/public/termofservice'));
const PrivacyPolicy = lazy(() => import('@/pages/public/privacypolicy'));
const ContactUs = lazy(() => import('@/pages/public/contactus'));
const OAuthCallback = lazy(() => import('@/pages/public/oauthcallback'));
const NotFoundPage = lazy(() => import('@/pages/common/404'));

export const publicRoutes = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify-otp/:mail',
    element: <VerifyOtp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/term-of-service',
    element: <TermOfService />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
  },
  {
    path: '/oauth-callback',
    element: <OAuthCallback />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
