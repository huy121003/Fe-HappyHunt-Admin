import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/router';
import { ConfigProvider } from 'antd';
import theme from './configs/theme.config';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ConfigProvider>
    </I18nextProvider>
  );
}

export default App;
