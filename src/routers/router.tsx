import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/UserPages/HomePage/HomePage'; // Adjust the import path as necessary
import LoginPage from '@/pages/AuthPages/LoginPage';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import ForgotPasswordPage from '@/pages/AuthPages/ForgotPasswordPage';

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
]);
export default router;
