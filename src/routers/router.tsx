import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ReactNode, Suspense, lazy } from 'react';
import { CLoadingPage, CNotFoundPage } from '@/components';
import RoleProtectedRoute from '@/components/layouts/RoleProtectedRoute';
import AdminLayout from '@/components/layouts/AdminLayout';
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
const ProvincePage = lazy(
  () => import('@/pages/private/provinces/ProvincePage')
);
const ProvinceCreatePage = lazy(
  () => import('@/pages/private/provinces/create/ProvinceCreatePage')
);
const ProvinceUpdatePage = lazy(
  () => import('@/pages/private/provinces/update/ProvinceUpdatePage')
);
const ProvinceDetailPage = lazy(
  () => import('@/pages/private/provinces/detail/ProvinceDetailPage')
);
const RoleDetailPage = lazy(
  () => import('@/pages/private/roles/detail/RoleDetailPage')
);
const DistrictPage = lazy(
  () => import('@/pages/private/districts/DistrictPage')
);
const DistrictCreatePage = lazy(
  () => import('@/pages/private/districts/create/DistrictCreatePage')
);
const DistrictUpdatePage = lazy(
  () => import('@/pages/private/districts/update/DistrictUpdatePage')
);
const DistrictDetailPage = lazy(
  () => import('@/pages/private/districts/detail/DistrictDetailPage')
);
const WardPage = lazy(() => import('@/pages/private/wards/WardPage'));
const WardCreatePage = lazy(
  () => import('@/pages/private/wards/create/WardCreatePage')
);
const WardUpdatePage = lazy(
  () => import('@/pages/private/wards/update/WardUpdatePage')
);
const WardDetailPage = lazy(
  () => import('@/pages/private/wards/detail/WardDetailPage')
);
const BannerPage = lazy(() => import('@/pages/private/banners/BannerPage'));
const BannerCreatePage = lazy(
  () => import('@/pages/private/banners/create/BannerCreatePage')
);
const BannerUpdatePage = lazy(
  () => import('@/pages/private/banners/update/BannerUpdatePage')
);
const BannerDetailPage = lazy(
  () => import('@/pages/private/banners/detail/BannerDetailPage')
);
const AdminPage = lazy(() => import('@/pages/private/admins/AdminPage'));
const AdminCreatePage = lazy(
  () => import('@/pages/private/admins/create/AdminCreatePage')
);
const AdminUpdatePage = lazy(
  () => import('@/pages/private/admins/update/AdminUpdatePage')
);
const AdminDetailPage = lazy(
  () => import('@/pages/private/admins/detail/AdminDetailPage')
);
const ProfilePage = lazy(() => import('@/pages/private/profiles/ProfilePage'));
const ChangePasswordPage = lazy(
  () => import('@/pages/private/change-passwords/ChangePasswordPage')
);

const router = createBrowserRouter([
  {
    path: '*',
    element: withSuspense(<CNotFoundPage />, <CLoadingPage />),
  },
  {
    path: '/login',
    element: withSuspense(<LoginPage />, <CLoadingPage />),
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
        path: 'admin_roles',
        element: <Outlet />,
        children: [
          {
            path: 'admins',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(<AdminPage />, <CLoadingPage />),
              },
              {
                path: 'create',
                element: withSuspense(<AdminCreatePage />, <CLoadingPage />),
              },
              {
                path: ':adminId/update',
                element: withSuspense(<AdminUpdatePage />, <CLoadingPage />),
              },
              {
                path: ':adminId/detail',
                element: withSuspense(<AdminDetailPage />, <CLoadingPage />),
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
              {
                path: ':roleId/detail',
                element: withSuspense(<RoleDetailPage />, <CLoadingPage />),
              },
            ],
          },
        ],
      },

      {
        path: 'addresses',
        element: <Outlet />,
        children: [
          {
            path: 'provinces',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(<ProvincePage />, <CLoadingPage />),
              },
              {
                path: 'create',
                element: withSuspense(<ProvinceCreatePage />, <CLoadingPage />),
              },
              {
                path: ':provinceId/update',
                element: withSuspense(<ProvinceUpdatePage />, <CLoadingPage />),
              },
              {
                path: ':provinceId/detail',
                element: withSuspense(<ProvinceDetailPage />, <CLoadingPage />),
              },
            ],
          },
          {
            path: 'districts',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(<DistrictPage />, <CLoadingPage />),
              },
              {
                path: 'create',
                element: withSuspense(<DistrictCreatePage />, <CLoadingPage />),
              },
              {
                path: ':districtId/update',
                element: withSuspense(<DistrictUpdatePage />, <CLoadingPage />),
              },
              {
                path: ':districtId/detail',
                element: withSuspense(<DistrictDetailPage />, <CLoadingPage />),
              },
            ],
          },
          {
            path: 'wards',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(<WardPage />, <CLoadingPage />),
              },
              {
                path: 'create',
                element: withSuspense(<WardCreatePage />, <CLoadingPage />),
              },
              {
                path: ':wardId/update',
                element: withSuspense(<WardUpdatePage />, <CLoadingPage />),
              },
              {
                path: ':wardId/detail',
                element: withSuspense(<WardDetailPage />, <CLoadingPage />),
              },
            ],
          },
        ],
      },
      {
        path: 'banners',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<BannerPage />, <CLoadingPage />),
          },
          {
            path: 'create',
            element: withSuspense(<BannerCreatePage />, <CLoadingPage />),
          },
          {
            path: ':bannerId/update',
            element: withSuspense(<BannerUpdatePage />, <CLoadingPage />),
          },
          {
            path: ':bannerId/detail',
            element: withSuspense(<BannerDetailPage />, <CLoadingPage />),
          },
        ],
      },
      {
        path: 'profile',
        element: withSuspense(<ProfilePage />, <CLoadingPage />),
      },
      {
        path: 'change-password',
        element: withSuspense(<ChangePasswordPage />, <CLoadingPage />),
      },
    ],
  },
]);

export default router;
