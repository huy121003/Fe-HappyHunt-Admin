import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CLoadingPage, CNotFoundPage } from '@/components';
import RoleProtectedRoute from '@/components/layouts/RoleProtectedRoute';
import AdminLayout from '@/components/layouts/AdminLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import NoCategory from '@/features/categories/components/ui/NoCategory';

// Lazy load các trang

const LoginPage = lazy(() => import('@/pages/public/login/LoginPage'));
const CategoryPage = lazy(
  () => import('@/pages/private/categories/CategoryPage')
);
const CategoryCreatePage = lazy(
  () => import('@/pages/private/categories/create/CategoryCreatePage')
);
const CategoryUpdatePage = lazy(
  () => import('@/pages/private/categories/update/CategoryUpdatePage')
);
const CategoryDetailPage = lazy(
  () => import('@/pages/private/categories/detail/CategoryDetailPage')
);
const PostSettingPage = lazy(
  () => import('@/pages/private/post-settings/PostSettingPage')
);
const DashboardPage = lazy(
  () => import('@/pages/private/dashboard/DashBoardPage')
);
const VipActivationPage = lazy(
  () => import('@/pages/private/vip-activations/VipActivationPage')
);
const RolePage = lazy(() => import('@/pages/private/roles/RolePage'));
const RoleCreatePage = lazy(
  () => import('@/pages/private/roles/create/RoleCreatePage')
);
const RoleUpdatePage = lazy(
  () => import('@/pages/private/roles/update/RoleUpdatePage')
);

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense fallback={<CLoadingPage />}>
        <CNotFoundPage />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<CLoadingPage />}>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </Suspense>
    ),
  },

  {
    path: '/',
    element: (
      <Suspense fallback={<CLoadingPage />}>
        <RoleProtectedRoute>
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        </RoleProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'categories',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <CategoryPage>
                <NoCategory />
              </CategoryPage>
            ),
          },
          {
            path: ':categoryId/detail',
            element: (
              <CategoryPage>
                <CategoryDetailPage />
              </CategoryPage>
            ),
          },

          {
            path: 'create',
            element: <CategoryCreatePage />,
          },
          {
            path: ':categoryId/update',
            element: <CategoryUpdatePage />,
          },
        ],
      },
      {
        path: 'policies',
        element: <Outlet />,
        children: [
          {
            path: 'post-settings',
            element: <PostSettingPage />,
          },
          {
            path: 'vip',
            element: <VipActivationPage />,
          },
        ],
      },
      {
        path: 'roles',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <RolePage />,
          },
          {
            path: 'create',
            element: <RoleCreatePage />,
          },
          {
            path: ':roleId/update',
            element: <RoleUpdatePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
