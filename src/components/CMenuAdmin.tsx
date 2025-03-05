import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

interface CMenuAdminProps {
  collapsed?: boolean;
}

const CMenuAdmin: React.FC<CMenuAdminProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getItem = (
    label: string,
    key: string,
    iconClass?: string,
    path?: string,
    children?: MenuItem[]
  ): MenuItem => ({
    key,
    icon: iconClass ? <i className={`fa ${iconClass}`} /> : undefined,
    label,
    children,
    onClick: path ? () => navigate(path) : undefined,
  });

  const items: MenuItem[] = [
    getItem('Dashboard', '/dashboard', 'fa-chart-bar', '/dashboard'),
    getItem('Admins & Roles', 'admin_roles', 'fa-user-shield', undefined, [
      getItem(
        'Admin Accounts',
        '/admin_roles/admins',
        'fa-user-lock',
        '/admin_roles/admins'
      ),
      getItem(
        'Role Management',
        '/admin_roles/roles',
        'fa-shield-alt',
        '/admin_roles/roles'
      ),
    ]),
    getItem('Users & Reports', 'user_reports', 'fa-user', undefined, [
      getItem(
        'User Accounts',
        '/user_reports/users',
        'fa-users',
        '/user_reports/users'
      ),
      getItem(
        'Reported Users',
        '/user_reports/reports',
        'fa-flag',
        '/user_reports/reports'
      ),
    ]),
    getItem(
      'Category Management',
      '/categories',
      'fa-layer-group',
      '/categories'
    ),
    getItem('Post Management', 'post_management', 'fa-newspaper', undefined, [
      getItem('All Posts', '/posts', 'fa-file-alt', '/posts'),
      getItem('Post Reports', '/reports/posts', 'fa-flag', '/reports/posts'),
    ]),
    getItem('Banner Management', '/banners', 'fa-image', '/banners'),
    // getItem(
    //   'Messages Setting',
    //   '/message-settings',
    //   'fa-envelope',
    //   '/messages-settings'
    // ),
    getItem('Address Management', 'addresses', 'fa-map-location', undefined, [
      getItem(
        'Provinces',
        '/addresses/provinces',
        'fa-globe-asia',
        '/addresses/provinces'
      ),
      getItem(
        'Districts',
        '/addresses/districts',
        'fa-city',
        '/addresses/districts'
      ),
      getItem('Wards', '/addresses/wards', 'fa-house-user', '/addresses/wards'),
    ]),

    getItem('System Policies', 'system_policies', 'fa-shield-alt', undefined, [
      getItem(
        'Post Settings',
        '/policies/post-settings',
        'fa-cogs',
        '/policies/post-settings'
      ),
      getItem('VIP Activation', '/policies/vip', 'fa-crown', '/policies/vip'),
    ]),
  ];

  const findSelectedKey = (path: string): string | undefined => {
    const matchedItem = items
      .flatMap((item) =>
        item && 'children' in item && item.children
          ? [item, ...item.children]
          : item
      )
      .find((item) => path.startsWith(item?.key as string));

    return matchedItem?.key as string | undefined;
  };
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys.length > 0 ? [keys[keys.length - 1]] : []);
  };

  return (
    //chir cos 1  sub mo thoi
    <Menu
      className="[&>.ant-menu-item-selected>svg>path]:stroke-white"
      selectedKeys={[findSelectedKey(location.pathname) ?? '']}
      openKeys={openKeys} // Chỉ mở 1 submenu
      onOpenChange={handleOpenChange} // Xử lý mở submenu
      mode="inline"
      inlineCollapsed={collapsed}
      items={items}
    />
  );
};

export default CMenuAdmin;
