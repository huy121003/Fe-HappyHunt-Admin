import { CMenuAdmin } from '@/components';

import { Flex, Image, Layout, SiderProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { PropsWithChildren } from 'react';

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
        <CMenuAdmin />
      </SideBar>

      {/* Nội dung chính */}
      <Content
        className="flex flex-col"
        style={{
          flex: 1,
          overflow: 'hidden', // Chặn cuộn trong nội dung chính
        }}
      >
        <Flex vertical>
          <Flex className="justify-between items-center p-4 bg-white shadow-md mb-2">
            <Flex className="items-center">
              <Image
                src="../public/logo.png"
                preview={false}
                width={40}
                height={40}
              />
              <h1 className="text-xl font-semibold"> For Admin</h1>
            </Flex>
          </Flex>

          {children}
        </Flex>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
//  Nội dung chính
//       <div className="flex flex-1 pt-[60px] h-full">
//         {/* Sidebar */}
//         <div
//           className={`transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-[280px]'}   overflow-y-auto overflow-x-hidden`}
//         >
//           <CMenuAdmin collapsed={collapsed} />
//         </div>

//         {/* Nội dung chính */}
//         <div className={`flex-1  p-2 overflow-y-hidden bg-gray-100 `}>
//           {children}
//         </div>
//       </div>
//     </div>
