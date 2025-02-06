import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/locales';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/router';
import { ConfigProvider, notification } from 'antd';
import theme from './configs/theme.config';

import { useAppDispatch, useAppSelector } from './redux/reduxHook';
import authApi from './apis/authApi';

import { getUserAction } from './redux/slice/SAuthSlice';
import { Suspense, useEffect } from 'react';
import { CLoadingPage } from './components';
import { useQuery } from '@tanstack/react-query';


function App() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading } = useQuery({
    queryKey: ['GET_ACCOUNT', window.location.pathname],
    queryFn: async () => {
      const response = await authApi.AGetAccountInfo();
      if (response.statusCode === 200) {
        return response.data;
      } else {
        notification.error({
          message: t('common.error'),
          description: t('common.systemError'),
        });
      }
    },
  });

  const getAccount = async () => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register' ||
      window.location.pathname === '/forgot-password' ||
      window.location.pathname === '/'
    ) {
      return;
    }
    if (isLoading) return;
    dispatch(getUserAction(data));
  };

  useEffect(() => {
    getAccount();
  }, [window.location.pathname, data, dispatch]);
  if (
    isAuthenticated === true ||
    window.location.pathname === '/login' ||
    window.location.pathname === '/register' ||
    window.location.pathname === '/forgot-password' ||
    window.location.pathname === '/'
  ) {
    return (
      <Suspense fallback={<CLoadingPage />}>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider theme={theme}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </I18nextProvider>
      </Suspense>
    );
  }
  return <CLoadingPage />;
}

export default App;
