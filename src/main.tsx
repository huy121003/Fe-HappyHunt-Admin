import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './libs/query.ts';
import { ConfigProvider } from 'antd';
import theme from './libs/theme.ts';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  </Provider>
);
