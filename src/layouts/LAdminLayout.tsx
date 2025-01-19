import { CChangeLanguage, CMenuAdmin } from '@/components';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

// interface LAdminLayoutProps {
//   children: React.ReactNode;
// }

const LAdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Thanh điều hướng */}
      <div className="bg-white shadow-md flex items-center justify-between px-4 py-3 fixed w-full z-10">
        <div className="flex items-center">
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <div className="flex gap-2 mx-3 items-center">
            <Image
              src="../public/logo.png"
              preview={false}
              width={40}
              height={40}
            />
            <h1 className="text-xl font-semibold"> For Admin</h1>
          </div>
        </div>

        <CChangeLanguage />
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-1 pt-[60px] h-full">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[280px]'}   overflow-y-auto overflow-x-hidden`}
        >
          <CMenuAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Nội dung chính */}
        <div
          className={`flex-1 flex justify-start bg-gray-200  px-2 py-4 overflow-y-hidden `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LAdminLayout;
