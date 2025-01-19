import i18n from '@/locales';
import { useTranslation } from 'react-i18next';
import enIcon from '@/public/enicon.png';
import vnIcon from '@/public/vnicon.png';

function CChangeLanguage() {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Đổi ngôn ngữ
  };
  return (
    <div
      className="flex  justify-end   overflow-hidden  pt-2 px-2 items-center cursor-pointer"
      onClick={() => {
        if (i18n.language === 'en') {
          changeLanguage('vn');
        } else {
          changeLanguage('en');
        }
      }}
    >
      <img
        src={i18n.language === 'en' ? enIcon : vnIcon}
        alt="enIcon"
        className="lg:w-10 lg:h-10 w-8 h-8"
      />
      <p className="mx-2">{t('language')}</p>
    </div>
  );
}

export default CChangeLanguage;
