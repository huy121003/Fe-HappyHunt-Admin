import { Image } from 'antd';
import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className=" items-center justify-center h-screen bg-white overflow-hidden flex-1 m-10">
      <div className=" justify-center items-center flex-1 flex flex-col">
        <div>
          <Image src="/logo.png" preview={false} width={200} height={230} />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
export default AuthLayout;
