import { CMenuAdmin } from '@/components';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
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
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-1 pt-[60px] h-full">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[280px]'}   overflow-y-auto overflow-x-hidden`}
        >
          <CMenuAdmin collapsed={collapsed} />
        </div>

        {/* Nội dung chính */}
        <div className={`flex-1  p-2 overflow-y-hidden bg-gray-100 `}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
