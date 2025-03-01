import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ReactNode, Suspense, lazy } from 'react';
import { CLoadingPage, CNotFoundPage } from '@/components';
import RoleProtectedRoute from '@/components/layouts/RoleProtectedRoute';
import AdminLayout from '@/components/layouts/AdminLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import NoCategory from '@/features/categories/components/ui/NoCategory';
const withSuspense = (
  node: ReactNode,
  fallback: NonNullable<ReactNode> | null = null
) => {
  return <Suspense fallback={fallback}>{node}</Suspense>;
};

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
    element: withSuspense(<CNotFoundPage />, <CLoadingPage />),
  },
  {
    path: '/login',
    element: withSuspense(
      <AuthLayout>
        <LoginPage />
      </AuthLayout>,
      <CLoadingPage />
    ),
  },

  {
    path: '/',
    element: (
      <RoleProtectedRoute>
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </RoleProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<DashboardPage />, <CLoadingPage />),
      },
      {
        path: 'dashboard',
        element: withSuspense(<DashboardPage />, <CLoadingPage />),
      },
      {
        path: 'categories',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(
              <CategoryPage>
                <NoCategory />
              </CategoryPage>,
              <CLoadingPage />
            ),
          },
          {
            path: ':categoryId/detail',
            element: withSuspense(
              <CategoryPage>
                <CategoryDetailPage />
              </CategoryPage>,
              <CLoadingPage />
            ),
          },

          {
            path: 'create',
            element: withSuspense(<CategoryCreatePage />, <CLoadingPage />),
          },
          {
            path: ':categoryId/update',
            element: withSuspense(<CategoryUpdatePage />, <CLoadingPage />),
          },
        ],
      },
      {
        path: 'policies',
        element: <Outlet />,
        children: [
          {
            path: 'post-settings',
            element: withSuspense(<PostSettingPage />, <CLoadingPage />),
          },
          {
            path: 'vip',
            element: withSuspense(<VipActivationPage />, <CLoadingPage />),
          },
        ],
      },
      {
        path: 'roles',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<RolePage />, <CLoadingPage />),
          },
          {
            path: 'create',
            element: withSuspense(<RoleCreatePage />, <CLoadingPage />),
          },
          {
            path: ':roleId/update',
            element: withSuspense(<RoleUpdatePage />, <CLoadingPage />),
          },
        ],
      },
    ],
  },
]);

export default router;
