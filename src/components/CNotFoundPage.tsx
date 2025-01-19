import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

function CNotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex-1 justify-center items-center bg-white h-screen w-screen flex flex-col">
      <div>
        <Image src="../public/logo.png" alt="404" preview={false} />
      </div>
      <h1 className="lg:text-4xl text-2xl text-flame-orange">
        {`404 ${t('common.notFound')}`}
        <i className="fa-face-sad-tear fa-solid ml-2" />
      </h1>
    </div>
  );
}

export default CNotFoundPage;
