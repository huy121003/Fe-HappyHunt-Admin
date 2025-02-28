import { RouterProvider, useNavigate } from 'react-router-dom';
import router from '@/routers/router';
import { ConfigProvider } from 'antd';

import { useAppDispatch, useAppSelector } from './redux/reduxHook';

import { getUserAction } from './redux/slice/SAuthSlice';
import { useEffect } from 'react';
import { CLoadingPage } from './components';

import ToastMessage from './components/ToastMessage';
import theme from './libs/theme';
import { useQuery } from '@tanstack/react-query';
import { API_KEY } from './features/auth/data/constant';
import AuthService from './features/auth/service';

function App() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_ACCOUNT_INFO],
    queryFn: async () => {
      const response = await AuthService.getAccountInfo();
      return response.data;
    },
  });

  const getAccount = async () => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register' ||
      window.location.pathname === '/forgot-password'
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
    window.location.pathname === '/forgot-password'
  ) {
    return (
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
        <ToastMessage />
      </ConfigProvider>
    );
  }
  return <CLoadingPage />;
}

export default App;
