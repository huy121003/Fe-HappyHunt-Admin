import { CChangeLanguage } from '@/components';
import { Image } from 'antd';
import React from 'react';
interface LAuthLayoutProps {
  children: React.ReactNode;
}
const LAuthLayout: React.FC<LAuthLayoutProps> = ({ children }) => {
  return (
    <div className=" items-center justify-center h-screen bg-white overflow-hidden flex-1 ">
      <div>
        <CChangeLanguage />
      </div>
      <div className=" justify-center items-center flex-1 flex flex-col">
        <div>
          <Image src="/logo.png" preview={false} />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
export default LAuthLayout;
