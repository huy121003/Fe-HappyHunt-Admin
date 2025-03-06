import { CMenuAdmin } from '@/components';

import { Flex, Layout, SiderProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { PropsWithChildren } from 'react';
import ButtonActionProfile from './ActionProfile/ButtonActionProfile';
import CLogo from '../CLogo';

interface AdminLayoutProps {
  children: React.ReactNode;
}
export const SideBar: React.FC<PropsWithChildren<SiderProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Sider
      {...props}
      className={`${className} overflow-y-auto py-[24px] !min-w-[280px] !max-w-[280px] !w-[280px] !basis-[280px] z-20`}
    >
      {children}
    </Sider>
  );
};
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden', // Chặn cuộn trên toàn bộ Layout
      }}
    >
      {/* Sidebar */}
      <SideBar
        theme="light"
        style={{
          height: '100vh', // Đảm bảo Sidebar không mở rộng ngoài Layout
          overflow: 'auto', // Chặn cuộn trong Sidebar
        }}
      >
        <CLogo />
        <CMenuAdmin />
      </SideBar>

      {/* Nội dung chính */}
      <Content
        className="flex flex-col"
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Flex vertical className="overflow-hidden  h-screen">
          <Flex
            className="justify-end items-center p-4 bg-white shadow-md mb-2
          overflow-hidden"
          >
            <ButtonActionProfile />
          </Flex>

          <Flex
            className=" flex-1 flex flex-col h-full 
          overflow-y-auto"
          >
            {children}
          </Flex>
        </Flex>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
