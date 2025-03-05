import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ReactNode, Suspense, lazy } from 'react';
import { CLoadingPage, CNotFoundPage } from '@/components';
import RoleProtectedRoute from '@/components/layouts/RoleProtectedRoute';
import AdminLayout from '@/components/layouts/AdminLayout';
import NoCategory from '@/features/categories/components/ui/NoCategory';
import PermissionProtectedLayout from '@/components/layouts/PermissionProtectedLayout';
import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';

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
const UserPage = lazy(() => import('@/pages/private/users/UserPage'));
const UserDetailPage = lazy(
  () => import('@/pages/private/users/detail/UserDetailPage')
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
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.CATEGORIES}
                type={IPERMISSION_TYPE.VIEW}
              >
                <CategoryPage>
                  <NoCategory />
                </CategoryPage>
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },
          {
            path: ':categoryId/detail',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.CATEGORIES}
                type={IPERMISSION_TYPE.VIEW}
              >
                <CategoryPage>
                  <CategoryDetailPage />
                </CategoryPage>
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },

          {
            path: 'create',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.CATEGORIES}
                type={IPERMISSION_TYPE.CREATE}
              >
                <CategoryCreatePage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },
          {
            path: ':categoryId/update',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.CATEGORIES}
                type={IPERMISSION_TYPE.UPDATE}
              >
                <CategoryUpdatePage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
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
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ADMINS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <AdminPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ADMINS}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    <AdminCreatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':adminId/update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ADMINS}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    <AdminUpdatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':adminId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ADMINS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <AdminDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
            ],
          },
          {
            path: 'roles',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ROLES}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <RolePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ROLES}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    <RoleCreatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':roleId/update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ROLES}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    <RoleUpdatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':roleId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.ROLES}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <RoleDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
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
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.PROVINCES}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <ProvincePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.PROVINCES}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    <ProvinceCreatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':provinceId/update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.PROVINCES}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    <ProvinceUpdatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':provinceId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.PROVINCES}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <ProvinceDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
            ],
          },
          {
            path: 'districts',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.DISTRICTS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <DistrictPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.DISTRICTS}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    <DistrictCreatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':districtId/update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.DISTRICTS}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    <DistrictUpdatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':districtId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.DISTRICTS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <DistrictDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
            ],
          },
          {
            path: 'wards',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.WARDS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <WardPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.WARDS}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    <WardCreatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':wardId/update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.WARDS}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    <WardUpdatePage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':wardId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.WARDS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <WardDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
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
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.BANNERS}
                type={IPERMISSION_TYPE.VIEW}
              >
                <BannerPage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },
          {
            path: 'create',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.BANNERS}
                type={IPERMISSION_TYPE.CREATE}
              >
                <BannerCreatePage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },
          {
            path: ':bannerId/update',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.BANNERS}
                type={IPERMISSION_TYPE.UPDATE}
              >
                <BannerUpdatePage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
          },
          {
            path: ':bannerId/detail',
            element: withSuspense(
              <PermissionProtectedLayout
                codeName={IPERMISSION_CODE_NAME.BANNERS}
                type={IPERMISSION_TYPE.VIEW}
              >
                <BannerDetailPage />
              </PermissionProtectedLayout>,
              <CLoadingPage />
            ),
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
      {
        path: 'user_reports',
        element: <Outlet />,
        children: [
          {
            path: 'users',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <UserPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: ':usserId/detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    <UserDetailPage />
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
            ],
          },
          {
            path: 'reports',
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    aaaaa
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'detail',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.VIEW}
                  >
                    aaaa
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'create',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.CREATE}
                  >
                    aaaa
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
              {
                path: 'update',
                element: withSuspense(
                  <PermissionProtectedLayout
                    codeName={IPERMISSION_CODE_NAME.USERS}
                    type={IPERMISSION_TYPE.UPDATE}
                  >
                    aaaa
                  </PermissionProtectedLayout>,
                  <CLoadingPage />
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
