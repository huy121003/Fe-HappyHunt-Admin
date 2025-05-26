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
    getItem(
      'Users Management',
      'user_management',
      'fa-user',
      '/user_management'
    ),
    getItem(
      'Category Management',
      '/categories',
      'fa-layer-group',
      '/categories'
    ),
    getItem('Post Management', 'post_management', 'fa-newspaper', undefined, [
      getItem('Post Selling', '/posts', 'fa-file-alt', '/posts'),
      getItem(
        'Post Checking',
        '/post-checkings',
        'fa-check-circle',
        '/post-checkings'
      ),
    ]),
    getItem('Banner Management', '/banners', 'fa-image', '/banners'),

    getItem(
      'Payment Management',
      'payment_management',
      'fa-money-bill-wave',
      '/payment_management'
    ),
    getItem('Q&A Chat Bot', 'q&a', 'fa-robot', '/q&a'),
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
    getItem('Report Management', 'reports', 'fa-flag', '/reports'),
    getItem('Statistics', 'statistics', 'fa-chart-pie', undefined, [
      getItem(
        'Post Statistics',
        '/statistics/posts',
        'fa-chart-line',
        '/statistics/posts'
      ),
      getItem(
        'User Statistics',
        '/statistics/users',
        'fa-users',
        '/statistics/users'
      ),
      getItem(
        'Payment Statistics',
        '/statistics/payments',
        'fa-credit-card',
        '/statistics/payments'
      ),
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
