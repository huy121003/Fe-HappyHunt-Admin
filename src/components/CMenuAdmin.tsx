import React from 'react';
import {
  BarChartOutlined,
  IdcardOutlined,
  SolutionOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FundOutlined,
  MessageOutlined,
  CommentOutlined,
  StopOutlined,
  HourglassOutlined,
  PictureOutlined,
  DollarCircleOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];
interface CMenuAdminProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CMenuAdmin: React.FC<CMenuAdminProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <BarChartOutlined />,
      label: t('menuAdmin.dashboard'),
      onClick: () => navigate('/admin/dashboard'),
    },
    { key: '2', icon: <IdcardOutlined />, label: t('menuAdmin.account') },
    { key: '3', icon: <SolutionOutlined />, label: t('menuAdmin.roles') },
    {
      key: '4',
      icon: <SafetyCertificateOutlined />,
      label: t('menuAdmin.permissions'),
    },
    {
      key: '5',
      icon: <AppstoreOutlined />,
      label: t('menuAdmin.categories'),
      onClick: () => navigate('/admin/categories'),
    },
    { key: '6', icon: <FileTextOutlined />, label: t('menuAdmin.post') },
    { key: '7', icon: <FundOutlined />, label: t('menuAdmin.reports') },
    {
      key: '8',
      icon: <MessageOutlined />,
      label: t('menuAdmin.exampleMessage'),
    },
    { key: '9', icon: <CommentOutlined />, label: t('menuAdmin.feedback') },
    {
      key: 'sub10',
      label: t('menuAdmin.policies'),
      icon: <SafetyCertificateOutlined />,
      children: [
        { key: '10', icon: <StopOutlined />, label: t('menuAdmin.postLimits') },
        {
          key: '11',
          icon: <HourglassOutlined />,
          label: t('menuAdmin.postExpiry'),
        },
        {
          key: '12',
          icon: <PictureOutlined />,
          label: t('menuAdmin.postImages'),
        },
        {
          key: '13',
          icon: <DollarCircleOutlined />,
          label: t('menuAdmin.currencyExchange'),
        },
        {
          key: '14',
          icon: <CrownOutlined />,
          label: t('menuAdmin.vipPurchase'),
        },
      ],
    },
  ];

  return (
    <div className="w-[280px] bg-white">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub10']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default CMenuAdmin;
