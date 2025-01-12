import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/locales';

function App() {
  const { t } = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <p>{t('welcome')}</p>
    </I18nextProvider>
  );
}

export default App;
